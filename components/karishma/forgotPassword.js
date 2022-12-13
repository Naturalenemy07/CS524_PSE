//Forgot password
const forgotPasswordForm = document.getElementById("forgotPassword-form");
const forgotPasswordButton = document.getElementById("forgotPassword-form-submit");

forgotPasswordButton.addEventListener("click", (e) => {
    e.preventDefault();   

    const username = forgotPasswordForm.username.value;
    const email = forgotPasswordForm.email.value;

    changePassword(username,email);
})

//function to reset password if forgottn
function changePassword(inpUsername, inpEmail) {
    
    if (inpUsername == localStorage.getItem("username")) {

        if (inpEmail == localStorage.getItem("email")) {
            alert("Password is: "+ localStorage.password);
            window.location = "./test.html";  
            return true;
        }
        else{
            alert("email is incorrect")
            return false;
        }
    }
    else{
        alert("User name is incorrect")
        return false;
    }
}