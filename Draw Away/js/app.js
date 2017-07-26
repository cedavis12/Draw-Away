
var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;

//When clicking on conrol list items
$(".controls").on("click", "li", function(){
  //Deselect sibling elements
  $(this).siblings().removeClass("selected");
  //Select clicked element
  $(this).addClass("selected");
  //cache current color
  color = $(this).css("background-color");
});

//When New Color is pressed
$("#revealColorSelect").click(function () {
  //toggle color selctor tool
  changeColor();
  $("#colorSelect").toggle();
});

//Update color span
function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color", "rgb(" + r + "," + g + ", " + b + ")");
}

//When color slider is changed ==>
$("input[type=range]").change(changeColor);

//When Add Color is pressed ==>
$("#addNewColor").click(function(){
  //append color to color list
  var $newColor = $("<li></li>");
  $newColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  //Select the new color
  $newColor.click();
});

//On mouse event on canvas ==> draw lines
$canvas.mousedown(function(e){
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e){
  //Draw!
  if (mouseDown) {
    context.beginPath();
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    context.lineTo(e.offsetX, e.offsetY);
    context.strokeStyle = color;
    context.stroke();
    lastEvent = e;
  }
}).mouseup(function(){
  mouseDown = false;
}).mouseleave(function() {
  $canvas.mouseup();
});
