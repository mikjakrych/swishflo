var swishflo_color;
var swishflo_timers;
//process color and gather swishflo_buttons
function initializeSwishflo(r, g, b){
  //get swishflo color
  if(r != null && g != null && b != null){
    swishflo_color = {r:r, g:g, b:b};
  } else{
    swishflo_color = {r:215, g:215, b:215};
  }
  //get swishflo buttons
  var swishflo_buttons = document.querySelectorAll(".swishflo");
  for (var i = 0; i < swishflo_buttons.length; i++) {
    //prevent events on click
    swishflo_buttons[i].addEventListener("click", function(event){event.preventDefault()});
    //start swishflo on mousedown
    swishflo_buttons[i].addEventListener("mousedown", function(){startSwishflo(event, this)});
  }
  //create arrays for timers
  swishflo_timers = new Array;
}
initializeSwishflo();
//run through timers checking for the existence of a timer for this particular button
//if no timer exists return -1 else return the index in the array
function checkSwishfloTimer(button){
  var result = -1;
  for (var i = 0; i < swishflo_timers.length; i++) {
    if(swishflo_timers[i].button == button){
      result = i;
    }
  }
  return result;
}
//initialize swishflo effect
function startSwishflo(event, button){
  //prevent link from happening immediately so that we can watch the whole swishflo goodness :)
  event.preventDefault();
  //if timer exists, clear it; else make new timer
  if(checkSwishfloTimer(button) != -1){
    clearTimeout(swishflo_timers[checkSwishfloTimer(button)].timer);
  } else{
    swishflo_timers.push({
      button: button,
      timer: null
    });
  }
  swishFlo(event, button, 20);
}
//continue to progress swishflo
function swishFlo(event, button, size){
  //calculate swishflo "epicenter"
  var x = event.clientX - button.getBoundingClientRect().left;
  var y = event.clientY - button.getBoundingClientRect().top;
  //create swishflo sentence
  var gradient = "radial-gradient(" +
  size + "px at " + x + "px " + y + "px, rgba(" +
  swishflo_color.r + "," + swishflo_color.g + "," + swishflo_color.b + "," +
  (1 - size/300) + ") 45%, rgba(0,0,0,0) 50%)";
  //do it!
  button.style.backgroundImage = gradient;
  //check whether we have swishflo-ed long enough
  if (size < 300){
    //swishflo again
    swishflo_timers[checkSwishfloTimer(button)].timer = setTimeout(swishFlo, 10, event, button, size + 8);
  } else{
    //now do whatever the link was supposed to do
    if(button.href && event.button == 0){
      window.location.assign(button.href);
    }
    //take out the faded-out swishflo completely
    button.style.backgroundImage = "";
  }
}
