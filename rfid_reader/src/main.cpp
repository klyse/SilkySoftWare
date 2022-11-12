#include <Arduino.h>
#include <SPI.h>
#include <Wire.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <HTTPClient.h>
// #include <Adafruit_GFX.h>
// #include <Adafruit_SSD1306.h>

#define SS_PIN 32
#define RST_PIN 14
#define SENSOR_PIN A3

MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance.

IPAddress local_IP(172, 20, 10, 10);
IPAddress gateway(172, 20, 1, 1);
IPAddress subnet(255, 255, 0, 0);

const char *ssid = "Andy's phone";
const char *password = "wuzisnoob";

// const char *ssid = "openAiR";
// const char *password = "";

//unsigned long lastUID = 0;
String lastUID = "";

String serverName = "http://172.20.10.2:8000";

//String serverName = "http://10.199.231.220:8000/tags/scan/";

void setup() {
   Serial.begin(115200);
   Serial.println("\n\nRFID Reader 1.0 - first prototype");
   
   // Initialize SPI
   SPI.beginTransaction(SPISettings(1000000, MSBFIRST, SPI_MODE0)); //set parameters
   SPI.begin(); // init SPI
   delay(10);
   mfrc522.PCD_Init(); // Init MFRC522 card

   mfrc522.PCD_DumpVersionToSerial(); 



  WiFi.mode(WIFI_STA);
    
  // Configures static IP address
  //if (!WiFi.config(local_IP, gateway, subnet))
  //if(!WiFi.config(local_IP, ))
  {
    Serial.println("STA Failed to configure");
  }
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println(WiFi.localIP());



}


void sendData(){

    if(WiFi.status()== WL_CONNECTED){

    WiFiClient client;
    HTTPClient http;
    
    HTTPClient httpClient;
    httpClient.end();
    httpClient.begin(client, "http://172.20.10.2:8000/tags/scan/"+lastUID);
    int httpCode = httpClient.POST("");
    String response = httpClient.getString(); // Get the response payload
    httpClient.end();            

    }
    else {
      Serial.println("WiFi Disconnected");
    }
}



void loop() {

  if ( mfrc522.PICC_IsNewCardPresent()) {
    if ( mfrc522.PICC_ReadCardSerial()) {

      String uid = "";
      for(int i = 0; i < mfrc522.uid.size; i++){
        uid += String(mfrc522.uid.uidByte[i]);
      }

      if(lastUID != uid){
        lastUID = uid;

        Serial.print("RFID Tag found with ID: ");
        Serial.println(uid);

        sendData();
      }
    }
  }
}