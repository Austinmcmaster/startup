const xVal = ["Value_1", "Value_2"]
const yVal = [50,36]
const barCol = ["blue","brown"]

new Chart("pieChart", {
    type: "bar",
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
            text: "Chart Title",
            fontsize: 40,
        }
    }
})