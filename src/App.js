import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate} from "react-router-dom";
import MainHeader from "./components/Layout/MainHeader";
import Login from "./pages/Login";
import LogInDetail from "./pages/LoginDetail";
import Registration from "./pages/Registration";

let show = false;

function App() {
  const [error, setError] = useState("");
  let navigate = useNavigate();


  const registrationHandler = async (userData) => {
    try {
      const response = await axios.post(
        " https://ttmg-backend.herokuapp.com/api/auth/staffRegister",
        JSON.stringify({
          email: userData.email,
          password: userData.password,
          name: userData.name,
          mobile: userData.mobile,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data)
      show = true;

    } catch (err) {
      if (err.response?.status === 400) {
        setError("Some of the fields are missing or incorrect");
      } else if (err.response?.status === 402) {
        setError("User Already Exists with the given email id");
      } else {
        setError("No server Response");
      }
    }
  };

  const logInHandler = async (authData) => {

    try {
      const response = await axios.post(
        "https://ttmg-backend.herokuapp.com/api/auth/staffLogin",
        JSON.stringify({
          email:  authData.email,
          password: authData.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data)
      show = true;
      navigate("/Logins/success");

    } catch (err) {
      if (err.response?.status === 400) {
        setError("Email/password is missing");
      } else if (err.response?.status === 401) {
        setError("Email or password is incorrect");
      } else {
        setError("No server Response");
      }
    }
  }
  
  
  const hideErrorHandler = () => {
    setError("");
  }

  return (
    <>
      {!error && !show && <MainHeader/>}
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/Registration" />} />
          <Route
            path="/Registration/"
            element={<Registration onAdd={registrationHandler}  error={error} onHide={hideErrorHandler}/>}
          />
          <Route path="/Logins/" element={<Login onLogIn={logInHandler}  error={error} onHide={hideErrorHandler} />} />
          <Route path="/Logins/success" element={<LogInDetail/>}/>
        </Routes>
      </main>
      
    </>
  );
}

export default App;
