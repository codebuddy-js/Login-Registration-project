import React from "react";
import Card from "../components/UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../components/UI/Button/Button";
import Input from "../components/UI/Input/Input";
import useValidate from "../components/Hooks/use-validate";

import { Routes, Route, Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    inputChangeHandler: emailChangeHandler,
    validateInputHandler: validateEmailHandler,
    resetInputHandler: resetEmail,
  } = useValidate((value) => value.trim().includes("@"));

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    inputChangeHandler: passwordChangeHandler,
    validateInputHandler: validatePasswordHandler,
    resetInputHandler: resetPassword,
  } = useValidate((value) => value.trim().length > 6);

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }


  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogIn({
      email: enteredEmail,
      password: enteredPassword,
    });

    resetEmail();
    resetPassword();
  };

  return (
    <Card className={classes.login}>
      {props.error && <p className={classes.error}>{props.error}</p>}
      {props.error && (
        <button className={classes.btn} onClick={props.onHide}>
          Okay
        </button>
      )}
      {!props.error && (
        <form onSubmit={submitHandler}>
          <Input
            isValid={emailIsValid}
            label="Email"
            type="email"
            id="username"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
          <Input
            isValid={passwordIsValid}
            label="Password"
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
          <div className={classes.actions}>
            <Button
              type="submit"
              className={classes.btn}
              disabled={!formIsValid}
            >
              Login
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
};

export default Login;
