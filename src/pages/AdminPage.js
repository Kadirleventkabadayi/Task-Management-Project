import { useState, useEffect } from "react";
import DutyForm from "../components/DutyForm";
import AdminDutyList from "../components/AdminDutyList";
import RegisterForm from "../components/RegisterForm";
import classes from "./AdminPage.module.css";
import { getReports } from "../utils/getReports";

const AdminPage = () => {
  const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(false);
  const [tasks, setTasks] = useState();
  const toggleRegisterForm = () => {
    setIsRegisterFormVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const apiUrl = "http://192.168.187.86:8080/api/v1/admin/reports";

        const tasks = await getReports(apiUrl, token);
        const newReports = tasks.reports;
        setTasks(newReports);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column-reverse",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DutyForm></DutyForm>
      <AdminDutyList reports={tasks}></AdminDutyList>

      <div className={classes.btn}>
        <h2 style={{ cursor: "pointer" }} onClick={toggleRegisterForm}>
          Register Form
        </h2>

        {isRegisterFormVisible && <RegisterForm />}
      </div>
    </div>
  );
};

export default AdminPage;
