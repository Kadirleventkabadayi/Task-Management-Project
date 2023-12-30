export const signin = async (apiUrl, formData) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const userData = await response.json();
    console.log("User Data:", userData);
    return userData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
