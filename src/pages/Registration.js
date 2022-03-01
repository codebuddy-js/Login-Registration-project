
import useValidate from "../components/Hooks/use-validate";
import Button from "../components/UI/Button/Button";
import Card from "../components/UI/Card/Card";
import Input from "../components/UI/Input/Input";
import classes from "./Registration.module.css";

const Registration = (props) => {
  const {
    value: enteredName,
    isValid: nameIsValid,
    inputChangeHandler: nameChangeHandler,
    validateInputHandler: validateNameHandler,
    resetInputHandler: resetName,
  } = useValidate((value) => value.trim() !== "");

  const {
    value: enteredMob,
    isValid: mobIsValid,
    inputChangeHandler: mobChangeHandler,
    validateInputHandler: validateMobHandler,
    resetInputHandler: resetMob,
  } = useValidate((value) => value.length === 10);

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

  const submitHandler = (event) => {
      event.preventDefault();
      props.onAdd({
          name: enteredName,
          mobile: enteredMob,
          email: enteredEmail,
          password: enteredPassword,
      })
    resetName();
    resetMob();
    resetEmail();
    resetPassword();
  };

  return (
    <section>
      <h1>The Registration Page</h1>
          <Card className={classes.registration}>
              {props.error && <p className={classes.error}>{props.error}</p>}
              {props.error && <button className={classes.btn} onClick={props.onHide}>Okay</button>}
        {!props.error && <form onSubmit={submitHandler}>
          <Input
            isValid={nameIsValid}
            label="Name"
            type="text"
            id="username"
            value={enteredName}
            onChange={nameChangeHandler}
            onBlur={validateNameHandler}
          />
          <Input
            isValid={mobIsValid}
            label="Mobile No."
            type="number"
            id="mobile_no."
            value={enteredMob}
            onChange={mobChangeHandler}
            onBlur={validateMobHandler}
          />
          <Input
            isValid={emailIsValid}
            label="Email"
            type="email"
            id="e-mail"
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
                  
          <Button type="submit" >Sign Up</Button>
        </form>}
      </Card>
    </section>
  );
};

export default Registration;
