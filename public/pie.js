async function makePie(){
    let data = [];
    const userObject = localStorage.getItem("userObject");
    const user = JSON.parse(userObject);
    try {
        const response = await fetch(`api/table${user.UserID}`);
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
setInterval(function(){makePie()}, 15000);
makePie();
