var getBarChartData = function() {
    var barChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            fillColor: "rgba(39, 182, 175, .5)",
            strokeColor: App.colors.primaryDark,
            highlightFill: App.colors.primary,
            highlightStroke: App.colors.primaryDark,
            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
        }, {
            label: 'CPU Load',
            fillColor: "rgba(129, 207, 224, .5)",
            strokeColor: App.colors.infoDark,
            highlightFill: App.colors.info,
            highlightStroke: App.colors.infoDark,
            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
        }]
    };   

    return barChartData;
}

var initCharts = function() {
    var barChartData = getBarChartData();

    var ctx2 = document.getElementById("bar").getContext("2d");
    window.myBar = new Chart(ctx2).Bar(barChartData, {
        responsive: true
    });
}

Template.ChartJSBarChart.rendered = function () {
    initCharts();
};