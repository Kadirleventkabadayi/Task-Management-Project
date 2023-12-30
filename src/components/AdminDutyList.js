import { useState, useEffect } from "react";
import AdminDuty from "./AdminDuty";
import classes from "./DutyList.module.css";

const AdminDutyList = ({ reports }) => {
  const [dutiesToRender, setDutiesToRender] = useState([]);

  useEffect(() => {
    if (reports && Array.isArray(reports)) {
      setDutiesToRender(reports);
    }
  }, [reports]);

  const [completedDuties, setCompletedDuties] = useState([]);

  const handleDutySubmit = (id) => {
    const completedDuty = dutiesToRender.find((duty) => duty.id === id);
    setCompletedDuties((prevCompletedDuties) => [
      ...prevCompletedDuties,
      completedDuty,
    ]);

    const updatedDuties = dutiesToRender.filter((duty) => duty.id !== id);
    setDutiesToRender(updatedDuties);
  };

  return (
    <>
      <div className={classes.Container}>
        <ul>
          {dutiesToRender.map((duty) => (
            <li key={duty.id}>
              <AdminDuty
                report={duty}
                id={duty.id}
                onSubmit={handleDutySubmit}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AdminDutyList;
