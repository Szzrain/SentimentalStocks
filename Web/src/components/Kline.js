import React from 'react'
import * as echarts from 'echarts';
import * as uuid from "uuid";

function clone(obj) {
  return JSON.parse(JSON.stringify(obj || []));
}

function Kline(props) {
  let id = uuid.v4();
  let {data} = props;
  let option;

  let upColor = '#ec0000';
  let upBorderColor = '#8A0000';
  let downColor = '#00da3c';
  let downBorderColor = '#008F28';

// 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
  let data0 = splitData(clone(data));

  function splitData(rawData) {
    let categoryData = [];
    let values = []
    for (let i = 0; i < rawData.length; i++) {
      categoryData.push(rawData[i].splice(0, 1)[0]);
      values.push(rawData[i])
    }
    return {
      categoryData: categoryData,
      values: values
    };
  }

  function calculateMA(dayCount) {
    let result = [];
    for (let i = 0, len = data0.values.length; i < len; i++) {
      if (i < dayCount) {
        result.push('-');
        continue;
      }
      let sum = 0;
      for (let j = 0; j < dayCount; j++) {
        sum += data0.values[i - j][1];
      }
      result.push(sum / dayCount);
    }
    return result;
  }

  option = {
    title: {
      text: 'Share Price',
      left: 0
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Daily', 'MA5', 'MA10', 'MA20', 'MA30']
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%'
    },
    xAxis: {
      type: 'category',
      data: data0.categoryData,
      scale: true,
      boundaryGap: false,
      axisLine: {onZero: false},
      splitLine: {show: false},
      splitNumber: 20,
      min: 'dataMin',
      max: 'dataMax'
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true
      }
    },
    dataZoom: [
      {
        type: 'inside',
        start: 40,
        end: 100
      },
      {
        show: true,
        type: 'slider',
        top: '90%',
        start: 40,
        end: 100
      }
    ],
    series: [
      {
        name: 'Daily',
        type: 'candlestick',
        data: data0.values,
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: upBorderColor,
          borderColor0: downBorderColor
        },
        markPoint: {
          label: {
            normal: {
              formatter: function (param) {
                return param != null ? Math.round(param.value) : '';
              }
            }
          },
          data: [
            {
              name: 'XX标点',
              coord: ['2021/01/01', 2300],
              value: 2300,
              itemStyle: {
                color: 'rgb(41,60,85)'
              }
            },
            {
              name: 'highest value',
              type: 'max',
              valueDim: 'highest'
            },
            {
              name: 'lowest value',
              type: 'min',
              valueDim: 'lowest'
            },
            {
              name: 'average value on close',
              type: 'average',
              valueDim: 'close'
            }
          ],
          tooltip: {
            formatter: function (param) {
              return param.name + '<br>' + (param.data.coord || '');
            }
          }
        },
        markLine: {
          symbol: ['none', 'none'],
          data: [
            [
              {
                name: 'from lowest to highest',
                type: 'min',
                valueDim: 'lowest',
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  show: false
                },
                emphasis: {
                  label: {
                    show: false
                  }
                }
              },
              {
                type: 'max',
                valueDim: 'highest',
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  show: false
                },
                emphasis: {
                  label: {
                    show: false
                  }
                }
              }
            ],
            {
              name: 'min line on close',
              type: 'min',
              valueDim: 'close'
            },
            {
              name: 'max line on close',
              type: 'max',
              valueDim: 'close'
            }
          ]
        }
      },
      {
        name: 'MA5',
        type: 'line',
        data: calculateMA(5),
        smooth: true,
        lineStyle: {
          opacity: 0.5
        }
      },
      {
        name: 'MA10',
        type: 'line',
        data: calculateMA(10),
        smooth: true,
        lineStyle: {
          opacity: 0.5
        }
      },
      {
        name: 'MA20',
        type: 'line',
        data: calculateMA(20),
        smooth: true,
        lineStyle: {
          opacity: 0.5
        }
      },
      {
        name: 'MA30',
        type: 'line',
        data: calculateMA(30),
        smooth: true,
        lineStyle: {
          opacity: 0.5
        }
      },

    ]
  };
  React.useEffect(() => {
    let myChart = echarts.init(document.getElementById(id));
    myChart.setOption(option);
  });
  return (
    <div id={id} {...props}>
    </div>
  );
}

export default Kline;
