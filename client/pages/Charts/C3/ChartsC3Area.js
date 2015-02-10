Template.ChartsC3Area.rendered = function () {

  var areaChart = c3.generate({
      bindto: '#area-chart',
      data: {
          columns: [
              ['data1', 300, 350, 300, 0, 0, 0],
              ['data2', 130, 100, 140, 200, 150, 50]
          ],
          types: {
              data1: 'area',
              data2: 'area-spline'
          },
          colors: {
            data1: App.colors.primary,
            data2: App.colors.warning
          }
      }
  });

};