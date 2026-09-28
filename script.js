"use strict";

// restart animation on click
var element = document.getElementById("button6");
element.addEventListener("click", function(e){
  element.classList.remove("button6");
  void element.offsetWidth;
  element.classList.add("button6");
}, false);

var clickSoundButton = document.getElementsByClassName("button14")[0];
clickSoundButton.addEventListener("mousedown", function(e){
  var audio = new Audio('switchSound.wav');
  audio.play();
}, false)

clickSoundButton.addEventListener("mouseup", function(e){
  var audio = new Audio('switchSound.wav');
  audio.play();
}, false)

var button22 = document.getElementById("button22");
button22.addEventListener("mousemove", function(e){
  var rect = button22.getBoundingClientRect();
  let x = e.clientX-rect.left;
  let y = e.clientY-rect.top;
  button22.style = "background-image: radial-gradient(circle 8vmin at " + x + "px " + y + "px, rgba(80, 80, 80,  0.5), transparent);"
});

button22.addEventListener("mouseleave", function(e){
  button22.style = "background: transparent;"
});

// keyboard clicks have no pointer position (detail 0), fall back to the center
function clickPoint(e, rect){
  if (e.detail === 0) {
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }
  return { x: e.clientX, y: e.clientY };
}

// 25: ripple
var button25 = document.getElementsByClassName("button25")[0];
button25.addEventListener("click", function(e){
  var rect = button25.getBoundingClientRect();
  var point = clickPoint(e, rect);
  var size = Math.max(rect.width, rect.height);
  var ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.width = size + "px";
  ripple.style.height = size + "px";
  ripple.style.left = (point.x - rect.left - size / 2) + "px";
  ripple.style.top = (point.y - rect.top - size / 2) + "px";
  button25.appendChild(ripple);
  ripple.addEventListener("animationend", function(){
    ripple.remove();
  });
});

// 26: magnetic
var button26 = document.getElementsByClassName("button26")[0];
var magnetArea = button26.parentElement;
magnetArea.addEventListener("mousemove", function(e){
  var rect = magnetArea.getBoundingClientRect();
  var dx = e.clientX - (rect.left + rect.width / 2);
  var dy = e.clientY - (rect.top + rect.height / 2);
  button26.style.transform = "translate(" + dx * 0.35 + "px, " + dy * 0.35 + "px)";
  button26.firstElementChild.style.transform = "translate(" + dx * 0.15 + "px, " + dy * 0.15 + "px)";
});

magnetArea.addEventListener("mouseleave", function(e){
  button26.style.transform = "";
  button26.firstElementChild.style.transform = "";
});

// 30: confetti
var button30 = document.getElementsByClassName("button30")[0];
var confettiColors = ["#d42426", "#1f8a3b", "#f8b229", "#ffffff", "#3aa0ff"];
button30.addEventListener("click", function(e){
  var point = clickPoint(e, button30.getBoundingClientRect());
  for (var i = 0; i < 40; i++) {
    var piece = document.createElement("span");
    var angle = Math.random() * Math.PI * 2;
    var distance = 30 + Math.random() * 110;
    piece.className = "confetti";
    piece.style.left = point.x + "px";
    piece.style.top = point.y + "px";
    piece.style.background = confettiColors[i % confettiColors.length];
    piece.style.setProperty("--dx", Math.cos(angle) * distance + "px");
    piece.style.setProperty("--dy", Math.sin(angle) * distance - 40 + "px");
    piece.style.setProperty("--rot", (Math.random() * 1440 - 720) + "deg");
    piece.addEventListener("animationend", function(){
      this.remove();
    });
    document.body.appendChild(piece);
  }
});

// 32: text scramble
var button32 = document.getElementsByClassName("button32")[0];
var scrambleText = button32.dataset.text;
var scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*";
var scrambleTimer = null;
button32.addEventListener("mouseenter", function(){
  var iteration = 0;
  clearInterval(scrambleTimer);
  scrambleTimer = setInterval(function(){
    button32.textContent = scrambleText.split("").map(function(letter, i){
      if (i < iteration) {
        return letter;
      }
      return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
    }).join("");
    if (iteration >= scrambleText.length) {
      clearInterval(scrambleTimer);
    }
    iteration += 1 / 3;
  }, 40);
});

// 33: hold to confirm, the fill only completes while the button is still held
var button33 = document.getElementsByClassName("button33")[0];
button33.addEventListener("transitionend", function(e){
  if (e.pseudoElement !== "::before" || !button33.matches(":active")) {
    return;
  }
  button33.classList.add("done");
  button33.textContent = "Deleted!";
  setTimeout(function(){
    button33.classList.remove("done");
    button33.textContent = "Hold to delete";
  }, 1500);
});

// 35: canvas snowfall, faster on hover, a gust of wind on click
var button35 = document.getElementsByClassName("button35")[0];
var snowCanvas = button35.querySelector("canvas");
var snowCtx = snowCanvas.getContext("2d");
var flakes = [];
var snowWind = 0;
var snowHover = false;

function resizeSnow(){
  var rect = snowCanvas.getBoundingClientRect();
  var dpr = window.devicePixelRatio || 1;
  snowCanvas.width = rect.width * dpr;
  snowCanvas.height = rect.height * dpr;
}
resizeSnow();
window.addEventListener("resize", resizeSnow);

