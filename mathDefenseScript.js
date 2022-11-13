function drawWelcomeScreen() {
    const c = document.getElementById("gamecanvas");
    const ws = c.getContext("2d");
    // const button = c.querySelector('gamecanvas');
    var cent =  c.getAttribute("width")/2;


    //draw welcome screen first
    ws.font = '30px serif'
    ws.textAlign = 'center'
    ws.fillText('Welcome to Math Defense!',cent,50)

    // //make button interactable
    // button.addEventListener('click', enterButton())

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

function enterButton() {
    ws.clearRect(0, 0, c.width, c.height)
}

drawWelcomeScreen()
