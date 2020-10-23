# An animation page to wish someone happy birthday or send as a gift 🎁

I made this for a friend to wish her happy birthday in a special way. It is reponsive and optimized for mobile devices. 
Edit a few words to make it yours.

Download the files and click on the index.html file to view it in the browser.

URL: https://eladoh.github.io/birthday/

Technology used:
 * HTML5, H5 canvas
 * CSS3, CSS animation
 * jQuery
 * Bootstrap 4

&nbsp;

## Demo
I put this page together from various sources. Will explain in detail how each section is connected.

### Section 1



* The first section is a happy birthday greeting made of particles. 
* Resolution is optimized for viewing on handphone. 
* The particle is activated when touched. 



* Position of each particle is updated in each frame. *A variable `count` is incremented by `1` when the postion of each particle is updated. It is used to control the timing of this section.*
* In each frame, a variable `vy` (randomly initiated for each particle) will be added to each particle's y-position and `vy` will also be added with a constant value. This makes the particles fall down the screen faster and faster. 
* When a particle reaches the bottom of the screen, its `vy` is reset to an opposite sign and several times larger. The particle will thus bounce up and out of the screen.




<img src="images/screenshot3.gif" width="375" height="667">



* `vy` is always added with the constant value each frame, so when the particle fall down again to the screen, it will have a large `vy`. It thus falls down quickly. 
* When `count` reaches 8000000, all particles are set to fall down with constant `vy`. 
* When `count` variable reaches 9000000, all particles will be set to move away from the screen.
* When no particles are in the screen, the animation is terminated and next section will start.
* *The switching from section 1 to 2 depends on the movement of the particles, not on the lapse of time, making it more repsonsive to user's action.*

&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;

### Section 2





* This section is a giftbox with confetii in the background. When clicking the giftbox, words will pop up one sentence at a time.
* The words can be edited in the 2D array `strings_1` in `scripts/index.js`.
* Alignment of the words can be adjusted by adding space to the string. There will not be any extra fireworks or ballon on top of the space.



<img src="images/screenshot5.gif" width="375" height="667">



* After all the sentences are looped through, a bootstrap modal containing a video will pop up. You can use any video you like.
* The modal will be hidden and the video can be paused when clicking on the grey area. 
* A reminder for this will be shown towards the end of the happy birthday video.

### Section 3

<img src="images/screenshot6.gif" width="375" height="667">


* When the modal is closed, the last section will be shown. It contains a banner which moves for a few cycles and a few buttons.
* The first one is used to call back the video modal and the section will be hidden until the modal is closed again. 
* You can add other functions to these buttons if you wish. 
* The animations for the banner and buttons are done using CSS animation.

### Other idea
Can use a customized domain name such as a.giftfor***.xyz when sending it to someone :)

Do star it if you like.⭐️

