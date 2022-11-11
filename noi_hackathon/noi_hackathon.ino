#include <SPI.h>
#include <Wire.h>
#include <MFRC522.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// Mifare TC522 settings
#define SS_PIN 12
#define RST_PIN 13
  MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance.

void setup(){
  Serial.begin(115200);
  Serial.println("\n\nRFID Reader 1.0 - first prototype");
  
  // Initialize SPI
  SPI.beginTransaction(SPISettings(1000000, MSBFIRST, SPI_MODE0)); //set parameters
  SPI.begin(); // init SPI
  delay(10);
  mfrc522.PCD_Init(); // Init MFRC522 card
  Serial.println("started mrfc522");
}

void loop(){
    // Look for new cards
  if ( mfrc522.PICC_IsNewCardPresent()) {
    Serial.println("Card present");
    // Select one of the cards
    if ( mfrc522.PICC_ReadCardSerial()) {
      Serial.println("Data available");
      // Dump debug info about the card. PICC_HaltA() is automatically called.
      mfrc522.PICC_DumpToSerial(&(mfrc522.uid));
    }
  }else{
      Serial.println("nope");
  }
  delay(1000);
}
