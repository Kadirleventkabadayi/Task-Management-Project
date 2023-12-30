// utils/api.js
export const setPanding = async (apiUrl, token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.token = token;
    }

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Data:", data);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
