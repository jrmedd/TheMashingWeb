/*text overlays*/
function gameText(initX, initY, initSize) {
  this.xPos = initX;
  this.yPos = initY;
  this.textToDisplay = "";
  this.textOpacity = 0;
  this.fadeOut = false;
  textAlign(CENTER);
  textSize(initSize);

  /*display text*/
  this.display = function(){
    push();
    this.fadeOutState(); //check fadeout state and reduce opacity
    fill(color(0, this.textOpacity));
    text(this.textToDisplay, this.xPos, this.yPos);
    pop();
  };

  /*function for checking fadeout state, and to reduce opacity*/
  this.fadeOutState = function(){
    if (this.fadeOut){
      this.textOpacity -= this.fadeOutRate;
    };
    if (this.textOpacity <= 0) {
      this.fadeOut = false;
    };
  };

  /*flash winning team*/
  this.flashText = function(textToFlash, rate) {
    this.textToDisplay = textToFlash; //winning team text
    this.textOpacity = 255; //max out opacity
    this.fadeOut = true; //set to fade out
    this.fadeOutRate = rate; //set fadeout rate
  };
};
