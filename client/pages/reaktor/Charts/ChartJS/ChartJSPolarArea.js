var getPolarAreaData = function() {
  var chartData = [{
      value: Math.random(),
      color: App.colors.primary
  }, {
      value: Math.random(),
      color: App.colors.success
  }, {
      value: Math.random(),
      color: App.colors.info
  }, {
      value: Math.random(),
      color: App.colors.danger
  }, {
      value: Math.random(),
      color: App.colors.warning
  }, {
      value: Math.random(),
      color: "#1ABC9C"
  }];

  return chartData;
};

var initCharts = function() {
    var polarAreaChartData = getPolarAreaData();
    
    var ctx4 = document.getElementById("polarArea").getContext("2d");
    window.myPolarArea = new Chart(ctx4).PolarArea(polarAreaChartData, {
        responsive: true
    });
}

Template.ChartJSPolarArea.rendered = function () {
    initCharts();
};