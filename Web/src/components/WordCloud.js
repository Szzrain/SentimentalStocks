import React from 'react'
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import * as uuid from "uuid";

function WordCloud(props) {
  let id = uuid.v4();
  let {data} = props;
  let option = {
    title: {
      text: 'Hot Words',
      left: 'center'
    },
    tooltip: {},
    series: [{
      type: 'wordCloud',
      gridSize: 2,
      sizeRange: [12, 50],
      rotationRange: [-90, 90],
      shape: 'pentagon',
      width: '100%',
      height: '90%',
      textStyle: {
        normal: {
          color: function () {
            return 'rgb(' + [
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160)
            ].join(',') + ')';
          }
        },
        emphasis: {
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      data: data || [{name: 'Loading...', value: 1}]
    }]
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

export default WordCloud;
