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

class TimeAnalytic {

    constructor(){
    const username = document.getElementById("user_name");
    username.textContent= this.getUserName();
    }


    getUserName() {
        const user = getUserData();
        localStorage.setItem('userObject',JSON.stringify(user));
        return user.username;
        
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


async function clearTable(){
    let user_info = getUserData();
    fetch(`api/table/${user_info.id}`, {
        method: 'DELETE'})
        .then((response) => response.json())
        .then((jsonResponse) => {
        console.log(jsonResponse);
        });

    location.reload();
    
}

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


function logout(){
    localStorage.removeItem('userObject');
    localStorage.removeItem('leaderboard');
    localStorage.removeItem('table');
    fetch(`/api/auth/logout`, {
      method: 'delete',
    }).then(() => (window.location.href = 'login.html'));
}