import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react"; // Icons for better visuals

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const token = useSelector((state) => state.auth.token);

  // Fetch Appointments Function
  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5005/api/appointments/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch appointments");

      const data = await response.json();
      if (Array.isArray(data.appointments)) {
        setAppointments(data.appointments);
      } else {
        throw new Error("Appointments data is not an array");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchAppointments();
    } else {
      setError("No token available.");
      setLoading(false);
    }
  }, [token, fetchAppointments]);

  // Mock function for changing status
  const handleStatusChange = (id) => {
    setAppointments(appointments.map(appointment => 
      appointment._id === id 
        ? { ...appointment, status: !appointment.status } 
        : appointment
    ));
  };

  // Mock function for deleting appointment
  const handleDelete = (id) => {
    setAppointments(appointments.filter((appointment) => appointment._id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6">
        Appointments
      </h2>

      {/* Refresh Button */}
      <button 
        onClick={fetchAppointments} 
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-6 hover:bg-blue-600 transition flex items-center"
      >
        <RefreshCw className="w-5 h-5 mr-2" />
        Refresh
      </button>

      {/* Loading State */}
      {loading && <p className="text-gray-500 text-center">Loading appointments...</p>}

      {/* Error Handling with Retry Button */}
      {error && (
        <div className="text-red-500 text-center">
          <p>{error}</p>
          <button 
            onClick={fetchAppointments} 
            className="bg-red-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* No Appointments Message */}
      {!loading && !error && appointments.length === 0 && (
        <p className="text-gray-500 text-center">No appointments found.</p>
      )}

      {/* Appointments List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 border hover:shadow-lg transition duration-300">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Appointment Details</h3>
            <p className="text-gray-600 dark:text-gray-300"><strong>Patient:</strong> {appointment.patient.firstName} {appointment.patient.lastName}</p>
            <p className="text-gray-600 dark:text-gray-300"><strong>Email:</strong> {appointment.patient.email}</p>
            <p className="text-gray-600 dark:text-gray-300"><strong>Phone:</strong> {appointment.patient.phone}</p>
            <p className="text-gray-600 dark:text-gray-300"><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
            <p className="text-gray-600 dark:text-gray-300"><strong>Time:</strong> {appointment.hour}</p>
            
            <div className="flex items-center">
              <p className="text-gray-600 dark:text-gray-300"><strong>Status:</strong></p>
              <span className={`ml-2 px-2 py-1 rounded text-white ${appointment.status ? "bg-green-500" : "bg-yellow-500"}`}>
                {appointment.status ? "Confirmed" : "Pending"}
              </span>
            </div>

            <div className="mt-4 flex justify-between">
              {/* Toggle Status */}
              <button
                onClick={() => handleStatusChange(appointment._id)}
                className={`text-white py-1 px-3 rounded-md ${appointment.status ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"} transition`}
              >
                {appointment.status ? "Mark as Pending" : "Mark as Confirmed"}
              </button>

              {/* Delete Appointment */}
              <button
                onClick={() => handleDelete(appointment._id)}
                className="text-red-500 hover:text-red-600 transition"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorDashboard;
