/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../../../../_actions/user_actions';

function RightMenu(props) {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    props.history.push("/login");
  };

  if (user.userId) {
    return (
      <Menu mode={props.mode} selectedKeys={[]}>
        <Menu.Item key="logout">
          <Link to="#" onClick={logoutHandler}>Log Out</Link>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode} selectedKeys={[]}>
        <Menu.Item key="mail">
          <Link to="/login">Log In</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">Registrati</Link>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);