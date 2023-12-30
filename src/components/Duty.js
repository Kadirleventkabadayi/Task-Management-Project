import React, { useEffect, useState } from "react";
import classes from "./Duty.module.css";
import ReportForm from "./ReportForm";
import { setDutyBody } from "../utils/setDutyBody";
import { setPanding } from "../utils/setPanding";
const apiUrlBasic = "http://192.168.187.86:8080/api/v1/worker/task/panding/";

const Duty = ({ id, onSubmit, task }) => {
  console.log(task);
  const [status, setStatus] = useState("Panding");
  const [prevStatus, setPrevStatus] = useState("Panding");
  const [isVisible, setIsVisible] = useState(true);
  const [visibleForm, setVisibleForm] = useState(false);

  useEffect(() => {
    // task prop'u değiştiğinde status'u güncelle
    updateStatus();
  }, [task]);

  const handleStatus = async (stat) => {
    setPrevStatus(status);
    setStatus(stat);

    if (stat === "Start") {
      //fetch
      const apiUrl = apiUrlBasic + id;
      const storedToken = localStorage.getItem("userToken");

      try {
        await setPanding(apiUrl, storedToken);
      } catch (error) {
        console.error("Error in setPanding:", error);
      }
    }
  };

  const containerClass =
    status === "Submit"
      ? `${classes.Container} ${classes.Submit}`
      : status === "Report"
      ? `${classes.Container} ${classes.Report}`
      : status === "Start"
      ? `${classes.Container} ${classes.Start}`
      : classes.Container;

  const body = setDutyBody(task.body, task.report_body);

  const trimDate = (date) => {
    return date.split("T")[0];
  };

  const controlArray = [
    task.panding === 1, // true start yapılabilir false false submit yapılabilir
    task.report === 1, // true raporlandı ya da submitlendi false raporlanmadı
  ];
  const updateStatus = () => {
    if (controlArray[0] && !controlArray[1]) {
      setStatus("Panding");
      return;
    }
    if (!controlArray[0] && !controlArray[1]) {
      setStatus("Start");
      return;
    }
    if (controlArray[0] && controlArray[1]) {
      setStatus("Submit");
      return;
    }
  };

  console.log("control: ", controlArray);
  return (
    <>
      {visibleForm && (
        <ReportForm
          task={task}
          oldContent={task.report_body}
          onSubmit={() => setVisibleForm(false)}
          onComplete={() => setIsVisible(false)}
          onCancel={() => {
            setVisibleForm(false);
            setStatus(prevStatus);
          }}
        />
      )}
      {isVisible && (
        <div className={containerClass}>
          <img
            src="https://cdn-icons-png.flaticon.com/256/17/17004.png"
            alt="ass"
          />
          <div className={classes.Info}>
            <div className={classes.Head}>
              <div className={classes.Base}>
                <h3>{task.title}</h3>
                <h4>-</h4>
                <h4>{trimDate(task.created_at)}</h4>
              </div>
              <h5>Status: {status}</h5>
            </div>

            <div className={classes.Duty}>
              <p>{body}</p>
            </div>
            <div className={classes.btns}>
              <button
                onClick={() => {
                  handleStatus("Start");
                }}
                disabled={status === "Panding" ? false : true}
              >
                Start Duty
              </button>
              <button
                onClick={() => {
                  handleStatus("Submit");
                  setVisibleForm(true);
                }}
                disabled={status === "Start" ? false : true}
              >
                Submit Duty
              </button>
              <button
                onClick={() => {
                  handleStatus("Report");
                  setVisibleForm(true);
                }}
                disabled={status === "Start" ? false : true}
              >
                Report Duty
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Duty;
