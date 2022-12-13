
// creates a user

class infoUser {
    //functions to create, aquire, modify user information
    //initialize class
    constructor(username, password, email, scores) {
        this.username = username; //string
        this.password = password; //should we encrypt this before storing on users device?
        this.email = email; //string
        this.scores = scores; //tuple [0,0,0], how will scores be represented?
    }

    //store information on local machine
    storeInfo() {
        localStorage.setItem("username",this.username);
        localStorage.setItem("password",this.password);
        localStorage.setItem("email",this.email);
        localStorage.setItem("scores", this.scores);
    }
}




//Create new User
function createNewUser(name, password, email) {

    const user = new infoUser(name,password,email,[0,0,0]);
    var validRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (email.match(validRegex)) {
        //Is User already exists
        if ((name == localStorage.getItem("username"))
             && (email == localStorage.getItem("email"))) {  
                alert("Hey "+name+", you have already registered!!" );
                return true;
        }
        else{
                user.storeInfo();
                sendEmail(email);                 
                alert("Hey "+name+", you have successfully registered!!" );
                return true;
            }  
    }
    else{
        alert("Invalid email ID. Please try again!!");
        return false;
        
    }
}

//Login validation
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();   

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    checkCredentials(username,password);
})

//returns true if credentials match, otherwise returns false
function checkCredentials(inpUsername,inpPassword) {

    if(inpUsername == localStorage.getItem("username")){
        if (inpUsername == localStorage.getItem("username")){
            if(inpPassword == localStorage.getItem("password")){
                alert("Hey "+inpUsername+", you have logged in successfully!!");
                window.location = "./test.html";            
                return true;
            }
            else{
                alert("Incorrect password. Please try again!!");
            }

        }            
    }else{
        alert("Hey "+inpUsername+", you might have entered User name incorrectly or might not have registered");
        return false;
    }
}

// function to update scores
function updateScore(scoreIndex, amountToAdd) {
    currentScores = localStorage.getItem("scores");
    updatedScores = currentScores[scoreIndex] + amountToAdd;
    localStorage.setItem("scores", updatedScores);
}