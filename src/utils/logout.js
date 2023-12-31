export const logout = (role) => {
  if (role === "admin") {
    localStorage.removeItem("adminToken");
  } else if (role === "user") {
    localStorage.removeItem("userToken");
  } else {
    console.error("Invalid role for logout");
  }
};
