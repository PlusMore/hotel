Template.ChartsC3Combination.rendered = function () {

  var combinationChart = c3.generate({
       bindto: '#combination-chart',
      data: {
          columns: [
              ['data1', 30, 20, 50, 40, 60, 50],
              ['data2', 200, 130, 90, 240, 130, 220],
              ['data3', 300, 200, 160, 400, 250, 250],
              ['data4', 200, 130, 90, 240, 130, 220],
              ['data5', 130, 120, 150, 140, 160, 150],
              ['data6', 90, 70, 20, 50, 60, 120],
          ],
          type: 'bar',
          types: {
              data3: 'spline',
              data4: 'line',
              data6: 'area',
          },
          groups: [
              ['data1','data2']
          ],
          colors: {
            data1: App.colors.primary,
            data2: App.colors.info,
            data3: App.colors.success,
            data4: App.colors.warning,
            data6: App.colors.danger
          }
      },
      axis: {
          x: {
              type: 'categorized'
          }
      }
  });

};