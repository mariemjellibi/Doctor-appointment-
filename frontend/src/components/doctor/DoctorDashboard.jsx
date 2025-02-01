import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector to get token from Redux store

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]); // Store appointments data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const token = useSelector((state) => state.auth.token); // Get the token from Redux store

  useEffect(() => {
    // Fetching the appointments data
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/appointments/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass the token here
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();
console.log("data.appointments",data.appointments);
        // Ensure data is an array before setting the state
        if (Array.isArray(data.appointments)) {
          setAppointments(data.appointments);
        } else {
          throw new Error("Appointments data is not an array");
        }
      } catch (err) {
        setError(err.message); // Set the error message if the fetch fails
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    if (token) {
      fetchAppointments();
    } else {
      setError("No token available.");
      setLoading(false);
    }
  }, [token]); // Make sure the effect runs when the token changes

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            <h3>Appointment Details:</h3>
            <p><strong>Patient:</strong> {appointment.patient.firstName} {appointment.patient.lastName}</p>
            <p><strong>Email:</strong> {appointment.patient.email}</p>
            <p><strong>Phone:</strong> {appointment.patient.phone}</p>
            <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {appointment.hour}</p>
            <p><strong>Status:</strong> {appointment.status ? "Confirmed" : "Pending"}</p>
            <p><strong>Description:</strong> {appointment.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorDashboard;
