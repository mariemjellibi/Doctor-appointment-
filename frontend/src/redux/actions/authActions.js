import { login,register } from "../slices/authSlice"; // Ensure this is a valid action or thunk

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

    // Dispatch login action with the payload
    dispatch(login({ user: data.user, token: data.token }));
    return { payload: data }; // Ensure the payload contains 'user'
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
};

export const registerUser = (firstName, lastName, email, phone, password) => async (dispatch) => {
  try {
    const res = await fetch("http://localhost:5005/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, phone, password }),
    });

    // Check if the response is successful
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await res.json();
    console.log("Response Data:", data); // Log the response to check its structure

    // Ensure the response data has the user object
    if (data && data._id) {
      dispatch(register(data));
    } else {
      console.error("Registration failed: User data not found.");
    }
  } catch (error) {
    console.error("Registration error:", error.message);
  }
};
