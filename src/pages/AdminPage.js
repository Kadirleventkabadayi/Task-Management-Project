import { useState, useEffect } from "react";
import DutyForm from "../components/DutyForm";
import AdminDutyList from "../components/AdminDutyList";
import RegisterForm from "../components/RegisterForm";
import classes from "./AdminPage.module.css";
import { getReports } from "../utils/getReports";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

const AdminPage = () => {
  const navigate = useNavigate();

  const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(false);
  const [tasks, setTasks] = useState();
  const toggleRegisterForm = () => {
    setIsRegisterFormVisible((prev) => !prev);
  };
  const handleLogout = () => {
    // Logout işlemi tamamlandığında sayfanın baştan yüklenmesini sağla
    navigate("/signin", { replace: true });
  };

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/signin");
      return;
    }
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const apiUrl = "http://localhost:8080/api/v1/admin/reports";
        const tasks = await getReports(apiUrl, token);
        const newReports = tasks.reports;
        setTasks(newReports);
      } catch (error) {
        console.error("Error fetching data:", error);
        localStorage.clear();
        navigate("/signin");
        alert("Please Login Again");
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
      <LogoutButton role="admin" onLogout={handleLogout} />
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
