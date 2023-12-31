import { logout } from "../utils/logout";
import classes from "./LogoutButton.module.css";
import logoutIcon from "../assests/logout.svg";

const LogoutButton = ({ role, onLogout }) => {
  const handleLogout = () => {
    logout(role);
    onLogout();
  };

  return (
    <button
      className={role === "admin" ? classes.btn : classes.userbtn}
      onClick={handleLogout}
    >
      Logout
      <div className={classes.innerContainer}>
        <img src={logoutIcon} alt="Logout"></img>
      </div>
    </button>
  );
};

export default LogoutButton;
