import { useEffect, useState } from "react";
import DutyList from "../components/DutyList";
import { getDuty } from "../utils/getDuty";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

const DutyPage = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState();

  const handleLogout = () => {
    navigate("/esignin", { replace: true });
  };

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/esignin");
      return;
    }
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const apiUrl = "http://31.223.6.113:8080/api/v1/worker/task?token=";

        const tasks = await getDuty(apiUrl, token);
        const newReports = tasks.reports;
        setTasks(newReports);
      } catch (error) {
        console.error("Error fetching data:", error);
        localStorage.clear();
        navigate("/esignin");
        alert("Please Login Again");
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LogoutButton role="user" onLogout={handleLogout} />
        <DutyList tasks={tasks}></DutyList>
      </div>
    </>
  );
};

export default DutyPage;
