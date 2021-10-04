import React from 'react'
import * as echarts from 'echarts';
import * as uuid from "uuid";

function format(data) {
  if (!data) {
    return [];
  }
  let r = [['emotion'],['Positive'],['Negative'],['Neutral']];
  let cols = ['timestamp', 'pos', 'neg', 'neu'];
  cols.forEach((col, i) => {
    Object.keys(data[col]).forEach(k => r[i].push(data[col][k]));
  });
  return r;
}

function PieLine(props) {
  let id = uuid.v4();
  let {data} = props;
  let option = {
    title: {
      text: 'Emotion Analysis',
      subtext: 'Source: https://www.reddit.com/r/wallstreetbets/',
      left: 'center'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    tooltip: {
      trigger: 'axis',
      showContent: true
    },
    dataset: {
      source: format(data)
    },
    xAxis: {type: 'category'},
    yAxis: {gridIndex: 0},
    grid: {top: '55%'},
    series: [
      {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
      {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
      {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
      {
        type: 'pie',
        id: 'pie',
        radius: '30%',
        center: ['50%', '30%'],
        emphasis: {focus: 'data'},
        label: {
          // formatter: '{b}: {@emotion} ({d}%)'
        },
        encode: {
          itemName: 'emotion',
          value: '2021-03-20',
          tooltip: '2021-03-20'
        }
      }
    ]
  };
  // let pie = React.useCallback(node => {
  //   if (node) {
  //     let myChart = echarts.init(node);
  //     myChart.setOption(option);
  //   }
  // });
  React.useEffect(() => {
    let myChart = echarts.init(document.getElementById(id));
    myChart.on('updateAxisPointer', function (event) {
      var xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        var dimension = xAxisInfo.value + 1;
        myChart.setOption({
          series: {
            id: 'pie',
            label: {
              formatter: '{b}: {@[' + dimension + ']} ({d}%)'
            },
            encode: {
              value: dimension,
              tooltip: dimension
            }
          }
        });
      }
    });
    myChart.setOption(option);
  });
  return (
    <div id={id} {...props}>
    </div>
  );
}

export default PieLine;
