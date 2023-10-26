const login_form = document.getElementById("login-form");
login_form.addEventListener("submit",checkValidity);

function checkValidity(event){
    if(login_form.checkValidity()){
        event.preventDefault();
        login();

    }
    
}

function login(){
    // Eventually we will authenticate the email and password which
    // then will return the username that we can store in local storage along with that users data.
    
    const email = document.getElementById("email");
    const password = document.getElementById("password");


    let userObject = {
        Email: email.value,
        Password: password.value, 
    };
    localStorage.setItem('USER', JSON.stringify(userObject));
    console.log(JSON.parse(localStorage.getItem('USER')));
    window.location.href = "index.html";
}
