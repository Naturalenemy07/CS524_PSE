function drawWelcomeScreen() {
    const c = document.getElementById("gamecanvas");
    var cent =  c.getAttribute("width")/2;
    const ws = c.getContext("2d");  

    //draw welcome screen first
    ws.font = '30px serif'
    ws.textAlign = 'center'
    ws.fillText('Welcome to Math Defense!',cent,50)
}

function drawGameBackground() {
    var c = document.getElementById("gamecanvas");
    var gb = c.getContext("2d");

    //drawing commands for areas
    gb.rect(0,00,400,450); //playable area
    gb.rect(0,450,250,150); //equation area
    gb.rect(250,450,150,150); // button area
    gb.stroke(); //draws the rectangle
}

drawWelcomeScreen()
