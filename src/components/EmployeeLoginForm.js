import classes from "./LoginForm.module.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../utils/signin";

const apiUrl = "http://192.168.187.86:8080/api/v1/worker/login";

const EmployeeLoginForm = () => {
  const [code, setCode] = useState();

  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginHandleSubmit = async (e) => {
    e.preventDefault();

    const formData = { email: loginEmail, password: loginPassword };

    try {
      const userData = await signin(apiUrl, formData);
      setCode(userData.code);
      localStorage.setItem("userToken", userData.token);
      console.log("User:", userData);
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setLoginEmail("");
      setLoginPassword("");
      setCode(null);
      navigate("/a");
    }
    if (code) {
      setLoginEmail("");
      setLoginPassword("");
      setCode(null);
      navigate("/a");
    }
    if (code === false) {
      alert("Please Enter Valid Inputs!");
    }
  }, [code]);

  return (
    <div className={classes.allForm}>
      <div className={classes.container}>
        <div className={classes.formInfo}>
          <div>
            <h3>Handle Your Duties</h3>
            <h1>Sign in</h1>
          </div>
        </div>
        <form className={classes.form} onSubmit={loginHandleSubmit}>
          <p className={classes.leftAlign}>Enter your email address</p>
          <input
            type="text"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <p className={classes.leftAlign}>Enter your Password</p>
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <p className={classes.rightAlign}>
            <Link style={{ color: "#1D5D9B" }} to="/Contact">
              Forgot Password
            </Link>
          </p>
          <button
            className={classes.loginBtn}
            disabled={!loginEmail || !loginPassword}
            type="submit"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};
export default EmployeeLoginForm;
