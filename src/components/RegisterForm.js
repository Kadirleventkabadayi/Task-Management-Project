import { useEffect, useState } from "react";
import classes from "./RegisterForm.module.css";
import { register } from "../utils/register";

const apiUrl = "http://192.168.187.86:8080/api/v1/admin/worker";

const RegisterForm = () => {
  const [code, setCode] = useState();

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const registerHandleSubmit = async (e) => {
    e.preventDefault();

    const formData = { email: registerEmail, password: registerPassword };

    try {
      const newUserData = await register(
        apiUrl,
        formData,
        localStorage.getItem("adminToken")
      );
      setCode(newUserData.code);
      console.log("User:", newUserData);
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  useEffect(() => {
    if (code) {
      setRegisterEmail("");
      setRegisterPassword("");
      alert("worker added");
      setCode(null);
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
            <h3>LabX Studio</h3>
            <h1>Register Employee</h1>
          </div>
        </div>
        <form className={classes.form} onSubmit={registerHandleSubmit}>
          <p className={classes.leftAlign}>Enter your email address</p>
          <input
            required
            type="text"
            placeholder="Email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
          <p className={classes.leftAlign}>Enter your Password</p>
          <input
            required
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />

          <button
            className={classes.loginBtn}
            disabled={!registerEmail || !registerPassword}
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
export default RegisterForm;
