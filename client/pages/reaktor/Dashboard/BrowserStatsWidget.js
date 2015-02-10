var getDoughnutData = function() {
    var doughnutData = [{
            value: 300,
            color: App.colors.primary,
            highlight: App.colors.primaryDark,
            label: "Chrome"
        }, {
            value: 50,
            color: App.colors.danger,
            highlight: App.colors.dangerDark,
            label: "IE"
        }, {
            value: 100,
            color: App.colors.info,
            highlight: App.colors.infoDark,
            label: "Safari"
        }, {
            value: 40,
            color: App.colors.success,
            highlight: App.colors.successDark,
            label: "Other"
        }, {
            value: 120,
            color: App.colors.warning,
            highlight: App.colors.warningDark,
            label: "Firefox"
        }
    ]; 

    return doughnutData;
}

var initCharts = function() {
    var doughnutData = getDoughnutData();

    var ctx3 = document.getElementById("doughnut-chart-area").getContext("2d");
    window.myDoughnut = new Chart(ctx3).Doughnut(doughnutData, {
        responsive: true
    });
}

Template.BrowserStatsWidget.rendered = function () {
    initCharts();
};