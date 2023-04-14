[link to view project](https://dmgudeman.github.io/DiveTheTrieste/)


## Dive The Trieste!

Dive the Trieste! is a app to allow the user to explore
the ocean's depths.  The app opens with a submarine
icon at the surface.  With the use of arrows the submarine
starts its descent. It travels down the depths and the 
sub allows the screen to travel to new and unseen places.
When the user goes to a new depth there is an appropriate
set of pictures showing life at that depth.  The photos
are either of bottom dwellers (benthic) or free swimming
animals (pelagic) depending on where the sub is located.


### The submarine moves on a classic cross section of the ocean

The submarine moves across the screen first due the background
panning and about midway the submarine moves ontop the background
to the edge. Maintaining state was accomplished by updating
coordinates on both the submarine as well as the background.
At certain areas of the ocean, the data is used to draw an image
from that area. One of six arrays of images is chosen by depth and
proximity to shore. Then a random image is presented to the
submarine viewport.

This project changes between three 'pages'. This is due to utilization 
of three seperate canvases that are layered by eventlisteners on buttons.




### Technologies, Libararies, APIS
Canvas API to render the diagram 
Webpack and Babel to bundle and transpile the Javascript code
npm to manage dependencies














