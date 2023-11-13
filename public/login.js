const login_form = document.getElementById("login-form");
login_form.addEventListener("submit",checkValidity);

function checkValidity(event){
    if(login_form.checkValidity()){
        event.preventDefault();
        login();
    }
    
}

async function login(){   
    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;
    const response = await fetch('/auth/login', {
        method: 'post',
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    });
    if(response.ok){
        window.localStorage.href = 'index.html';
    }
}
