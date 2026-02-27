// Gym Energy Harvester - Arduino Code
// Reads voltage from DC motor generator, calculates power, lights LEDs

// --- Pin Setup ---
const int voltagePin = A0;    // Generator voltage input
const int led1 = 2;           // LED 1 (low power)
const int led2 = 3;           // LED 2
const int led3 = 4;           // LED 3
const int led4 = 5;           // LED 4
const int led5 = 6;           // LED 5 (high power)

// --- Constants ---
const float loadResistance = 100.0;   // Load resistor in ohms
const float voltageRef = 5.0;         // Arduino reference voltage
const int adcMax = 1023;              // 10-bit ADC max value

// If using a voltage divider (R1 = 10k, R2 = 10k), set to 2.0
// If wiring motor directly to A0 (under 5V output), set to 1.0
const float dividerRatio = 1.0;

// --- Variables ---
float totalEnergy = 0.0;             // Total energy in joules
unsigned long lastTime = 0;

void setup() {
  Serial.begin(9600);

  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
  pinMode(led4, OUTPUT);
  pinMode(led5, OUTPUT);

  lastTime = millis();

  Serial.println("time_ms,voltage,power_W,energy_J");
}

void loop() {
  // Read voltage from generator
  int rawValue = analogRead(voltagePin);
  float voltage = (rawValue * voltageRef / adcMax) * dividerRatio;

  // Calculate power: P = V^2 / R
  float power = (voltage * voltage) / loadResistance;

  // Calculate energy: E = P * dt
  unsigned long now = millis();
  float dt = (now - lastTime) / 1000.0;  // Convert ms to seconds
  lastTime = now;
  totalEnergy += power * dt;

  // Light up LEDs based on power level
  digitalWrite(led1, power > 0.01 ? HIGH : LOW);
  digitalWrite(led2, power > 0.05 ? HIGH : LOW);
  digitalWrite(led3, power > 0.10 ? HIGH : LOW);
  digitalWrite(led4, power > 0.20 ? HIGH : LOW);
  digitalWrite(led5, power > 0.50 ? HIGH : LOW);

  // Send data to serial (for MATLAB to read)
  Serial.print(now);
  Serial.print(",");
  Serial.print(voltage, 4);
  Serial.print(",");
  Serial.print(power, 4);
  Serial.print(",");
  Serial.println(totalEnergy, 4);

  delay(100);  // Read 10 times per second
}
