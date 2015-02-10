var getLineChartData = function() {
    var lineChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: 'Network Usage',
            fillColor: "rgba(39, 182, 175, .5)",
            strokeColor: App.colors.primaryDark,
            pointColor: App.colors.primary,
            pointStrokeColor: App.colors.primaryDark,
            pointHighlightFill: App.colors.primary,
            pointHighlightStroke: App.colors.primary,
            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
        }, {
            label: 'CPU Load',
            fillColor: "rgba(129, 207, 224, .5)",
            strokeColor: App.colors.infoDark,
            pointColor: App.colors.info,
            pointStrokeColor: App.colors.infoDark,
            pointHighlightFill: App.colors.info,
            pointHighlightStroke: App.colors.info,
            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
        }]
    };
    return lineChartData;
}

var initCharts = function() {
    var lineChartData = getLineChartData();
    
    var ctx1 = document.getElementById("line").getContext("2d");
    window.myLine = new Chart(ctx1).Line(lineChartData, {
        responsive: true
    });
}

Template.ChartJSLineChart.rendered = function () {
    initCharts();
};