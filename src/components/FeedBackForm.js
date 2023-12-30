import React, { useState } from "react";
import classes from "./ReportForm.module.css";
import { setDutyBody } from "../utils/setDutyBody";
import { reportDuty } from "../utils/reportDuty";

const apiUrl = "http://192.168.187.86:8080/api/v1/worker/task/report";

const FeedBackForm = ({ task, onSubmit, onCancel }) => {
  const [dutyContent, setDutyContent] = useState("");
  const currentDate = new Date().toDateString();
  const storedToken = localStorage.getItem("userToken");
  const [isFormClosed, setFormClosed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedBackBody = setDutyBody(task.body, dutyContent);

    const formData = {
      body: feedBackBody,
      task_id: task.id,
    };

    try {
      await reportDuty(apiUrl, formData, storedToken);
      setDutyContent("");
      setFormClosed(true);
      onSubmit();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  if (isFormClosed) {
    return null;
  }

  return (
    <div className={classes.Container}>
      <form className={classes.DutyForm} onSubmit={handleSubmit}>
        <label>Report: {task.title}</label>
        <label>
          Report Date:
          {currentDate}
        </label>
        <label>
          Report Content
          <textarea
            value={dutyContent}
            onChange={(e) => setDutyContent(e.target.value)}
            type="text"
            required
            placeholder="Task..."
          ></textarea>
        </label>
        <div className={classes.btns}>
          <button type="submit">Report</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedBackForm;
