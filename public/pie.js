const xVal = []
const yVal = [30,50,1]
const barCol = ["blue","brown"]

new Chart("pieChart", {
    type: "pie",
    data: {
        labels:xVal,
        datasets:[{
            backgroundColor:barCol,
            data:yVal,
            label:"bar Chart",
            barThickness:40,
        }]
    },
    options: {
        title:{
            display:true,
            text: "Pie Chart",
            fontsize: 40,
        }
    }
})