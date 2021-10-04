import React from 'react'
import {Table} from 'antd';
import "antd/dist/antd.css";
import {
  CaretUpOutlined,
  CaretDownOutlined
} from '@ant-design/icons';

function Grid(props) {

  let {data} = props;
  data = data || [];
  data.forEach(record => {
    if (record.open < record.close) {
      record.up = true;
    }
  });
  let columns = [
    {
      title: 'Date',
      dataIndex: 'timestamp',
      key: 'timestamp'
    },
    {
      title: 'Open',
      dataIndex: 'open',
      key: 'open',
      align: 'right',
    },
    {
      title: 'Close',
      dataIndex: 'close',
      key: 'close',
      align: 'right',
      render: (text, record) => {
        return <>
          <span key={record.timestamp}>{text}</span>
          {record.up ? <CaretUpOutlined style={{color: '#ec0000'}}/> :
            <CaretDownOutlined style={{color: '#008F28'}}/>}
        </>
      }
    },
    {
      title: 'Low',
      dataIndex: 'low',
      key: 'low',
      align: 'right',
    },
    {
      title: 'High',
      dataIndex: 'high',
      key: 'high',
      align: 'right',
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      key: 'volume',
      align: 'right',
    }
  ];

  return (
    <div {...props}>
      <Table columns={columns}
             dataSource={data} size="small"
             pagination={{pageSize: 8}}/>
    </div>
  );
}

export default Grid;
