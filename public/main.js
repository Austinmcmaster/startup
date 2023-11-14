// Entry Table
const time_form = document.getElementById("time_form");
time_form.addEventListener("submit", checkValidity);

function checkValidity(event){
    if(time_form.checkValidity()){
        fillTable();
    }
}

async function fillTable(){
    const subject = document.querySelector("#Subject");
    const getSeconds = s => s.split(":").reduce((acc, curr) => acc * 60 + +curr, 0)
    var end = getSeconds(document.getElementById("Time_out").value);
    var start = getSeconds(document.getElementById("Time_in").value);
    var res = Math.abs(end - start);
    var hours = Math.round(res / 60);


    const description = document.querySelector("#descriptionbox");

    const userObject = getUserData();

    let tableObject = {
        Subject : subject.value,
        Description: description.value,
        Time: hours,
        username: userObject.username,
        id: userObject.id,
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

    fetch('api/times', {
        method: 'POST',
        body: JSON.stringify(tableObject),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then((response) => response.json)
    .then((jsonResponse) => {
        console.log(jsonResponse);
    })
    await makePie();
}

async function loadtable(){
    let data = [];
    let user_info = await getUserData();
    try {
        const response = await fetch(`api/table/${user_info.id}`);
        data = await response.json();
        localStorage.setItem('table', JSON.stringify(data));
        
    }catch {
        const entryCache = localStorage.getItem('table');
        if(entryCache){
            data = JSON.parse(entryCache);
        }
    }
    loadTableData(data);
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



// Leaderboard
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

function setLeaderboardView(times){
    const leaderboard = document.getElementById("leaderboard");
    for (var i = 1; i < leaderboard.rows.length; i++) {
        leaderboard.deleteRow(i);
    }

    for(let i = 0; i < times.length; i++){
        var row = leaderboard.insertRow(i+1);
        var cell_1 = row.insertCell(0);
        var cell_2 = row.insertCell(1);
        var cell_3 = row.insertCell(2);
        cell_1.innerHTML = i+1
        cell_2.innerHTML = times[i].username
        cell_3.innerHTML = times[i].Time;
    }

}


// Cat Quote Fetch
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
    const username = document.getElementById("user_name");
    username.textContent= this.getUserName();
    loadUsers();
    }


    getUserName() {
        const user = getUserData();
        localStorage.setItem('userObject',JSON.stringify(user));
        return user.username;
        
    }
}

const timeAnalytic = new TimeAnalytic();




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
        user = getUserName();
        user = user.trim().toLowerCase();
        textarea.value += user;
        textarea.value += ": " + web_input.value;
        textarea.value += "\n";
        web_input.value = "";

    }

});

function getUserData(){
    const userObject = localStorage.getItem('userObject');
    var data = JSON.parse(userObject);
    if(userObject != null){
        return data;
    }

    return  {
        UserID: crypto.randomUUID(), 
        username: "Unknown User",
    };

}


loadtable();
loadLeaderboard();





async function makePie(){
    let data = [];
    const userObject = localStorage.getItem("userObject");
    const user = JSON.parse(userObject);
    try {
        const response = await fetch(`api/table${user.id}`);
        data = await response.json();
        
    }catch {
        const entryCache = localStorage.getItem('table');
        if(entryCache){
            data = JSON.parse(entryCache);
        }
    }

    let values = [];
    let labels = [];
    for(var i = 0; i < data.length; i++){
        var point = data[i];
        values.push(point.Time);
        labels.push(point.Subject);

    }

    const colors = ["purple","blue","red","green","black","orange","yellow","white","pink"]

    var chart = new Chart("pieChart", {
        type: "pie",
        data: {
            labels:values,
            datasets:[{
                backgroundColor:colors,
                data:values,
            }],
            labels:labels
        },
        options: {
            title:{
                display:true,
                text: "Pie Chart",
                fontSize: 25,
            }
        }
    })
}
setInterval(function(){makePie()}, 60000);
makePie();




