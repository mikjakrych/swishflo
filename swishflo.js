//run through buttons adding event listeners
var swishflo_buttons = document.querySelectorAll(".swishflo");
for (var i = 0; i < swishflo_buttons.length; i++) {
  //prevent events on click
  swishflo_buttons[i].addEventListener("click", function(event){event.preventDefault()});
  //start swishflo on mousedown
  swishflo_buttons[i].addEventListener("mousedown", startSwishflo, event);
}
//create arrays for timers
var swishflo_timers = new Array;
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
function startSwishflo(event){
  //prevent link from happening immediately so that we can watch the whole swishflo goodness :)
  event.preventDefault();
  //if timer exists, clear it; else make new timer
  if(checkSwishfloTimer(event.target) != -1){
    clearTimeout(swishflo_timers[checkSwishfloTimer(event.target)].timer);
  } else{
    swishflo_timers.push({
      button: event.target,
      timer: null
    });
  }
  swishFlo(event, 20);
}
//continue to progress swishflo
function swishFlo(event, size){
  //calculate swishflo "epicenter"
  var x = event.clientX - event.target.offsetLeft + window.pageXOffset;
  var y = event.clientY - event.target.offsetTop + window.pageYOffset;
  //create swishflo sentence
  var gradient = "radial-gradient(" + size + "px at " + x + "px " + y + "px, rgba(225,225,225," + (1 - size/300) + ") 49.9%, rgba(0,0,0,0) 50%)";
  //do it!
  event.target.style.backgroundImage = gradient;
  //check whether we have swishflo-ed long enough
  if (size < 300){
    //swishflo again
    swishflo_timers[checkSwishfloTimer(event.target)].timer = setTimeout(swishFlo, 10, event, size + 8);
  } else{
    //now do whatever the link was supposed to do
    if(event.target.href){
      window.location.assign(event.target.href);
    }
    //take out the faded-out swishflo completely
    event.target.style.backgroundImage = "";
  }
}
