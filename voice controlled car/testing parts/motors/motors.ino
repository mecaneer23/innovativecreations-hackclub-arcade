int motor1pin1 = 4;
int motor1pin2 = 5;

int motor2pin1 = 6;
int  motor2pin2 = 7;

void setup() {

  pinMode(motor1pin1, OUTPUT);
  pinMode(motor1pin2, OUTPUT);
  pinMode(motor2pin1,  OUTPUT);
  pinMode(motor2pin2, OUTPUT);
  Serial.begin(9600);
  Serial.println("Setup Complete");

}

void loop() {
  Serial.println("trying forward");
  
  digitalWrite(motor1pin1,  HIGH);
  digitalWrite(motor1pin2, LOW);

  digitalWrite(motor2pin1, HIGH);
  digitalWrite(motor2pin2, LOW);
  delay(3000);
  
  Serial.println("trying forward");

  digitalWrite(motor1pin1,  LOW);
  digitalWrite(motor1pin2, HIGH);

  digitalWrite(motor2pin1, LOW);
  digitalWrite(motor2pin2, HIGH);
  delay(3000);
}
