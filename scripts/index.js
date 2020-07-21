// first animation
  window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
})();



var canvas = document.getElementById("canvas1"),
    ctx1 = canvas.getContext("2d"),
    keyword1 = "HAPPY BIRTHDAY",
    keyword2 = "SHARICE",
    imageData,
    density =1,
    mouse = {},
    hovered = false,
    colors = ["236, 252, 17", "15, 245, 46", "15, 237,  245", "245, 15, 15", "245, 15, 214"],
    minDist = 20,
    bounceFactor = 3.9,
    count123=0;

var W = window.innerWidth,
    H = window.innerHeight;

canvas.width = W;
canvas.height = H;

document.addEventListener("mousemove", function(e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
}, false);


document.addEventListener("touchmove", function(e) {
 if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
        //var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    }
}, false);

document.addEventListener("touchstart", function(e) {
 if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
        //var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    }
}, false);


// Particle Object
var Particle = function() {
  this.w = Math.random() * 7.2;
  this.h = Math.random() * 7.2;
  this.x = -W;
  this.y = -H;
  this.free = false;
  
  this.vy = (-5 + parseInt(Math.random() * 10) / 2)/2.2;
  this.vx = (-4 + parseInt(Math.random() * 8))/2.5;
  
  // Color
  this.a = Math.random();
  this.color = colors[parseInt(Math.random()*colors.length)];
  
  this.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
  };
  
  this.draw = function() {
    ctx1.fillStyle = "rgba("+this.color+","+this.a+")";
    ctx1.fillRect(this.x, this.y,  this.w,  this.h);
  }
};

var particles = [];

// Draw the text
function drawText() {
  ctx1.clearRect(0, 0, W, H);
  ctx1.fillStyle = "#8800ff";
  ctx1.font = "43.5px 'Arial', sans-serif";
  ctx1.textAlign = "center";
  ctx1.fillText(keyword1, W/2, H/2 - 30);
  ctx1.fillText(keyword2, W/2, H/2 + 15);
}

// Clear the canvas
function clear() {
  ctx1.clearRect(0, 0, W, H);
}

// Get pixel positions
function positionParticles() {
  // Get the data
  imageData = ctx1.getImageData(0, 0, W, W);
  data = imageData.data;
  
  // Iterate each row and column
  for (var i = 0; i < imageData.height+30; i += density) {
    for (var j = 0; j < imageData.width+30; j += density) {
      
      // Get the color of the pixel
      var color = data[((j * ( imageData.width * 4)) + (i * 4)) - 1];
      
      // If the color is black, draw pixels
      if (color == 255) {
        particles.push(new Particle());
        particles[particles.length - 1].setPosition(i, j);
      }
    }
  }
}

drawText();
positionParticles();


// Update
function update() {
  clear();
  
  for(i = 0; i < particles.length; i++) {
    var p = particles[i];
    
    if(mouse.x > p.x && mouse.x < p.x + p.w && mouse.y > p.y && mouse.y < p.y + p.h) 
      hovered = true;
    
    if(hovered == true) {
      
      var dist = Math.sqrt((p.x - mouse.x)*(p.x - mouse.x) + (p.y - mouse.y)*(p.y - mouse.y));
      
      if(dist <= minDist)
        p.free = true;
      
      if(p.free == true) {
        ++count123;
        p.y += p.vy;
        p.vy += 0.04;
        p.x += p.vx;
        
        // Collision Detection
        if(p.y + p.h > H) {
          p.y = H - p.h;
          p.vy *= -bounceFactor;
          
          // Friction applied when on the floor
          if(p.vx > 0)
            p.vx -= 0.1;
          else 
            p.vx += 0.1;
        }
        
        if(p.x + p.w > W) {
          p.x = W - p.w;
          p.vx *= -bounceFactor;
        }
        
        if(p.x < 0) {
          p.x = 0;
          p.vx *= -0.5;
        }
      }
    }
    
    ctx1.globalCompositeOperation = "lighter";
    p.draw();
  }
}

//update1


var updateTime = 0
function update1() {
  clear();
  
  // if (updateTime < 10000){
  //   for(i = 0; i < particles.length; i++) {
  //     var p = particles[i];
  //     if (p.y < 0){
  //       p.x = p.x + 10 - Math.floor(Math.random() * 20);
  //       p.y = p.y + 10 - Math.floor(Math.random() * 20);
  //     }



  //   }


  // }


  for(i = 0; i < particles.length; i++) {
    var p = particles[i];
      
        ++count123;
        p.vy = 8;
        p.y += p.vy;
        // p.vy += 0.05;
        p.x += p.vx;
        
        
        if(p.x + p.w > W) {
          // p.x = (W - p.x); 
          p.vx = - p.vx;
          // p.vx *= -Math.floor(Math.random() * bounceFactor * 5); ;
        }

        
        // if(p.x < -3) {
        //   p.x = 0;
        //   p.vx *= -0.7;
        // }


        // if(p.x + p.w > W) {
        //   p.x = (W - p.x); 
        //   p.vx = - p.vx;

        // }

        
        // if(p.x < 0) {
        //   p.x = 0;
        //   p.vx *= -0.7;
        // }


      
    
    
    ctx1.globalCompositeOperation = "lighter";
    p.draw();
  }
  updateTime += 1;
}

var updateTime2 = 0;

