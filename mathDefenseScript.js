//base skeleton of canvas
var c = document.getElementById("gamecanvas");
var ctx = c.getContext("2d"); // takes canvas and lets us draw, can be 3d

//drawing commands for areas
ctx.rect(0,00,400,450); //playable area
ctx.rect(0,450,250,150); //equation area
ctx.rect(250,450,150,150); // button area
ctx.stroke(); //draws the rectangle
