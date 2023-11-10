async function makePie(){
    let data = [];
    let dataset = []
    try {
        const response = await fetch('api/table');
        dataset = await response.json();
        
    }catch {
        const entryCache = localStorage.getItem('table');
        if(entryCache){
            dataset = JSON.parse(entryCache);
        }
    }
    const userObject = localStorage.getItem("userObject");
    const user = JSON.parse(userObject);
    for(var i = 0; i < dataset.length; i++){
        if(user.UserID == dataset[i].UserID){
            data.push(dataset[i]);
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

makePie();
