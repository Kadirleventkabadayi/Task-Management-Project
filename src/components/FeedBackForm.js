import React, { useState } from "react";
import classes from "./ReportForm.module.css";
import { setDutyBody } from "../utils/setDutyBody";
import { reportDuty } from "../utils/reportDuty";

const apiUrl = "http://31.223.6.113:8080/api/v1/admin/fedback";

const FeedBackForm = ({ task, onSubmit, onCancel, onComplete }) => {
  const [dutyContent, setDutyContent] = useState("");
  const currentDate = new Date().toDateString();
  const storedToken = localStorage.getItem("adminToken");
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
      onComplete(); // Notify the parent component about completion
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
        <label>FeedBack: {task.title}</label>
        <label>
          FeedBack Date:
          {currentDate}
        </label>
        <label>
          FeedBack Content
          <textarea
            value={dutyContent}
            onChange={(e) => setDutyContent(e.target.value)}
            type="text"
            required
            placeholder="Task..."
          ></textarea>
        </label>
        <div className={classes.btns}>
          <button type="submit">FeedBack</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedBackForm;