function update2() {
  clear();

  //   if (updateTime2 === 0){
  //   for(i = 0; i < particles.length; i++) {
  //     var p = particles[i];
  //     if (p.y < 0){
  //       p.y *= Math.floor(Math.random() * 5);
  //     }
  //   }
  // }
  
  for(i = 0; i < particles.length; i++) {
    var p = particles[i];
        

        ++count123;
        if(p.y + p.h > H) {
          p.y += 30;
        }else if(p.y < 0){
          p.y -= 30;
        }else{
          p.y += 8;
        }
        
        if(p.x + p.w > W) {
          p.x += 30;
        }else if(p.x < 0){
          p.x -= 30;
        }else{
          p.x += Math.floor(Math.random() * p.vx * 2);  ;
        }  

    
    ctx1.globalCompositeOperation = "lighter";
    p.draw();
  }
}

function checkParticle(){
  let done = true;
  for(i = 0; i < particles.length; i++){
    var p = particles[i];
    // if(p.x + p.w > 0 && p.x - p.w < 500 && p.y + p.h > 0 && p.y - p.h < 1000){
    //   done = false;
    // }
    if(p.x> 0 && p.x< W && p.y> 0 && p.y< H){
      done = false;
    }

    

  }
  return done;

}

// // first animation
//   window.requestAnimFrame = (function(){
//   return  window.requestAnimationFrame       || 
//     window.webkitRequestAnimationFrame || 
//     window.mozRequestAnimationFrame    || 
//     window.oRequestAnimationFrame      || 
//     window.msRequestAnimationFrame     || 
//     function( callback ){
//       window.setTimeout(callback, 1000 / 60);
//     };
// })();



// var canvas = document.getElementById("canvas1"),
//     ctx1 = canvas.getContext("2d"),
//     keyword1 = "HAPPY BIRTHDAY",
//     keyword2 = "APARNA",
//     imageData,
//     density =2,
//     mouse = {},
//     hovered = false,
//     colors = ["236, 252, 17", "15, 245, 46", "15, 237,  245", "245, 15, 15", "245, 15, 214"],
//     minDist = 30,
//     bounceFactor = 5,
//     count123=0;

// var W = window.innerWidth,
//     H = window.innerHeight;

// canvas.width = W;
// canvas.height = H;

// document.addEventListener("mousemove", function(e) {
//   mouse.x = e.pageX;
//   mouse.y = e.pageY;
// }, false);


// document.addEventListener("touchmove", function(e) {
//  if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
//         //var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
//         mouse.x = e.touches[0].clientX;
//         mouse.y = e.touches[0].clientY;
//     } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
//         mouse.x = e.pageX;
//         mouse.y = e.pageY;
//     }
// }, false);

// document.addEventListener("touchstart", function(e) {
//  if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
//         //var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
//         mouse.x = e.touches[0].clientX;
//         mouse.y = e.touches[0].clientY;
//     } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
//         mouse.x = e.pageX;
//         mouse.y = e.pageY;
//     }
// }, false);


// // Particle Object
// var Particle = function() {
//   this.w = Math.random() * 12.5;
//   this.h = Math.random() * 12.5;
//   this.x = -W;
//   this.y = -H;
//   this.free = false;
  
//   this.vy = (-5 + parseInt(Math.random() * 10) / 2)/1.2;
//   this.vx = (-4 + parseInt(Math.random() * 8))/1.5;
  
//   // Color
//   this.a = Math.random();
//   this.color = colors[parseInt(Math.random()*colors.length)];
  
//   this.setPosition = function(x, y) {
//     this.x = x;
//     this.y = y;
//   };
  
//   this.draw = function() {
//     ctx1.fillStyle = "rgba("+this.color+","+this.a+")";
//     ctx1.fillRect(this.x, this.y,  this.w,  this.h);
//   }
// };

// var particles = [];

// // Draw the text
// function drawText() {
//   ctx1.clearRect(0, 0, W, H);
//   ctx1.fillStyle = "#8800ff";
//   ctx1.font = "100px 'Arial', sans-serif";
//   ctx1.textAlign = "center";
//   ctx1.fillText(keyword1, W/2, H/2 - 50);
//   ctx1.fillText(keyword2, W/2, H/2 + 50);
// }

// // Clear the canvas
// function clear() {
//   ctx1.clearRect(0, 0, W, H);
// }

// // Get pixel positions
// function positionParticles() {
//   // Get the data
//   imageData = ctx1.getImageData(0, 0, W, W);
//   data = imageData.data;
  
//   // Iterate each row and column
//   for (var i = 0; i < imageData.height; i += density) {
//     for (var j = 0; j < imageData.width; j += density) {
      
//       // Get the color of the pixel
//       var color = data[((j * ( imageData.width * 4)) + (i * 4)) - 1];
      
//       // If the color is black, draw pixels
//       if (color == 255) {
//         particles.push(new Particle());
//         particles[particles.length - 1].setPosition(i, j);
//       }
//     }
//   }
// }

// drawText();
// positionParticles();


// // Update
// function update() {
//   clear();
  
//   for(i = 0; i < particles.length; i++) {
//     var p = particles[i];
    
//     if(mouse.x > p.x && mouse.x < p.x + p.w && mouse.y > p.y && mouse.y < p.y + p.h) 
//       hovered = true;
    
//     if(hovered == true) {
      
//       var dist = Math.sqrt((p.x - mouse.x)*(p.x - mouse.x) + (p.y - mouse.y)*(p.y - mouse.y));
      
//       if(dist <= minDist)
//         p.free = true;
      
