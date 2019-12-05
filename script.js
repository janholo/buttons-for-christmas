"use strict";

// restart animation on click
var element = document.getElementById("button6");
element.addEventListener("click", function(e){
  element.classList.remove("button6");
  void element.offsetWidth;
  element.classList.add("button6");
}, false);