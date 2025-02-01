import { login,register,update } from "../slices/authSlice"; // Ensure this is a valid action or thunk

// Thunk action to handle user login
export const loginUser = (email, password) => async (dispatch) => {
  try {
    const res = await fetch("http://localhost:5005/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await res.json();
console.log("data",data);
console.log("TOKEN",data.token);
localStorage.setItem("token", data.token);

    // Dispatch login action with the payload
    dispatch(login({...data }));
    return { payload: data }; // Ensure the payload contains 'user'
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
};


export const registerUser = (firstName, lastName, email, phone, password, isDoctor) => async (dispatch) => {
  try {
    const res = await fetch("http://localhost:5005/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, phone, password, isDoctor }),
    });

    console.log("res de la action register", res);

    // Check if the response is successful
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error details:", errorData);
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await res.json();
    console.log("Response Data:", data); // Log the response to check its structure

    // Dispatch user data to Redux store if necessary
    if (data && data._id) {
      dispatch(register(data));
    } else {
      console.error("Registration failed: User data not found.");
    }

    // Return data to the caller
    return data; // <-- Important! Return the response
  } catch (error) {
    console.error("Registration error:", error.message);
    throw error; // <-- Rethrow the error to handle it in the caller
  }
};
// redux/actions/authActions.js
export const updateProfile = (updatedData) => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found, user is not authenticated.");
  }
// we must add the token to the headers 
  try {
    const response = await fetch("http://localhost:5005/api/users/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,  // Add token here
      },
      body: JSON.stringify(updatedData),
      credentials: "include", // Ensure cookies are sent
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Update failed");
    }

    const data = await response.json();
    console.log("Updated data:", data);

    dispatch(update(data));
    return data;
  } catch (error) {
    console.error("Update error:", error.message);
    throw error;
  }
};