//       if(p.free == true) {
//         ++count123;
//         p.y += p.vy;
//         p.vy += 0.08;
//         p.x += p.vx;
        
//         // Collision Detection
//         if(p.y + p.h > H) {
//           p.y = H - p.h;
//           p.vy *= -bounceFactor;
          
//           // Friction applied when on the floor
//           if(p.vx > 0)
//             p.vx -= 0.1;
//           else 
//             p.vx += 0.1;
//         }
        
//         if(p.x + p.w > W) {
//           p.x = W - p.w;
//           p.vx *= -bounceFactor;
//         }
        
//         if(p.x < 0) {
//           p.x = 0;
//           p.vx *= -0.5;
//         }
//       }
//     }
    
//     ctx1.globalCompositeOperation = "lighter";
//     p.draw();
//   }
// }

// //update1
// function update1() {
//   clear();
  
//   for(i = 0; i < particles.length; i++) {
//     var p = particles[i];
      
//         ++count123;
//         p.vy = 30;
//         p.y += p.vy;
//         p.vy += 0.05;
//         p.x += p.vx;
        
        
//         if(p.x + p.w > W) {
//           p.x = W - p.w;
//           p.vx *= -bounceFactor;
//         }
        
//         if(p.x < 0) {
//           p.x = 0;
//           p.vx *= -0.5;
//         }
      
    
    
//     ctx1.globalCompositeOperation = "lighter";
//     p.draw();
//   }
// }

// function update2() {
//   clear();
  
//   for(i = 0; i < particles.length; i++) {
//     var p = particles[i];
        

//         ++count123;
//         if(p.y + p.h > 2000) {
//           p.y += 10;
//         }else if(p.y < 0){
//           p.y -= 10;
//         }else{
//           p.y += 30;
//         }
        
//         if(p.x + p.w > 2000) {
//           p.x += 10;
//         }else if(p.x < 0){
//           p.x -= 10;
//         }else{
//           p.x += p.vx;
//         }  
    
    
//     ctx1.globalCompositeOperation = "lighter";
//     p.draw();
//   }
// }

// function checkParticle(){
//   let done = true;
//   for(i = 0; i < particles.length; i++){
//     var p = particles[i];
//     // if(p.x + p.w > 0 && p.x - p.w < 500 && p.y + p.h > 0 && p.y - p.h < 1000){
//     //   done = false;
//     // }
//     if(p.x> 0 && p.x< 2000 && p.y> 0 && p.y< 2000){
//       done = false;
//     }

    

//   }
//   return done;

// }

//var count123 = 0

(function animloop(){
  
   if (count123 > 8000000 && count123 < 9000000) {
     requestAnimFrame(animloop);
     update1();   
   }
   else if(count123 >= 9000000){
      if(checkParticle()){


      // var meta = document.createElement('meta');
      // meta.name = "viewport"
      // meta.content = "width=device-width";
      // document.getElementsByTagName('head')[0].appendChild(meta);
      init1();
       }else{
            requestAnimFrame(animloop);
            update2();

       }

   }
   else{
    requestAnimFrame(animloop);
    update();
   }

  
  
  
})();


