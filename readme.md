# A cool birthday animation page to wish someone happy birthday or send as a gift 🎁

It's cool & sweet. It is reponsive and optimized for mobile devices.

URL: 
Technology used: 

&nbsp;

#### Demo & Explanation
It shows each section of this website. I put this website together from various sources. A difficulty is how each section is connected smoothly and with proper timing which will be  explained in detail.

<img src="images/screenshot1.jpg" width="375" height="667">



The first section is a happy birthday greeting made of shards. The resolution and animation is optimized for viewing on handphone. The shards will be activated when touching it. A 'count' variable will be incremented by 1 when the postion of each shard is updated. This 'count' varible is used to control the timing of this animation.


<img src="images/screenshot2.gif" width="375" height="667">

The position of each shard is updated in each frame. In each loop, a value 'vy' will be added to a shard's y-position and 'vy' will also be added with a constant value. This makes the shards fall down the screen faster and faster. However, when it reaches the bottom of the screen, 'vy' is reset to an opposite sign and several times larger but still will be added with the constant value each frame, meaning the shard will probably first bounce up and out of the screen and  when it again fall down to the screen, it will have a large 'vy'. It will thus fall down quickly as shown below. 





<img src="images/screenshot3.gif" width="375" height="667">




When the 'count' variable reaches 8000000, the shards is mostly likely in the 'falling down' phase. The shard is then set to fall down with constant 'vy'. When the 'count' variable reaches 9000000, all shards out of the screen will be prevented to enter the screen and it will be checked if there is any shards in the view of the screen in each frame. When no shards is in the screen, this animation is ended and the page will enter the next secition.
### This way, the switching from section 1 to 2 would depend on the movement of the shard, not on the lapse of time, making it more repsonsive to the user's actions.






The next section is a giftbox. When clicking it, birthday wishes in the form of fireworks will be shown one sentence each time.
The words can be edit in the 2D array `strings_1` in `scripts/index.js`.














[![Birthday Countdown + Sweet Birthday Greeting with HTML, CSS & JS](http://img.youtube.com/vi/B-f1bxYaayc/0.jpg)](https://youtu.be/B-f1bxYaayc?t=53 'Birthday Countdown + Sweet Birthday Greeting with HTML, CSS & JS')

&nbsp;

#### installation

```sh
git clone https://github.com/pavanjadhaw/birthday-counter
```

&nbsp;

#### usage

Edit config object in `scripts/index.js`
replace name and birthdate

```js
6   const config = {
7     birthdate: 'Jan 29, 2020',
8     name: 'Darlene'
9   };
```

&nbsp;

#### deploying

You can deploy it to many free hosting sites

Deploying to [now.sh](https://zeit.co/home)

```sh
$ cd birthday-counter
$ now
```

&nbsp;

Deploying to [surge.sh](https://surge.sh/)

```sh
$ cd birthday-counter
$ surge
```

&nbsp;

#### acknowledgements

Feel free to use any part of this! Contributions are welcome,
I managed to put this together year ago when I didnt know any js or anything about programming/webdev in general.
So thanks to all copepen which I copied, use few parts of.

&nbsp;
