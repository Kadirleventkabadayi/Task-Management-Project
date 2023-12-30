// utils/api.js
export const getDuty = async (apiUrl, token) => {
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
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// export const getDuty = async (apiUrl, token) => {
//   try {
//     const response = await fetch(apiUrl, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         token: token,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await response.json();
//     console.log("Data:", data);
//     return data;
//   } catch (error) {
//     console.error("Error:", error);
//     throw error;
//   }
// };
