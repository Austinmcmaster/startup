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

class TimeAnalytic {

    constructor(){
    const username = document.getElementById("user_name");
    username.textContent= this.getUserName();
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


function clearTable(){
    fetch('api/delete', {
        method: 'POST',
        headers: {
        'Content-type': 'application/json; charset=UTF-8',},
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
        console.log(jsonResponse);
        });

    location.reload();
    
}

loadtable();