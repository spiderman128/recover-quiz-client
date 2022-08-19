/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter, Link } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = (e) => {
    e.preventDefault();
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
        window.localStorage.setItem("userId", null);
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && user.userData.isAuth) {
    return (
      <Menu mode={props.mode} selectedKeys={[]}>
        <Menu.Item key="logout">
          <Link to="#" onClick={logoutHandler}>Sign Out</Link>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode} selectedKeys={[]}>
        <Menu.Item key="mail">
          <Link to="/login">Sign In</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">Sign Up</Link>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

