import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import { Layout } from "antd";

const LandingPage = React.lazy(() => import("./views/LandingPage/LandingPage"));
const LoginPage = React.lazy(() => import("./views/LoginPage/LoginPage"));
const RegisterPage = React.lazy(() => import("./views/RegisterPage/RegisterPage"));
const NavBar = React.lazy(() => import("./views/NavBar/NavBar"));
const QuizPage = React.lazy(() => import("./views/QuizPage/QuizPage"));
const LogPage = React.lazy(() => import("./views/LogPage/LogPage"));

const { Footer } = Layout;

function App() {
  return (
    <Suspense
      fallback={
        <div style={{ marginTop: 400 }} className="text-center">
          <span
            className="spinner-border"
            style={{ width: 50, height: 50 }}
          ></span>
        </div>
      }
    >
      <NavBar />
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/register" component={Auth(RegisterPage, false)} />
        <Route exact path="/quiz" component={Auth(QuizPage, true)} />
        <Route exact path="/logs" component={Auth(LogPage, true, true)} />
      </Switch>
      <Footer>Quiz Test ©2022 Created by Milan</Footer>
    </Suspense>
  );
}

export default App;
