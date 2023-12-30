import { useEffect, useState } from "react";
import DutyList from "../components/DutyList";
import { getDuty } from "../utils/getDuty";

const DutyPage = () => {
  const [tasks, setTasks] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const apiUrl = "http://192.168.187.86:8080/api/v1/worker/task?token=";

        const tasks = await getDuty(apiUrl, token);
        const newReports = tasks.reports;
        setTasks(newReports);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div style={{ position: "absolute" }}>
        <DutyList tasks={tasks}></DutyList>
      </div>
    </>
  );
};

export default DutyPage;
