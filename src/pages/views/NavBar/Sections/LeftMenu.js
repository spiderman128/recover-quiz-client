import React from "react";
import { Menu } from "antd";
import { Link } from 'react-router-dom';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode} selectedKeys={[]}>
      <Menu.Item key="home">
        <a href="https://www.geniusrei.com/">Torna al sito principale </a>
      </Menu.Item>
      <Menu.Item key="test">
        <Link to="/quiz">Fai il test</Link>
      </Menu.Item>
      {/* <Menu.Item key="logs">
        <Link to="/logs">Logs</Link>
      </Menu.Item> */}
    </Menu>
  );
}

export default LeftMenu;