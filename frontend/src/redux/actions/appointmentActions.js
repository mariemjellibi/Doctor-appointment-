import {
  setAllAppointments,
  setUserAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
} from "../slices/appointmentSlice";

// Action for fetching all appointments (mocked for demonstration)
export const fetchAllAppointments = () => async (dispatch) => {
  try {
    const response = await fetch("/api/appointments"); // Replace with your API endpoint
    const data = await response.json();
    dispatch(setAllAppointments(data));
  } catch (error) {
    console.error("Error fetching all appointments:", error);
  }
};

// Action for fetching user-specific appointments
export const fetchUserAppointments = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5005/api/appointments/patient/allappointments", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch appointments");
    }

    const appointments = await response.json();
    dispatch(setUserAppointments(appointments));
  } catch (error) {
    console.error("Error fetching user appointments:", error);
  }
};


// Action for adding a new appointment
export const createAppointment = (appointmentData) => async (dispatch) => {
  
  try {
    console.log("i am now in the createAp");
    const token = localStorage.getItem("token");
    console.log("Retrieved Token:", token);
    const response = await fetch("http://localhost:5005/api/appointments/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(appointmentData),
    });
    
    console.log("i am now in the createAppointment function",response);
    const newAppointment = await response.json();
    dispatch(addAppointment(newAppointment));
  } catch (error) {
    console.error("Error creating appointment:", error);
  }
};

// Action for updating an appointment
export const editAppointment = (id, updatedData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/appointments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    const updatedAppointment = await response.json();
    dispatch(updateAppointment({ id, updatedData: updatedAppointment }));
  } catch (error) {
    console.error("Error updating appointment:", error);
  }
};

// Action for deleting an appointment
export const removeAppointment = (id) => async (dispatch) => {
  try {
    console.log("here i am in the delete action");
    const token =localStorage.getItem("token");
    console.log("this is the token",token);
    await fetch(`http://localhost:5005/api/appointments/${id}`, { method: "DELETE" , headers: { "Content-Type": "application/json",  Authorization: token ? `Bearer ${token}` : "", },});
    dispatch(deleteAppointment({ id }));
  } catch (error) {
    console.error("Error deleting appointment:", error);
  }
};
