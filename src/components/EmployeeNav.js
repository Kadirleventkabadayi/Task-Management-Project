import { useEffect, useState } from "react";
import classes from "./EmployeeNav.module.css";
import AdminDutyList from "./AdminDutyList";

const DUMMYLIST = [
  { dsiplayName: "Levo" },
  { dsiplayName: "Hoca" },
  { dsiplayName: "Ibo" },
  { dsiplayName: "Burak" },
];

const EmployeeNav = ({ employees }) => {
  const [list, setList] = useState();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setList(<AdminDutyList></AdminDutyList>);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setIsVisible((prev) => !prev);
  };
  return (
    <>
      <div className={classes.Container}>
        <ul className={classes.Nav}>
          {DUMMYLIST.map((user) => (
            <li onClick={handleClick} key={user.dsiplayName}>
              {user.dsiplayName}
            </li>
          ))}
        </ul>
        <ul>{isVisible && list}</ul>
      </div>
    </>
  );
};

export default EmployeeNav;
