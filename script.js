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