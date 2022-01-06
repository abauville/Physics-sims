let part = [];
let g = {x: 0.0, y: 1.0};
let dt = 0.5;

let xmin = -250;
let xmax = 250;
let ymin = -250;
let ymax = 250;

let img;
function preload() {
  img = createImage(16, 16);
}



function set_image(A=0.5, c=0.2) {
  
  // img = createImage(66, 66);
  img.loadPixels();
  for (let i = 0; i < img.width; i++) {
    let x = -.5 + i*1.0/(img.width-1);
    for (let j = 0; j < img.height; j++) {
      let y = -.5 + j*1.0/(img.height-1);
      let I = A*Math.exp(-(x**2/(2.*c**2)) - (y**2/(2.*c**2)));
      img.set(i, j, color(255,255,255,255*I));
    }
  }
  img.updatePixels();
}

function Part(x,y, vx=0, vy=0) {
  return {
    x,
    y,
    vx,
    vy,
    draw() {
      // console.log(this.x, this.y);
      // ellipse(this.x,this.y,5,5);
      image(img, this.x, this.y);
    },
    step() {
      this.boundary_response();
      this.vx += g.x * dt;
      this.vy += g.y *dt;
      
      this.x += this.vx * dt;
      this.y += this.vy * dt ;
    },
    boundary_response() {
      if (this.x>=xmax) {
        this.vx = -Math.abs(this.vx);
      }
      if (this.x<=xmin) {
        this.vx = Math.abs(this.vx);
      }
      if (this.y>=ymax) {
        this.vy = -Math.abs(this.vy);
      }
      if (this.y<=ymin) {
        this.vy = Math.abs(this.vy);
      }
    }
  }
}

function setup() {
  createCanvas(xmax-xmin, ymax-ymin, WEBGL);
  blendMode(ADD);
  noStroke();
  fill(255,0,0,10);
  set_image();
  
  let x_start = xmin+50;
  let x_end = xmin+150;
  let nx = 50;
  
  let y_start = ymin+50;
  let y_end = ymin+150;
  let ny = 50;
  
  let ini_vel_fac = 30.0;
  
  
  for (let iy=0; iy<ny; iy++) {
    let y = y_start + iy*(y_end-y_start)/(ny-1);
    // part.push([]);
    for (let ix=0; ix<nx; ix++) {
      let x = x_start + ix*(x_end-x_start)/(nx-1);
      let vx = (Math.random()-0.5)*ini_vel_fac;
      let vy = (Math.random()-0.5)*ini_vel_fac;
      part.push(Part(x, y, vx, vy));
    }
  }
  noLoop();
}



function draw() {
  background(00);
  let p;
  // for (let i=0; i<part.length; i++) {
  //   p = part[i];
  //   p.step();
  //   p.draw();     
  // }
  part.forEach(p=>{
    p.step();
    p.draw();
  });

  if (stopDraw) {
      noLoop();
  }
  
  
}