function init1() {

const count = document.getElementById('count');
const head = document.getElementById('head');
const giftbox = document.getElementById('merrywrap');
const canvasC = document.getElementById('c');

const config = {
  birthdate: 'Jan 29, 2020',
  name: 'Darlene'
};

// function hideEverything() {
//   head.style.display = 'none';
//   count.style.display = 'none';
//   giftbox.style.display = 'none';
//   canvasC.style.display = 'none';
// }

// hideEverything();



function showConfetti(){
  const confettiSettings = { target: 'confetti' };
  const confetti = new window.ConfettiGenerator(confettiSettings);
  confetti.render();
}


// const second = 1000,
//   minute = second * 60,
//   hour = minute * 60,
//   day = hour * 24;

// let countDown = new Date(`${config.birthdate} 00:00:00`).getTime();
// //x = setInterval(function() {


//   let now = new Date().getTime(),
//     distance = countDown - now;

//   document.getElementById('day').innerText = Math.floor(distance / day);
//   document.getElementById('hour').innerText = Math.floor(
//     (distance % day) / hour
//   );
//   document.getElementById('minute').innerText = Math.floor(
//     (distance % hour) / minute
//   );
//   document.getElementById('second').innerText = Math.floor(
//     (distance % minute) / second
//   );



  let w = (c.width = window.innerWidth),
    h = (c.height = window.innerHeight),
    ctx = c.getContext('2d'),
    hw = w / 2, // half-width
    hh = h / 2,
    opts = {
      //strings_1: [['生日快乐，','Sharice'], ['在新的一年里，','要开心，要勇敢，要快乐'], ['愿所有的幸福，温馨，好运..'],['都在你身边'], ['也不要忘了，你还有一个朋友一直会陪伴你'],['现在就让可爱的小黄人','来为你庆祝生日吧哈哈哈哈']],
      //strings_1: [['生日快乐!','Sharice'], ['送你一句话哈哈'],[' 但愿你的眼睛, 只看得到笑容'],['但愿你流下每一滴泪,','都让人感动'],['但愿你以后每一个梦,','不会一场空'],['还有,'],['不要忘了','你有个朋友会一直陪伴你'],['现在,'],[' 就让小黄人,','为你庆祝生日吧哈哈哈哈']],
      //strings_1:[['生日快乐!','Sharice'],['今天有了你世界更精彩'], ['今天有了你星空更灿烂'],['今天因为你人间更温暖'], ['今天因为你,', '我觉得更幸福!'],['现在,'],[' 就让小黄人,','为你庆祝生日吧哈哈哈哈']],
      // strings_1: [['四季的风吹动了',' 岁月的风铃,'],['奏响为你生日祝福的歌'],['生日快乐!!', 'Sharice',], ['新的一岁里,','愿灿烂阳光照亮你所有的日子'], ['愿美丽的鲜花,','开遍你要走过的每个地方'],['新的一岁，','要开心,要快乐,要幸福'],[' 也请不要忘了,','有一个朋友一直都在你身边'],['现在,'],[' 就让小黄人..','为你庆祝生日吧哈哈哈哈']],
      // strings_1: [['四季的风吹动了',' 岁月的风铃,'],['奏响为你生日祝福的歌'],['生日快乐!!', 'Sharice',], ['新的一岁里,','愿灿烂阳光照亮你所有的日子'], ['愿美丽的鲜花,','开遍你要走过的每个地方'],['新的一岁，','要开心,要快乐,要幸福'],['现在,'],[' 就让小黄人..','为你庆祝生日吧哈哈哈哈']],
      // strings_1: [['四季的风吹动了',' 岁月的风铃,'],['奏响为你生日祝福的歌'],['生日快乐!!', 'Sharice',], ['新的一岁里,','愿灿烂阳光照亮你所有的日子'], ['愿美丽的鲜花,','开遍你要走过的每个地方'],['新的一岁，','要开心,要快乐,要幸福'],['现在,'],[' 就让小黄人..','为你庆祝生日吧哈哈哈哈']],
//今天有了你世界更精彩，今天有了你星空更灿烂，今天因为你人间更温暖，今天因为你我觉得更幸福!祝你生日快乐!
      //用最激动的心情，编辑一条短信，在这个时刻为你送上，因为今天是你的生日，距离再远，也无法阻隔想要对你说，生日快乐。
      strings_1: [["  Happy birthday!", "  Sharice  "], ["   May all happiness,"], ["all luck"], [" always surround", "you  "], ["  Now welcome the", "    Minions to celebrate", "   your birthday haha~"]],

      charSize: 20,
      // charSpacing: 22,
      charSpacing: 15,
      lineHeight: 30,

      cx: w / 2,
      cy: h / 2,

      fireworkPrevPoints: 10,
      fireworkBaseLineWidth: 5,
      fireworkAddedLineWidth: 8,
      fireworkSpawnTime: 10,
      fireworkBaseReachTime: 30,
      fireworkAddedReachTime: 30,
      fireworkCircleBaseSize: 20,
      fireworkCircleAddedSize: 10,
      fireworkCircleBaseTime: 30,
      fireworkCircleAddedTime: 30,
      fireworkCircleFadeBaseTime: 10,
      fireworkCircleFadeAddedTime: 5,
      fireworkBaseShards: 5,
      fireworkAddedShards: 5,
      fireworkShardPrevPoints: 3,
      fireworkShardBaseVel: 4,
      fireworkShardAddedVel: 2,
      fireworkShardBaseSize: 3,
      fireworkShardAddedSize: 3,
      gravity: 0.1,
      upFlow: -0.1,
      letterContemplatingWaitTime: 360,
      balloonSpawnTime: 20,
      balloonBaseInflateTime: 10,
      balloonAddedInflateTime: 10,
      balloonBaseSize: 20,
      balloonAddedSize: 20,
      balloonBaseVel: 0.4,
      balloonAddedVel: 0.4,
      balloonBaseRadian: -(Math.PI / 2 - 0.5),
      balloonAddedRadian: -1
    },

    // calc = {
    //   totalWidth:
    //     opts.charSpacing *
    //     Math.max(opts.strings[0].length, opts.strings[1].length)
    // },
    calc = [],
    Tau = Math.PI * 2,
    TauQuarter = Tau / 4;


  for (let i = 0; i < opts.strings_1.length; i++){
    let totalWidth = 0;
    totalWidth = opts.charSpacing *
        opts.strings_1[i][0].length;
    calc.push(totalWidth);
  }
 calc[5] = opts.charSpacing * 10;
    

  ctx.font = opts.charSize + 'px Verdana';

  function Letter(char, x, y, m) {
    this.char = char;
    this.x = x;
    this.y = y;
    this.m = m;

    this.dx = -ctx.measureText(char).width / 2;
    this.dy = +opts.charSize / 2;

    this.fireworkDy = this.y - hh;

    let hue = (x / calc[m]) * 360;

    this.color = 'hsl(hue,80%,50%)'.replace('hue', hue);
    this.lightAlphaColor = 'hsla(hue,80%,light%,alp)'.replace('hue', hue);
    this.lightColor = 'hsl(hue,80%,light%)'.replace('hue', hue);
    this.alphaColor = 'hsla(hue,80%,50%,alp)'.replace('hue', hue);

    this.reset();
  }
  Letter.prototype.reset = function() {
    this.phase = 'firework';
    this.tick = 0;
    this.spawned = false;
    this.spawningTime = (opts.fireworkSpawnTime * Math.random()) | 0;
    this.reachTime =
      (opts.fireworkBaseReachTime +
        opts.fireworkAddedReachTime * Math.random()) |
      0;
    this.lineWidth =
      opts.fireworkBaseLineWidth + opts.fireworkAddedLineWidth * Math.random();
    this.prevPoints = [[0, hh, 0]];
  };
  Letter.prototype.step = function() {
    if (this.phase === 'firework') {
      if (!this.spawned) {
        ++this.tick;
        if (this.tick >= this.spawningTime) {
          this.tick = 0;
          this.spawned = true;
        }
      } else {
        ++this.tick;

        let linearProportion = this.tick / this.reachTime,
          armonicProportion = Math.sin(linearProportion * TauQuarter),
          x = linearProportion * this.x,
          y = hh + armonicProportion * this.fireworkDy;

        if (this.prevPoints.length > opts.fireworkPrevPoints)
          this.prevPoints.shift();

        this.prevPoints.push([x, y, linearProportion * this.lineWidth]);

        let lineWidthProportion = 1 / (this.prevPoints.length - 1);

        for (let i = 1; i < this.prevPoints.length; ++i) {
          let point = this.prevPoints[i],
            point2 = this.prevPoints[i - 1];

          ctx.strokeStyle = this.alphaColor.replace(
            'alp',
            i / this.prevPoints.length
          );
          ctx.lineWidth = point[2] * lineWidthProportion * i;
          ctx.beginPath();
          ctx.moveTo(point[0], point[1]);
          ctx.lineTo(point2[0], point2[1]);
          ctx.stroke();
        }

        if (this.tick >= this.reachTime) {
          this.phase = 'contemplate';

          this.circleFinalSize =
            opts.fireworkCircleBaseSize +
            opts.fireworkCircleAddedSize * Math.random();
          this.circleCompleteTime =
            (opts.fireworkCircleBaseTime +
              opts.fireworkCircleAddedTime * Math.random()) |
            0;
          this.circleCreating = true;
          this.circleFading = false;

          this.circleFadeTime =
            (opts.fireworkCircleFadeBaseTime +
              opts.fireworkCircleFadeAddedTime * Math.random()) |
            0;
          this.tick = 0;
          this.tick2 = 0;

          this.shards = [];

          let shardCount =
              (opts.fireworkBaseShards +
                opts.fireworkAddedShards * Math.random()) |
              0,
            angle = Tau / shardCount,
            cos = Math.cos(angle),
            sin = Math.sin(angle),
            x = 1,
            y = 0;

          for (let i = 0; i < shardCount; ++i) {
            let x1 = x;
            x = x * cos - y * sin;
            y = y * cos + x1 * sin;

            this.shards.push(new Shard(this.x, this.y, x, y, this.alphaColor));
          }
        }
      }
    } else if (this.phase === 'contemplate') {
      ++this.tick;

      if (this.circleCreating) {
        ++this.tick2;
        let proportion = this.tick2 / this.circleCompleteTime,
          armonic = -Math.cos(proportion * Math.PI) / 2 + 0.5;

        ctx.beginPath();
        ctx.fillStyle = this.lightAlphaColor
          .replace('light', 50 + 50 * proportion)
          .replace('alp', proportion);
        ctx.beginPath();
        ctx.arc(this.x, this.y, armonic * this.circleFinalSize, 0, Tau);
        ctx.fill();

        if (this.tick2 > this.circleCompleteTime) {
          this.tick2 = 0;
          this.circleCreating = false;
          this.circleFading = true;
        }
      } else if (this.circleFading) {
        ctx.fillStyle = this.lightColor.replace('light', 70);
        ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);

        ++this.tick2;
        let proportion = this.tick2 / this.circleFadeTime,
          armonic = -Math.cos(proportion * Math.PI) / 2 + 0.5;

        ctx.beginPath();
        ctx.fillStyle = this.lightAlphaColor
          .replace('light', 100)
          .replace('alp', 1 - armonic);
        ctx.arc(this.x, this.y, this.circleFinalSize, 0, Tau);
        ctx.fill();

        if (this.tick2 >= this.circleFadeTime) this.circleFading = false;
      } else {
        ctx.fillStyle = this.lightColor.replace('light', 70);
        ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);
      }

      for (let i = 0; i < this.shards.length; ++i) {
        this.shards[i].step();

        if (!this.shards[i].alive) {
          this.shards.splice(i, 1);
          --i;
        }
      }

      if (this.tick > opts.letterContemplatingWaitTime) {
        this.phase = 'balloon';

        this.tick = 0;
        this.spawning = true;
        this.spawnTime = (opts.balloonSpawnTime * Math.random()) | 0;
        this.inflating = false;
        this.inflateTime =
          (opts.balloonBaseInflateTime +
            opts.balloonAddedInflateTime * Math.random()) |
          0;
        this.size =
          (opts.balloonBaseSize + opts.balloonAddedSize * Math.random()) | 0;

        let rad =
            opts.balloonBaseRadian + opts.balloonAddedRadian * Math.random(),
          vel = opts.balloonBaseVel + opts.balloonAddedVel * Math.random();

        this.vx = Math.cos(rad) * vel;
        this.vy = Math.sin(rad) * vel;
      }
    } else if (this.phase === 'balloon') {
      ctx.strokeStyle = this.lightColor.replace('light', 80);

      if (this.spawning) {
        ++this.tick;
        ctx.fillStyle = this.lightColor.replace('light', 70);
        ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);

        if (this.tick >= this.spawnTime) {
          this.tick = 0;
          this.spawning = false;
          this.inflating = true;
        }
      } else if (this.inflating) {
        ++this.tick;

        let proportion = this.tick / this.inflateTime,
          x = (this.cx = this.x),
          y = (this.cy = this.y - this.size * proportion);

        ctx.fillStyle = this.alphaColor.replace('alp', proportion);
        ctx.beginPath();
        generateBalloonPath(x, y, this.size * proportion);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, this.y);
        ctx.stroke();

        ctx.fillStyle = this.lightColor.replace('light', 70);
        ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);

        if (this.tick >= this.inflateTime) {
          this.tick = 0;
          this.inflating = false;
        }
      } else {
        this.cx += this.vx;
        this.cy += this.vy += opts.upFlow;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        generateBalloonPath(this.cx, this.cy, this.size);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(this.cx, this.cy);
        ctx.lineTo(this.cx, this.cy + this.size);
        ctx.stroke();

        ctx.fillStyle = this.lightColor.replace('light', 70);
        ctx.fillText(
          this.char,
          this.cx + this.dx,
          this.cy + this.dy + this.size
        );

        if (this.cy + this.size < -hh -20 || this.cx < -hw || this.cy > hw)
          this.phase = 'done';
      }
    }
  };

  function Shard(x, y, vx, vy, color) {
    let vel =
      opts.fireworkShardBaseVel + opts.fireworkShardAddedVel * Math.random();

    this.vx = vx * vel;
    this.vy = vy * vel;

    this.x = x;
    this.y = y;

    this.prevPoints = [[x, y]];
    this.color = color;

    this.alive = true;

    this.size =
      opts.fireworkShardBaseSize + opts.fireworkShardAddedSize * Math.random();
  }
  Shard.prototype.step = function() {
    this.x += this.vx;
    this.y += this.vy += opts.gravity;

    if (this.prevPoints.length > opts.fireworkShardPrevPoints)
      this.prevPoints.shift();

    this.prevPoints.push([this.x, this.y]);

    let lineWidthProportion = this.size / this.prevPoints.length;

    for (let k = 0; k < this.prevPoints.length - 1; ++k) {
      let point = this.prevPoints[k],
        point2 = this.prevPoints[k + 1];

      ctx.strokeStyle = this.color.replace('alp', k / this.prevPoints.length);
      ctx.lineWidth = k * lineWidthProportion;
      ctx.beginPath();
      ctx.moveTo(point[0], point[1]);
      ctx.lineTo(point2[0], point2[1]);
      ctx.stroke();
    }

    if (this.prevPoints[0][1] > hh) this.alive = false;
  };

  function generateBalloonPath(x, y, size) {
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
      x - size / 2,
      y - size / 2,
      x - size / 4,
      y - size,
      x,
      y - size
    );
    ctx.bezierCurveTo(x + size / 4, y - size, x + size / 2, y - size / 2, x, y);
  }

