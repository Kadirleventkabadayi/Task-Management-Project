export const register = async (apiUrl, formData, token) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const newUserData = await response.json();
    console.log("New User Data:", newUserData);
    return newUserData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
