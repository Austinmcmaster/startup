async function signup() {
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const email = document.querySelector("#email");

    let userObject = {
        username : username.value,
        password : password.value,
        email : email.value
    }

    const response = await fetch('/api/auth/create', {
        method: 'POST',
        body: JSON.stringify(userObject),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',} 
    
    });
    if(response.ok){
        const user = await response.json();
        var object = {
            username: user.username,
            id: user.id,
        }
        localStorage.setItem('userObject', JSON.stringify(object));
        window.location.href = 'home.html';
    }
}

const registration_form = document.getElementById("register_form");
registration_form.addEventListener("submit", checkValidity);

function checkValidity(event){
    if(registration_form.checkValidity()){
        event.preventDefault();
        signup();
    }
}
