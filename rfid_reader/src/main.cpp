#include <Arduino.h>
#include <SPI.h>
#include <Wire.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <MillisTimer.h>
#include <Bounce2.h>
// #include <Adafruit_GFX.h>
// #include <Adafruit_SSD1306.h>

#define SS_PIN 32
#define RST_PIN 14
#define SENSOR_PIN A3
#define LED_PIN 15
#define BUZZER_PIN 21
#define POST_SEND_CHECK_PIN 33

#define FLASH_REPEATS 5
#define FLASH_INTERVAL 150


MFRC522 mfrc522(SS_PIN, RST_PIN); // Create MFRC522 instance.

IPAddress local_IP(172, 20, 10, 10);
IPAddress gateway(172, 20, 1, 1);
IPAddress subnet(255, 255, 0, 0);

//---- FINAL SETTINGS
// const char *ssid = "Treebeard";
// const char *password = "vimwyihm6yqh";
// String serverName = "http://172.20.10.2:5001";


//---- DEBUG WIFI SETTINGS
const char *ssid = "openAiR";
const char *password = "";

// unsigned long lastUID = 0;
String lastUID = "";

//String serverName = "http://172.20.10.2:8000";

//String serverName = "http://172.20.10.2:5001";

String serverName = "http://10.199.231.220:8000";

Bounce bounce = Bounce();

bool ledOn = false;

MillisTimer timer1 = MillisTimer(1000);
void myTimerFunction(MillisTimer &mt)
{
  ledOn = !ledOn;
  digitalWrite(LED_PIN, ledOn);

  if(ledOn){
    ledcWriteNote(0, NOTE_A, 3); 
  }else{
    ledcWriteTone(0, 0); 

    //ledcWriteNote(0, NOTE_C, 3);
  }
  
}


void setup()
{



  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);

  ledcSetup(0, 0, 8); //PWM setup (pwmChannel, frequency, resolution) 
  ledcAttachPin(BUZZER_PIN, 0); // attach the channel to the GPIO 

  bounce.attach(POST_SEND_CHECK_PIN, INPUT_PULLUP);
  bounce.interval(50); // interval in ms

  Serial.begin(115200);

  timer1.setInterval(FLASH_INTERVAL);
  timer1.expiredHandler(myTimerFunction);
  timer1.setRepeats(FLASH_REPEATS);
  //timer1.start();

  // Initialize SPI
  SPI.beginTransaction(SPISettings(1000000, MSBFIRST, SPI_MODE0)); // set parameters
  SPI.begin();                                                     // init SPI
  delay(10);
  mfrc522.PCD_Init(); // Init MFRC522 card
  mfrc522.PCD_DumpVersionToSerial();

  WiFi.mode(WIFI_STA);
  {
    //Serial.println("STA Failed to configure");
  }
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println(WiFi.localIP());
}

void sendData()
{
  if (WiFi.status() == WL_CONNECTED)
  {
    WiFiClient client;
    HTTPClient httpClient;
    httpClient.end();
    httpClient.begin(client, serverName+"/tags/scan/" + lastUID);
    int httpCode = httpClient.POST("");
    String response = httpClient.getString(); // Get the response payload
    httpClient.end();
  }
  else
  {
    Serial.println("WiFi Disconnected");
  }
}

void loop()
{


  bounce.update();

  if(bounce.fell()){
    sendData();
  }

  if(timer1.isRunning()){
    timer1.run();
  }

  if (mfrc522.PICC_IsNewCardPresent())
  {
    if (mfrc522.PICC_ReadCardSerial())
    {

      String uid = "";
      for (int i = 0; i < mfrc522.uid.size; i++)
      {
        uid += String(mfrc522.uid.uidByte[i]);
      }

      if (lastUID != uid)
      {
        lastUID = uid;

        Serial.print("RFID Tag found with ID: ");
        Serial.println(uid);

        sendData();

        ledOn = true;
        digitalWrite(LED_PIN, ledOn);
        timer1.stop();
        timer1.setInterval(FLASH_INTERVAL);
        timer1.setRepeats(FLASH_REPEATS);
        timer1.start();
      }
    }
  }



}