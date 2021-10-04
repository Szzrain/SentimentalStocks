import './App.css';
import PieLine from './components/PieLine'
import Kline from './components/Kline'
import WordCloud from './components/WordCloud'
import Grid from './components/Grid'
import React from "react";
import {Layout, Menu} from 'antd';

const {Header, Content, Footer} = Layout;
const stocks = ['AMD', 'GME', 'NOK', 'TSLA'];
const slogon = 'Sentimental Stocks';
const apiBase = 'https://wsbot.hahapy.com/api';
//
// function fetchData(api, share, callback) {
//   fetch(`${apiBase}/${api}/${share}`)
//     .then(response => response.json())
//     .then(data => callback(data));
// }

function App() {
  let [state, setState] = React.useState({});

  function updateGraph(share) {
    let urls = [
      `${apiBase}/sentiment/${share}/2021-03-01/2021-05-01`,
      `${apiBase}/stock/${share}/2021-01-01/2021-05-01`,
      `${apiBase}/wordcloud/${share}`,
      `${apiBase}/stockDetail/${share}/2021-03-01/2021-05-01`
    ];
    let promises = urls.map(url => fetch(url).then(response => response.json()));
    Promise.all(promises)
      .then(data => {
        setState({sentiment: data[0], stock: data[1], wordcloud: data[2], stockDetail: data[3]});
      });
  }

  React.useEffect(() => {
    updateGraph(stocks[0]);
  }, []);

  const menuClick = e => {
    let share = e.key;
    if (stocks.includes(share)) {
      updateGraph(share);
    }
  };

  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={stocks[0]} onClick={menuClick}>
          <Menu.Item className="intro" key={'home'}>{slogon}</Menu.Item>
          {stocks.map((name, index) => {
            return <Menu.Item key={name}>{name}</Menu.Item>;
          })}
        </Menu>
      </Header>
      <Content style={{padding: '0 20px'}}>
        <div className="App site-layout-content">
          <PieLine style={{width: '40%', height: 500}} className={'sub'} data={state?.sentiment}/>
          <Kline style={{width: '59%', height: 500}} className={'sub'} data={state?.stock}/>
          <WordCloud style={{width: '45%', height: 400}} className={'sub'} data={state?.wordcloud}/>
          <Grid style={{width: '54%', height: 400, paddingRight: '6%'}} className={'sub'} data={state?.stockDetail}/>
        </div>
      </Content>
      <Footer style={{textAlign: 'center'}}>
        {slogon} ©2021 Created by <a href={'https://github.com/szzrain'}
                                     rel="noreferrer"
                                     target={'_blank'}>SzzRain</a> and Altman
      </Footer>
    </Layout>

  );
}

export default App;
