async function signup() {
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const email = document.querySelector("#email");

    let userObject = {
        username : username.value,
        password : password.value,
        email : email.value,
        UserID: crypto.randomUUID(),
    }

    fetch('api/user', {
        method: 'POST',
        body: JSON.stringify(userObject),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',},
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
        console.log(jsonResponse);
    });

    localStorage.setItem("userObject", JSON.stringify(userObject));
    window.location.href = "index.html";
}

const registration_form = document.getElementById("register_form");
registration_form.addEventListener("submit", checkValidity);

function checkValidity(event){
    if(registration_form.checkValidity()){
        event.preventDefault();
        signup();
    }
}
