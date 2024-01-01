import React, { useEffect, useState } from "react";
import classes from "./DutyForm.module.css"; // DutyForm'un stil dosyası
import { getEmail } from "../utils/getEmails";
import { addDuty } from "../utils/addDuty";

const apiUrl = "http://localhost:8080/api/v1/admin/worker/";

const DutyForm = () => {
  const [dutyName, setDutyName] = useState("");
  const [dutyDate, setDutyDate] = useState("");
  const [dutyContent, setDutyContent] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [workerEmail, setWorkerEmail] = useState([]);
  const [emailData, setEmailData] = useState({ workers: [] });

  const storedToken = localStorage.getItem("adminToken");
  useEffect(() => {
    const realUrl = apiUrl + emailInput;

    const fetchData = async () => {
      try {
        if (emailInput.length === 0) {
          setEmailData("");
          return;
        }
        setEmailData(await getEmail(realUrl, storedToken));
        console.log(emailData?.workers);
      } catch (error) {
        console.error("Error fetching email data:", error);
      }
    };

    fetchData();
  }, [emailInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setWorkerEmail(() => emailInput);

    const newDuty = {
      title: dutyName,
      body: dutyContent,
      worker_email: workerEmail,
    };

    addDuty("http://localhost:8080/api/v1/admin/task", newDuty, storedToken);

    setDutyName("");
    setDutyDate("");
    setDutyContent("");
    setEmailInput("");
    setWorkerEmail([]);
    setEmailData({ workers: [] });
  };

  const handleItemClick = (email) => {
    console.log("Clicked worker email:", email);

    if (workerEmail.includes(email)) {
      setWorkerEmail((prev) => prev.filter((prevEmail) => prevEmail !== email));
    } else {
      setWorkerEmail((prev) => [...prev, email]);
    }
  };

  const handleSelectedEmailClick = (email) => {
    setWorkerEmail((prev) => prev.filter((prevEmail) => prevEmail !== email));
  };
  return (
    <div className={classes.Container}>
      <form className={classes.DutyForm} onSubmit={handleSubmit}>
        <label>
          Duty Name:
          <input
            type="text"
            value={dutyName}
            onChange={(e) => setDutyName(e.target.value)}
            required
          />
        </label>
        <label>
          Duty Date:
          <input
            type="date"
            value={dutyDate}
            onChange={(e) => setDutyDate(e.target.value)}
            required
          />
        </label>
        <label>
          Task content
          <textarea
            value={dutyContent}
            onChange={(e) => setDutyContent(e.target.value)}
            type="text"
            required
            placeholder="Task..."
          ></textarea>
        </label>
        <label>
          Selected Emails:
          <div className={classes.SelectedEmails}>
            {workerEmail.map((email) => (
              <span
                onClick={() => handleSelectedEmailClick(email)}
                key={email}
                className={classes.SelectedEmail}
              >
                {email}
              </span>
            ))}
          </div>
        </label>
        <label>
          Employee
          <input
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            type="text"
          ></input>
        </label>
        <div>
          <ul className={classes.List}>
            {emailData?.workers &&
              emailData?.workers.map((worker) => (
                <li
                  className={classes.ListItem}
                  onClick={() => handleItemClick(worker.email)}
                  key={worker.email}
                >
                  {worker.email ? worker.email : ""}
                </li>
              ))}
          </ul>
        </div>
        <button disabled={!dutyDate || !dutyName || !dutyContent} type="submit">
          Add Duty
        </button>
      </form>
    </div>
  );
};

export default DutyForm;
