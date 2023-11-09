async function loadLeaderboard(){
    let times = []
    try {
        const response = await fetch('api/times');
        times = await response.json();
        localStorage.setItem('leaderboard', JSON.stringify(times));
        

    }catch {
        const timesText = localStorage.getItem('leaderboard');
        if(timesText){
            times = JSON.parse(timesText)
        }
    }
    setLeaderboardView(times);
}

async function loadtable(){
    let entries = [];
    try {
        const response = await fetch('api/table');
        entries = await response.json();
        localStorage.setItem('table', JSON.stringify(entries));
        
    }catch {
        const entryCache = localStorage.getItem('table');
        if(entryCache){
            entries = JSON.parse(entryCache);
        }
    }
    loadTableData(entries);
}

async function fillTable(){
    const subject = document.querySelector("#Subject");
    const getSeconds = s => s.split(":").reduce((acc, curr) => acc * 60 + +curr, 0)
    var end = getSeconds(document.getElementById("Time_out").value);
    var start = getSeconds(document.getElementById("Time_in").value);

    var res = Math.abs(end - start);
    var hours = Math.round(res / 60);


    const description = document.querySelector("#descriptionbox");

    let tableObject = {
        Subject : subject.value,
        Description: description.value,
        Time: hours,
        UserID: 3, // Add in ID connected to objects
        entryID: crypto.randomUUID(),
    };

    fetch('api/table', {
    method: 'POST',
    body: JSON.stringify(tableObject),
    headers: {
    'Content-type': 'application/json; charset=UTF-8',},
    })
    .then((response) => response.json())
    .then((jsonResponse) => {
    console.log(jsonResponse);
    });
}


function displayQuote(data){
    try{
    fetch('https://catfact.ninja/fact')
    .then((response) => response.json())
    .then((data) => {
        const textarea = document.getElementById("webchat");
        textarea.value += "Cat Quote:\n"
        textarea.value += data.fact
        textarea.value += '\n\n'
    })
    }catch{
        console.log("Unable to Load Cat Quote/ Fetch Data");
    }

}


class TimeAnalytic {

    constructor(){
    const username = document.querySelector('.username_a');
    username.textContent= this.getUserName();
    loadUsers();
    }
    getUserName() {
        const userObject = localStorage.getItem('userObject');
        var data = JSON.parse(userObject);
        if(userObject == null){
            return "Unknown User"
        }
        else{
            return data.username;
        }
        
    }
}

const timeAnalytic = new TimeAnalytic();

const time_form = document.getElementById("time_form");
time_form.addEventListener("submit", checkValidity);

function checkValidity(event){
    if(time_form.checkValidity()){
        fillTable();
    }
}




function loadTableData(data) {
    var table = document.getElementById('DataTable');
    for(i = 0; i < data.length; i++){
        var row = table.insertRow(i+1);
        var cell_1 = row.insertCell(0);
        var cell_2 = row.insertCell(1);
        var cell_3 = row.insertCell(2);
        cell_1.innerHTML = data[i].Subject;
        cell_2.innerHTML = data[i].Description;
        cell_3.innerHTML = data[i].Time;
    } 
}

const textarea = document.getElementById("webchat");
const web_button = document.getElementById("web_button");
const web_input = document.getElementById("web_message");

function loadUsers(){
    const textarea = document.getElementById("webchat");
    textarea.value = "";
    displayQuote();

    setTimeout(() => {
        textarea.value += "Chris: Connected\n";
    }, 2000);

    setTimeout(() => {
        textarea.value += "User1: Connected\n";
    }, 2000);

    setTimeout(() => {
        textarea.value += "Dummy1: Connected\n";
    }, 100000);
}


web_button.addEventListener('click', function handleClick(){

    if(web_input.checkValidity()){
        user = localStorage.getItem('username') ?? "Unknown User"
        usuer = user.trim();
        textarea.value += user;
        textarea.value += ": " + web_input.value;
        textarea.value += "\n";
        web_input.value = "";

    }

});


function setLeaderboardView(times){
    const leaderboard = document.getElementById("leaderboard");

    for(const [i, time] of times.entries()){
        var row = leaderboard.insertRow(i+1);
        var cell_1 = row.insertCell(0);
        var cell_2 = row.insertCell(1);
        var cell_3 = row.insertCell(2);
        cell_1.innerHTML = i+1
        cell_2.innerHTML = time.user;
        cell_3.innerHTML = time.time;
    }
}

loadLeaderboard();
loadtable();




