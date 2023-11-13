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
        const apiUrl = '/api/user';
        const parameters = {
        email: email.value,
        password: password.value,
        };
        // Convert parameters to a query string
        const queryString = Object.keys(parameters)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`)
        .join('&');
        const urlWithQueryString = `${apiUrl}?${queryString}`;
        const response = await fetch(urlWithQueryString);
        const user = await response.json();
        if(user.username != null && user.UserID != null){
            localStorage.setItem('userObject', JSON.stringify(user));
            window.location.href = "index.html";
        }
        else {
            console.log("Unknown Login Credentials");
        }



    }catch {
        console.log("Server Error in fetching User Data");
    }
}
