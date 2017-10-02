## Overview

I've loosely described The Mashing as my lover letter to and critique of button mashing games. I'll be including the game (in its own cabinet) in my [Awkward Arcade](http://awkwardarcade.co.uk).

It's now a cabinet:

![The Mashing Cabinet](http://jamesmedd.co.uk/images/mashingCabinet.jpg)

And makes people look like this:

![The Mashing Faces](http://jamesmedd.co.uk/images/mashingFaces.jpg)


## History

Originally created [by me](http://jamesmedd.co.uk) for [Digital Media Labs 2015](http://digitalmedialabs.org). It was originally built in [Max](http:/cycling74.com), and went from idea to product in about 6 days (or evenings). You can read about that process [on my blog](http://blog.jamesmedd.co.uk/post/130502764192/the-mashing).

## Installation

1. The Mashing is a Chrome App. Download Google Chrome (or Chromium) before starting

2. Hookup 11 buttons to your Arduino from pins 3 to 13. Pin 13 is your start button. If you're using pull-ups, stick the relevant exclamation point in the code.

3. Flash the code to the Arduino

4. Go to chrome://extensions

5. Turn on 'Developer mode' in the top right

6. Hit 'Load unpacked extension', select The Mashing's folder

7. You can then add a shortcuts via 'Details', and hit launch.

8. By moving your mouse to the bottom of the screen you'll bring up a drop down of serial devices, select the one relevant to you:
  * On **Linux**, it's typically /dev/ttyACM0
  * On **macOS**, it typically begins /dev/tty.usbmodem or /dev/cu.usbmodem, select whichever works!
  * On **Windows**, it's usually COM4, or COM5, again select whichever works.
  * To avoid selecting this again, you can change the 'preferredPort' variable in 'js/gameController'.