var m1 = 0;

  function anim() {


  	if (m1 === (sentences.length)){
          // $("#homeVideo").modal('toggle');
          openModal(); 
          // return 0;
    } else {  
    window.requestAnimationFrame(anim);

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, w, h);

    ctx.translate(hw, hh);
    
    let done = true;

    for (let i = 0; i < sentences.length; ++i){
        
    for (let l = 0; l < sentences[i].length; ++l) {
      if (sentences[i][l].m === m1 && sentences[i][l].char !== " "){
        sentences[i][l].step();
        if (sentences[i][l].phase !== 'done') done = false;
      }

      //if (sentences[i][j].phase !== 'done') done = false;
      }

    }
    ctx.translate(-hw, -hh); 
    //if (done === true) return 0;
    if (done === true){

        ++m1;
        
      }
    
    //ctx.translate(-hw, -hh);
     //if (done) for (let l = 0; l < letters.length; ++l) letters[l].reset();
     }  
}

$('#homeVideo').on('hidden.bs.modal', function () {
    //player.stopVideo();
   // or jQuery
   $(this).find('video')[0].pause();

   // or remove video url
   //$('playerID').attr('src', '');
   // buttonIn();
   setTimeout(setButton, 100);
   setTimeout(imageIn, 100);
   setTimeout(setImage, 500);
   setVideoClose2();


})
   