for (var i = 0; i < 60; i++) {
  flakes.push({
    x: Math.random(),
    y: Math.random(),
    r: 0.5 + Math.random() * 1.5,
    speed: 0.002 + Math.random() * 0.004,
    phase: Math.random() * Math.PI * 2
  });
}

function drawSnow(time){
  var w = snowCanvas.width;
  var h = snowCanvas.height;
  var dpr = window.devicePixelRatio || 1;
  snowCtx.clearRect(0, 0, w, h);
  snowCtx.fillStyle = "white";
  flakes.forEach(function(f){
    f.y += f.speed * (snowHover ? 3 : 1);
    f.x += Math.sin(time / 1000 + f.phase) * 0.001 + snowWind * 0.01;
    if (f.y > 1) {
      f.y = 0;
      f.x = Math.random();
    }
    f.x = (f.x + 1) % 1;
    snowCtx.beginPath();
    snowCtx.arc(f.x * w, f.y * h, f.r * dpr, 0, Math.PI * 2);
    snowCtx.fill();
  });
  snowWind *= 0.96;
  requestAnimationFrame(drawSnow);
}
requestAnimationFrame(drawSnow);

button35.addEventListener("mouseenter", function(){ snowHover = true; });
button35.addEventListener("mouseleave", function(){ snowHover = false; });
button35.addEventListener("click", function(){ snowWind = 1.5; });

// 38: jelly squish with the Web Animations API
var button38 = document.getElementsByClassName("button38")[0];
button38.addEventListener("click", function(){
  button38.animate([
    { transform: "scale(1, 1)" },
    { transform: "scale(1.25, 0.75)" },
    { transform: "scale(0.75, 1.25)" },
    { transform: "scale(1.15, 0.85)" },
    { transform: "scale(0.95, 1.05)" },
    { transform: "scale(1.05, 0.95)" },
    { transform: "scale(1, 1)" }
  ], { duration: 700, easing: "ease-in-out" });
});

// 42: shake + vibrate
var button42 = document.getElementsByClassName("button42")[0];
button42.addEventListener("click", function(){
  button42.classList.remove("shake");
  void button42.offsetWidth;
  button42.classList.add("shake");
  if (navigator.vibrate) {
    navigator.vibrate([60, 40, 60]);
  }
});

button42.addEventListener("animationend", function(){
  button42.classList.remove("shake");
});

// 43: 3D tilt, offsetX/Y are in the untransformed box so the tilt does not feed back
var button43 = document.getElementsByClassName("button43")[0];
button43.addEventListener("mousemove", function(e){
  var px = e.offsetX / button43.offsetWidth;
  var py = e.offsetY / button43.offsetHeight;
  button43.style.setProperty("--rx", (0.5 - py) * 30 + "deg");
  button43.style.setProperty("--ry", (px - 0.5) * 30 + "deg");
  button43.style.setProperty("--gx", px * 100 + "%");
  button43.style.setProperty("--gy", py * 100 + "%");
});

button43.addEventListener("mouseleave", function(){
  button43.style.setProperty("--rx", "0deg");
  button43.style.setProperty("--ry", "0deg");
});

// 44: Jingle Bells with the Web Audio API
var button44 = document.getElementsByClassName("button44")[0];
var audioCtx = null;
var jingleBusy = false;
var noteFreq = { C: 523.25, D: 587.33, E: 659.25, G: 783.99 };
var jingle = [["E", 1], ["E", 1], ["E", 2], ["E", 1], ["E", 1], ["E", 2], ["E", 1], ["G", 1], ["C", 1.5], ["D", 0.5], ["E", 4]];
button44.addEventListener("click", function(){
  if (jingleBusy) {
    return;
  }
  jingleBusy = true;
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  var beat = 0.18;
  var t = audioCtx.currentTime + 0.05;
  jingle.forEach(function(note){
    var osc = audioCtx.createOscillator();
    var gain = audioCtx.createGain();
    var length = note[1] * beat;
    osc.type = "triangle";
    osc.frequency.value = noteFreq[note[0]];
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.3, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + length);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + length);
    t += length;
  });
  button44.classList.add("ringing");
  setTimeout(function(){
    button44.classList.remove("ringing");
    jingleBusy = false;
  }, (t - audioCtx.currentTime) * 1000);
});

// 47: runaway button
var button47 = document.getElementsByClassName("button47")[0];
var dodges = 0;
button47.addEventListener("mouseenter", function(){
  if (dodges >= 5) {
    return;
  }
  dodges++;
  var area = button47.parentElement;
  var maxX = (area.clientWidth - button47.offsetWidth) / 2;
  var maxY = (area.clientHeight - button47.offsetHeight) / 2;
  var x = (Math.random() * 2 - 1) * maxX;
  var y = (Math.random() * 2 - 1) * maxY;
  button47.style.transform = "translate(" + x + "px, " + y + "px)";
  if (dodges === 5) {
    button47.textContent = "ok, fine";
  }
});

button47.addEventListener("click", function(){
  button47.textContent = "caught! \u{1F389}";
  setTimeout(function(){
    dodges = 0;
    button47.style.transform = "";
    button47.textContent = "Catch me";
  }, 1500);
});