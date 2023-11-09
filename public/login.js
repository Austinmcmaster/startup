const login_form = document.getElementById("login-form");
login_form.addEventListener("submit",checkValidity);

function checkValidity(event){
    if(login_form.checkValidity()){
        event.preventDefault();
        login();
    }
    
}

async function login(){
    
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    
    try{
        const response = await fetch('api/user');
        var users = await response.json();
        for(i = 0; i < users.length; i ++){
            var data = users[i];
            if((email.value.toUpperCase() === data.email) & 
            (password.value.toUpperCase() === data.password)){
                localStorage.setItem('userObject', JSON.stringify(data));
                window.location.href = "index.html";
                break;
            }
        }
        console.log("Unknown Email or Password");

    }catch {
        console.log("Server Error in fetching User Data");
    }
}
