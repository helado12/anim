# A cool birthday animation page to wish someone happy birthday or send as a gift🎁

## It's cool & sweet. It is reponsive and optimized for mobile devices.

* URL: 
* Technology used: 

&nbsp;

#### demo & explanation
<img src="images/screenshot1.jpg" width="375" height="667">



The first page is a happy birthday greeting made of shards. The shards will be animated when touching it.


<img src="images/screenshot2.gif" width="375" height="667">

The position of each shard is updated in each frame. In each loop, a value 'vy' will be added to a shard's y-position and 'vy' will also be added with a constant value. This makes the shards fall down the screen faster and faster. However, when it reaches the bottom of the screen, 'vy' is reset to an opposite sign and several times larger but still will be added with the constant value each frame, meaning the shard will probably first bounce up and out of the screen and  when it again fall down to the screen, it will have a large 'vy'. It will thus fall down quickly as shown below. 


















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
