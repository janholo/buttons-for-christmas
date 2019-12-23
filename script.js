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