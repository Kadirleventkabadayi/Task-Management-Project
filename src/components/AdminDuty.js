import React, { useState } from "react";
import classes from "./Duty.module.css";
import { setDutyBody } from "../utils/setDutyBody";
import { acceptDuty } from "../utils/acceptDuty";
import FeedBackForm from "./FeedBackForm";

const apiUrlBasic = "http://localhost:8080/api/v1/admin/task/";

const AdminDuty = ({ id, onSubmit, report }) => {
  console.log(report);
  const [status, setStatus] = useState("Panding");
  const [prevStatus, setPrevStatus] = useState("Panding");
  const [isVisible, setIsVisible] = useState(true);
  const [visibleForm, setVisibleForm] = useState(false);
  const [isFeedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const storedToken = localStorage.getItem("adminToken");

  const handleStatus = (stat) => {
    setPrevStatus(status);
    setStatus(stat);
  };

  const handleApprove = async () => {
    const realUrl = apiUrlBasic + report.id;
    acceptDuty(realUrl, storedToken);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsVisible(false);
  };

  const containerClass =
    status === "Approve"
      ? `${classes.Container} ${classes.Submit}`
      : status === "FeedBack"
      ? `${classes.Container} ${classes.Report}`
      : status === "Start"
      ? `${classes.Container} ${classes.Start}`
      : classes.Container;

  const body = setDutyBody(report.body, report.report_body);

  return (
    <>
      {visibleForm && (
        <FeedBackForm
          task={report}
          onSubmit={() => setVisibleForm(false)}
          onComplete={() => setFeedbackSubmitted(true)}
          onCancel={() => {
            setVisibleForm(false);
            setStatus(prevStatus); // Önceki durumu geri yükle
          }}
        />
      )}
      {isVisible && !isFeedbackSubmitted && (
        <div className={containerClass}>
          <img
            src="https://cdn-icons-png.flaticon.com/256/17/17004.png"
            alt="ass"
          />
          <div className={classes.Info}>
            <div className={classes.Head}>
              <div className={classes.Base}>
                <h3>{report.title}</h3>
                <h4>-</h4>
                <h4>{report.report_date}</h4>
              </div>
              <h5>Status: {status}</h5>
            </div>

            <div className={classes.Duty}>
              <p>{body}</p>
              <div className={classes.Partners}>
                <h4>{report.worker_email}</h4>
              </div>
            </div>
            <div className={classes.btns}>
              <button
                onClick={() => {
                  handleStatus("Approve");
                  handleApprove();
                }}
              >
                Approve
              </button>
              <button
                onClick={() => {
                  handleStatus("FeedBack");
                  setVisibleForm(true);
                }}
              >
                Send FeedBack
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDuty;