let button1 = document.getElementById('one');
let button2 = document.getElementById('second');
let button3 = document.getElementById('third');
let buttons = document.getElementById('buttons');



// function buttonIn() {   
//    buttons.className = "buttons step-6";   
//     }

function setButton() {
  // document.getElementById("one").style.opacity = 1;
  // document.getElementById("one").style.marginTop = "0px";
  // document.getElementById("second").style.opacity = 1;
  // document.getElementById("second").style.marginTop = "0px";
  // document.getElementById("third").style.opacity = 1;
  // document.getElementById("third").style.marginTop = "0px";
  document.getElementById("one").style.pointerEvents = "auto";
  document.getElementById("second").style.pointerEvents = "auto";
  document.getElementById("third").style.pointerEvents = "auto";
 document.getElementById("buttons").style.bottom = 0;
  document.getElementById("buttons").style.opacity = 1;
  buttons.className = "buttons";
  button1.addEventListener('click', openModal, false)
  button3.addEventListener('click', message, false)
  

}

// buttonIn();

function openModal(){
  $("#homeVideo").modal('show');
    document.getElementById("buttons").style.opacity = 0;
    document.getElementsByClassName("birthdayimage")[0].style.opacity = 0;
    setTimeout(setVideoClose1, 210000);
    setTimeout(setVideoClose2, 215000);
}

