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
    var lineChartData = getLineChartData();
    var barChartData = getBarChartData();

    var ctx1 = document.getElementById("canvas1").getContext("2d");
    window.myLine = new Chart(ctx1).Line(lineChartData, {
        responsive: true
    });

    var ctx2 = document.getElementById("canvas2").getContext("2d");
    window.myBar = new Chart(ctx2).Bar(barChartData, {
        responsive: true
    });
}

Template.ServerStatsWidget.rendered = function () {
    initCharts();
};