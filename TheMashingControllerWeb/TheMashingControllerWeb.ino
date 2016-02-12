int numInputs = 10;//leave this as it is, as the Chrome app currently expects 10 values!
int firstInputPin = 3;//change this depending on where your first button is plugged in
int lastInputPin = numInputs + firstInputPin;

void setup() {
 Serial.begin(9600);
 for (int i = firstInputPin; i < lastInputPin; i++) {
   pinMode(i, INPUT);
 };
};

void loop() {
  String allButtonStates = "";
  for (int i = firstInputPin; i < lastInputPin; i++) {
    allButtonStates += String(digitalRead(i));//put ! in front of digitalRead if your pins go low on a button press
    if (i != lastInputPin-1) {
      allButtonStates += ",";
    };
  };
  Serial.println(allButtonStates);
};
