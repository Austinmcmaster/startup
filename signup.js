function signup() {
    const username = document.querySelector("#username");
    localStorage.setItem("username", username.value);
    window.location.href = "index.html";
}

const registration_form = document.getElementById("register_form");
registration_form.addEventListener("submit", checkValidity)

function checkValidity(event){
    if(registration_form.checkValidity()){
        event.preventDefault();
        signup();
    }
}