function message(){
  window.alert("已经准备好了，可以寄给你，或者放在pigeon hole哈哈哈")
  document
}

let birthdayImage = document.getElementsByClassName('birthdayimage')[0];

function imageIn(){
  birthdayImage.className = 'step-7 birthdayimage';
  birthdayImage.id = 'birthdayimage';
}

function setImage(){

  document.getElementsByClassName("birthdayimage")[0].style.opacity = "1";
  birthdayImage.className = "birthdayimage";
  birthdayImage.id = 'birthdayimage';

}

function setVideoClose1(){

  document.getElementById("videoclose").style.opacity = "1";

}

function setVideoClose2(){

  document.getElementById("videoclose").style.opacity = "0";

}






// var sentences = [];
// for (let m=0; m<opts.strings_1.length; ++m){
//   var letters = [];
//   for (let i = 0; i < opts.strings_1[m].length; ++i) {
//     for (let j = 0; j < opts.strings_1[m][i].length; ++j) {
//       letters.push(
//         new Letter(
//           opts.strings_1[m][i][j],
//           j * opts.charSpacing +
//             opts.charSpacing / 2 -
//             (opts.strings_1[m][i].length * opts.charSize) / 2 -12,
//           i * opts.lineHeight +
//             opts.lineHeight / 2 -
//             (opts.strings_1[m].length * opts.lineHeight) / 2,
//           m
//         )
//       );
//     }
//   }
//   sentences.push(letters);
// }

