import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Table, Tag } from 'antd';
import { getLogs } from "../../../_actions/quiz_actions";

const columns = [
  {
    title: "No",
    dataIndex: "key",
    key: "no",
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'age',
  },
  {
    title: 'Score',
    key: 'score',
    dataIndex: 'score',
    render: (score) => {
      let color = score > 50 ? 'green' : 'volcano';
      return (
        <Tag color={color}>
          {score.toFixed(2)}
        </Tag>
      );
    },
  }
];

function LogPage(props) {
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.quiz.logs);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getLogs());
  }, []);

  useEffect(() => {
    let count = 1;
    setData(logs.length > 0 && logs.map((item) => ({
      key: count++,
      name: item.user.name + " " + item.user.lastname,
      email: item.user.email,
      date: new Date(item.date).toLocaleString(),
      score: item.mark,
    })))
   }, [logs])

  return (
    <section className="container py-5">
      <Card title="Logs">
        <div className="app">
          <Table columns={columns} dataSource={data} bordered style={{width: '100%'}}/>
        </div>
      </Card>
    </section>
  );
}

export default LogPage;