<!DOCTYPE html>
<html>
    <head>
        <title>JavaScript</title>
    </head>
    <body>
        <script type="text/javascript" src="astronautData.js"></script><br><br>
    </body>
    <form action="/new_user.php">
        <label for="username field">Username:</label><br>
        <input type="text" id="username field"><br>
        <label for="password field">Password:</label><br>
        <input type="text" id="password field"><br>
        <label for="email field">Email:</label><br>
        <input type="text" id="email field"><br><br>
        <input type="submit" value="Submit" onclick="createNewUser(document.getElementById('username field').value,document.getElementById('password field').value,document.getElementById('email field').value)">
        <input type="submit" value="Forgot Password" onclick="changePassword(document.getElementById('username field').value, document.getElementById('email field').value)">
    </form>
</html>
