class TimeAnalytic {

    constructor(){
    const username = document.querySelector('.username_a');
    username.textContent= this.getUserName();
    loadTable();
    
    }


    getUserName() {
        return localStorage.getItem('username') ?? "Unknown User";
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


function fillTable(){
    const subject = document.querySelector("#Subject");
    const getSeconds = s => s.split(":").reduce((acc, curr) => acc * 60 + +curr, 0)
    var end = getSeconds(document.getElementById("Time_out").value);
    var start = getSeconds(document.getElementById("Time_in").value);

    var res = Math.abs(end - start);
    var hours = (res / 60);


    const description = document.querySelector("#descriptionbox");

    let tableObject = {
        Subject : subject.value,
        Description: description.value,
        Time: hours
    };

    if(localStorage.getItem('table') == null){
        let myArray = [];
        myArray.push(tableObject);
        localStorage.setItem('table', JSON.stringify(myArray));
        console.log(JSON.parse(localStorage.getItem('table')));
    }
    else {
        let array = JSON.parse(localStorage.getItem('table'));
        array.push(tableObject);
        localStorage.setItem('table', JSON.stringify(array));
        console.log(JSON.parse(localStorage.getItem('table')));
    }
}

function loadTable() {
    if(localStorage.getItem('table') != null){
        const data = JSON.parse(localStorage.getItem('table'));
        console.log(data);
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
}

