/* eslint-disable new-cap */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-var */
/* eslint-disable no-return-assign */
/* eslint-disable no-invalid-this */
/* eslint-disable no-sequences */

function n(e) {
  this.init(e || {});
}
n.prototype = {
  init: function (e) {
    this.phase = e.phase || 0;
    this.offset = e.offset || 0;
    this.frequency = e.frequency || 0.001;
    this.amplitude = e.amplitude || 1;
  },
  update: function () {
    return (
      (this.phase += this.frequency),
      (e = this.offset + Math.sin(this.phase) * this.amplitude)
    );
  },
  value: function () {
    return e;
  },
};

function Line(e) {
  this.init(e || {});
}
Line.prototype = {
  init: function (e) {
    this.spring = e.spring + 0.1 * Math.random() - 0.05;
    this.friction = E.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];
    for (var t, n = 0; n < E.size; n++) {
      t = new Node();
      t.x = pos.x;
      t.y = pos.y;
      this.nodes.push(t);
    }
  },
  update: function () {
    let e = this.spring;
    let t = this.nodes[0];
    t.vx += (pos.x - t.x) * e;
    t.vy += (pos.y - t.y) * e;
    for (var n, i = 0, a = this.nodes.length; i < a; i++)
      (t = this.nodes[i]),
        0 < i &&
          ((n = this.nodes[i - 1]),
          (t.vx += (n.x - t.x) * e),
          (t.vy += (n.y - t.y) * e),
          (t.vx += n.vx * E.dampening),
          (t.vy += n.vy * E.dampening)),
        (t.vx *= this.friction),
        (t.vy *= this.friction),
        (t.x += t.vx),
        (t.y += t.vy),
        (e *= E.tension);
  },
  draw: function () {
    let e;
    let t;
    let n = this.nodes[0].x;
    let i = this.nodes[0].y;
    ctx.beginPath();
    ctx.moveTo(n, i);
    for (var a = 1, o = this.nodes.length - 2; a < o; a++) {
      e = this.nodes[a];
      t = this.nodes[a + 1];
      n = 0.5 * (e.x + t.x);
      i = 0.5 * (e.y + t.y);
      ctx.quadraticCurveTo(e.x, e.y, n, i);
    }
    e = this.nodes[a];
    t = this.nodes[a + 1];
    ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
    ctx.stroke();
    ctx.closePath();
  },
};
function onMousemove(e) {
  function o() {
    lines = [];
    for (let e = 0; e < E.trails; e++)
      lines.push(new Line({ spring: 0.45 + (e / E.trails) * 0.025 }));
  }
  function c(e) {
    e.touches
      ? ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY))
      : ((pos.x = e.clientX), (pos.y = e.clientY)),
      e.preventDefault();
  }
  function l(e) {
    e.touches.length == 1 &&
      ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY));
  }
  document.removeEventListener('mousemove', onMousemove),
    document.removeEventListener('touchstart', onMousemove),
    document.addEventListener('mousemove', c),
    document.addEventListener('touchmove', c),
    document.addEventListener('touchstart', l),
    c(e),
    o(),
    render();
}
function render() {
  if (ctx.running) {
    ctx.globalCompositeOperation = 'source-over';
    // ctx.fillStyle = '#065f46';
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = 'hsla(' + Math.round(f.update()) + ',90%,50%,0.25)';
    ctx.lineWidth = 1;
    // ctx.frame % 60 == 0 &&
    //   console.log(
    //     f.update(),
    //     Math.round(f.update()),
    //     f.phase,
    //     f.offset,
    //     f.frequency,
    //     f.amplitude
    //   );
    for (var e, t = 0; t < E.trails; t++) {
      (e = lines[t]).update();
      e.draw();
    }
    ctx.frame++;
    window.requestAnimationFrame(render);
  }
}
function resizeCanvas() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}
let ctx;
let f;
var e = 0;
var pos = {};
var lines = [];
var E = {
  debug: true,
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98,
};
function Node() {
  this.x = 0;
  this.y = 0;
  this.vy = 0;
  this.vx = 0;
}

export const renderCanvas = function () {
  ctx = document.getElementById('canvas').getContext('2d');
  ctx.running = true;
  ctx.frame = 1;
  f = new n({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });
  document.addEventListener('mousemove', onMousemove);
  document.addEventListener('touchstart', onMousemove);
  document.body.addEventListener('orientationchange', resizeCanvas);
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('focus', () => {
    if (!ctx.running) {
      ctx.running = true;
      render();
    }
  });
  window.addEventListener('blur', () => {
    ctx.running = true;
  });
  resizeCanvas();
};