var sentences = [];
for (let m=0; m<opts.strings_1.length; ++m){
  var letters = [];
  for (let i = 0; i < opts.strings_1[m].length; ++i) {
    for (let j = 0; j < opts.strings_1[m][i].length; ++j) {
      letters.push(
        new Letter(
          opts.strings_1[m][i][j],
          j * opts.charSpacing +
            opts.charSpacing / 2 -
            (opts.strings_1[m][i].length * opts.charSize) / 2 + 30,
          i * opts.lineHeight +
            opts.lineHeight / 2 -
            (opts.strings_1[m].length * opts.lineHeight) / 2,
          m
        )
      );
    }
  }
  sentences.push(letters);
}

  window.addEventListener('resize', function() {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;

    hw = w / 2;
    hh = h / 2;

    ctx.font = opts.charSize + 'px Verdana';
  });

  if (false) {
    head.style.display = 'initial';
    count.style.display = 'initial';
  } else {
    //head.style.display = 'none';
    //count.style.display = 'none';
    giftbox.style.display = 'initial';
    //clearInterval(x);
    let merrywrap = document.getElementById('merrywrap');
    let box = merrywrap.getElementsByClassName('giftbox')[0];
    let step = 1;
    let stepMinutes = [2000, 2000, 1000, 1000];

    let homeVideo = document.getElementById('homeVideo');

    function init() {

      

      

      giftboxIn();

      changeColor();

      setTimeout(setMerrywrap, 3000);

      setTimeout(showConfetti, 500);

      //merrywrap.className = 'merrywrap';

      //setTimeout(box.addEventListener('click', openBox, false), 20000);
      //setTimeout(box.addEventListener('click', showfireworks, false), 20000);
      setTimeout(addClickEvent, 3000);
 


    }
    init();

    function stepClass(step) {
      merrywrap.className = 'merrywrap';
      merrywrap.className = 'merrywrap step-' + step;
    }

    function openBox() {
      if (step === 1) {
        box.removeEventListener('click', openBox, false);
        setTimeout(removeShowFireworkClick, 500);
      }
      stepClass(step);
      if (step === 3) {
        removeMerrywrap();

      }
      if (step === 4) {
        
        return;
      }
      setTimeout(openBox, stepMinutes[step - 1]);
      step++;
      //   setTimeout(anim, 1900);
    }

    function setMerrywrap() {
      document.getElementById("giftbox").style.bottom = "55px";
      document.getElementById("giftbox").style.opacity = 1;
      merrywrap.className = 'merrywrap';
    }

    function addClickEvent() {
      box.addEventListener('click', openBox, false);
      box.addEventListener('click', showfireworks, false);
    }

    function removeShowFireworkClick(){
      box.removeEventListener('click', showfireworks, false);
    }

    function giftboxIn() {   
      merrywrap.className = 'merrywrap step-5';     
      //merrywrap.className = 'merrywrap';
    }

    function showfireworks() {
      canvasC.style.display = 'initial';    
      setTimeout(anim, 1500);
      // setTimeout(openModal, 55000);
    }

    function changeColor(){
      let canvas1 = document.getElementById('canvas1');
      canvas1.className = 'canvas2';
    }

    function removeMerrywrap(){
      merrywrap.remove();

    }



// // first animation
//   window.requestAnimFrame = (function(){
//   return  window.requestAnimationFrame       || 
//     window.webkitRequestAnimationFrame || 
//     window.mozRequestAnimationFrame    || 
//     window.oRequestAnimationFrame      || 
//     window.msRequestAnimationFrame     || 
//     function( callback ){
//       window.setTimeout(callback, 1000 / 60);
//     };
// })();

// var canvas = document.getElementById("canvas1"),
//     ctx1 = canvas.getContext("2d"),
//     keyword1 = "HAPPY BIRTHDAY",
//     keyword2 = "APARNA",
//     imageData,
//     density =1,
//     mouse = {},
//     hovered = false,
//     colors = ["236, 252, 17", "15, 245, 46", "15, 237,  245", "245, 15, 15", "245, 15, 214"],
//     minDist = 30,
//     bounceFactor = 5
//     count123=0;

// var W = window.innerWidth,
//     H = window.innerHeight;

// canvas.width = W;
// canvas.height = H;

// document.addEventListener("mousemove", function(e) {
//   mouse.x = e.pageX;
//   mouse.y = e.pageY;
// }, false);


// document.addEventListener("touchmove", function(e) {
//  if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
//         //var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
//         mouse.x = e.touches[0].clientX;
//         mouse.y = e.touches[0].clientY;
//     } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
//         mouse.x = e.pageX;
//         mouse.y = e.pageY;
//     }
// }, false);

// document.addEventListener("touchstart", function(e) {
//  if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
//         //var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
//         mouse.x = e.touches[0].clientX;
//         mouse.y = e.touches[0].clientY;
//     } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
//         mouse.x = e.pageX;
//         mouse.y = e.pageY;
//     }
// }, false);


// // Particle Object
// var Particle = function() {
//   this.w = Math.random() * 6.5;
//   this.h = Math.random() * 6.5;
//   this.x = -W;
//   this.y = -H;
//   this.free = false;
  
//   this.vy = (-5 + parseInt(Math.random() * 10) / 2)/1.7;
//   this.vx = (-4 + parseInt(Math.random() * 8))/1.6;
  
//   // Color
//   this.a = Math.random();
//   this.color = colors[parseInt(Math.random()*colors.length)];
  
//   this.setPosition = function(x, y) {
//     this.x = x;
//     this.y = y;
//   };
  
//   this.draw = function() {
//     ctx1.fillStyle = "rgba("+this.color+","+this.a+")";
//     ctx1.fillRect(this.x, this.y,  this.w,  this.h);
//   }
// };

// var particles = [];

// // Draw the text
// function drawText() {
//   ctx1.clearRect(0, 0, W, H);
//   ctx1.fillStyle = "#8800ff";
//   ctx1.font = "45px 'Arial', sans-serif";
//   ctx1.textAlign = "center";
//   ctx1.fillText(keyword1, W/2, H/2 - 30);
//   ctx1.fillText(keyword2, W/2, H/2 + 20);
// }

// // Clear the canvas
// function clear() {
//   ctx1.clearRect(0, 0, W, H);
// }

// // Get pixel positions
// function positionParticles() {
//   // Get the data
//   imageData = ctx1.getImageData(0, 0, W, W);
//   data = imageData.data;
  
//   // Iterate each row and column
//   for (var i = 0; i < imageData.height; i += density) {
//     for (var j = 0; j < imageData.width; j += density) {
      
//       // Get the color of the pixel
//       var color = data[((j * ( imageData.width * 4)) + (i * 4)) - 1];
      
//       // If the color is black, draw pixels
//       if (color == 255) {
//         particles.push(new Particle());
//         particles[particles.length - 1].setPosition(i, j);
//       }
//     }
//   }
// }

// drawText();
// positionParticles();


// // Update
// function update() {
//   clear();
  
//   for(i = 0; i < particles.length; i++) {
//     var p = particles[i];
    
//     if(mouse.x > p.x && mouse.x < p.x + p.w && mouse.y > p.y && mouse.y < p.y + p.h) 
//       hovered = true;
    
//     if(hovered == true) {
      
//       var dist = Math.sqrt((p.x - mouse.x)*(p.x - mouse.x) + (p.y - mouse.y)*(p.y - mouse.y));
      
//       if(dist <= minDist)
//         p.free = true;
      
//       if(p.free == true) {
//         ++count123;
//         p.y += p.vy;
//         p.vy += 0.05;
//         p.x += p.vx;
        
//         // Collision Detection
//         if(p.y + p.h > H) {
//           p.y = H - p.h;
//           p.vy *= -bounceFactor;
          
//           // Friction applied when on the floor
//           if(p.vx > 0)
//             p.vx -= 0.1;
//           else 
//             p.vx += 0.1;
//         }
        
//         if(p.x + p.w > W) {
//           p.x = W - p.w;
//           p.vx *= -bounceFactor;
//         }
        
//         if(p.x < 0) {
//           p.x = 0;
//           p.vx *= -0.5;
//         }
//       }
//     }
    
//     ctx1.globalCompositeOperation = "lighter";
//     p.draw();
//   }
// }

// //update1
// function update1() {
//   clear();
  
//   for(i = 0; i < particles.length; i++) {
//     var p = particles[i];
      
//         ++count123;
//         p.vy = 30;
//         p.y += p.vy;
//         p.vy += 0.05;
//         p.x += p.vx;
        
        
//         if(p.x + p.w > W) {
//           p.x = W - p.w;
//           p.vx *= -bounceFactor;
//         }
        
//         if(p.x < 0) {
//           p.x = 0;
//           p.vx *= -0.5;
//         }
      
    
    
//     ctx1.globalCompositeOperation = "lighter";
//     p.draw();
//   }
// }

// //var count123 = 0

// (function animloop(){
  
//    if (count123 > 100000 && count123 < 200000) {
//      requestAnimFrame(animloop);
//      update1();   
//    }
//    else if(count123 >= 200000){
//       init();

//    }
//    else{
//     requestAnimFrame(animloop);
//     update();
//    }

  
  
  
// })();

  
  }
};




  // if (distance < 0) {
  //     clearInterval(x);
  //     console.log("happy birthday");
  // }
//}, second);

