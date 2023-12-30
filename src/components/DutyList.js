import { useEffect, useState } from "react";
import Duty from "./Duty";
import classes from "./DutyList.module.css";

const DutyList = ({ tasks }) => {
  const [dutiesToRender, setDutiesToRender] = useState([]);

  useEffect(() => {
    if (tasks && Array.isArray(tasks)) {
      setDutiesToRender(tasks);
    }
  }, [tasks]);

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
              <Duty task={duty} id={duty.id} onSubmit={handleDutySubmit} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DutyList;
