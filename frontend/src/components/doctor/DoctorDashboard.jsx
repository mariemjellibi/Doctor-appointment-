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
            <p className="text-gray-600 dark:text-gray-300"><strong>Description:</strong> {appointment.description}</p>
            
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

// export default DoctorDashboard;
// import { useEffect, useState, useCallback } from "react";
// import { useSelector } from "react-redux";
// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import { CheckCircle, XCircle, RefreshCw } from "lucide-react";
// import format from "date-fns/format";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import getDay from "date-fns/getDay";
// import enUS from "date-fns/locale/en-US";
// import "react-big-calendar/lib/css/react-big-calendar.css";

// const locales = {
//   "en-US": enUS,
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

// const DoctorDashboard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
  
//   const token = useSelector((state) => state.auth.token);

//   const fetchAppointments = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch("http://localhost:5005/api/appointments/all", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) throw new Error("Failed to fetch appointments");

//       const data = await response.json();
//       console.log(data);
//       if (Array.isArray(data.appointments)) {
//         setAppointments(
//           data.appointments.map((appt) => ({
//             id: appt._id,
//             title: `${appt.patient.firstName} ${appt.patient.lastName}`,
//             start: new Date(`${appt.date}T${appt.hour}`),
//             end: new Date(`${appt.date}T${appt.hour}`),
//             desc: appt.description,
//             status: appt.status,
//             patient: appt.patient,
//             date: appt.date,
//             hour: appt.hour,
//           }))
//         );
//       } else {
//         throw new Error("Appointments data is not an array");
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [token]);

//   useEffect(() => {
//     if (token) fetchAppointments();
//     else {
//       setError("No token available.");
//       setLoading(false);
//     }
//   }, [token, fetchAppointments]);

//   const handleStatusChange = async (id) => {
//     try {
//       const appointmentToUpdate = appointments.find(appt => appt.id === id);
//       const newStatus = !appointmentToUpdate.status;

//       const response = await fetch(`http://localhost:5005/api/appointments/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       if (!response.ok) throw new Error("Failed to update status");

//       setAppointments(appointments.map(appt =>
//         appt.id === id ? { ...appt, status: newStatus } : appt
//       ));
      
//       if (selectedAppointment?.id === id) {
//         setSelectedAppointment(prev => ({ ...prev, status: newStatus }));
//       }
//     } catch (error) {
//       console.error("Status update error:", error);
//       setError("Failed to update appointment status");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5005/api/appointments/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) throw new Error("Failed to delete appointment");

//       setAppointments(appointments.filter(appt => appt.id !== id));
//       setSelectedAppointment(null);
//     } catch (error) {
//       console.error("Delete error:", error);
//       setError("Failed to delete appointment");
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
//           Appointments Calendar
//         </h2>
//         <button
//           onClick={fetchAppointments}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center transition-colors"
//         >
//           <RefreshCw className="w-5 h-5 mr-2" />
//           Refresh
//         </button>
//       </div>

//       {loading && <p className="text-center text-gray-500">Loading appointments...</p>}

//       {error && (
//         <div className="text-center text-red-500 mb-4">
//           <p>{error}</p>
//           <button
//             onClick={fetchAppointments}
//             className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
//           >
//             Retry
//           </button>
//         </div>
//       )}

//       {!loading && !error && (
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
//           <Calendar
//             localizer={localizer}
//             events={appointments}
//             startAccessor="start"
//             endAccessor="end"
//             style={{ height: 600 }}
//             onSelectEvent={setSelectedAppointment}
//             eventPropGetter={(event) => ({
//               style: {
//                 backgroundColor: event.status ? "#34d399" : "#facc15",
//                 color: "black",
//                 borderRadius: "8px",
//                 border: "none",
//                 cursor: "pointer",
//               },
//             })}
//             tooltipAccessor={(event) => `
//               Patient: ${event.title}
//               Time: ${format(event.start, 'HH:mm')}
//               Status: ${event.status ? "Confirmed" : "Pending"}
//             `}
//           />
//         </div>
//       )}

//       {selectedAppointment && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
//             <div className="flex justify-between items-start mb-4">
//               <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
//                 Appointment Details
//               </h3>
//               <button
//                 onClick={() => setSelectedAppointment(null)}
//                 className="text-gray-500 hover:text-gray-700 dark:text-gray-300"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="space-y-3 text-gray-600 dark:text-gray-300">
//               <p><strong>Patient:</strong> {selectedAppointment.title}</p>
//               <p><strong>Email:</strong> {selectedAppointment.patient.email}</p>
//               <p><strong>Phone:</strong> {selectedAppointment.patient.phone}</p>
//               <p><strong>Date:</strong> {format(new Date(selectedAppointment.date), "MM/dd/yyyy")}</p>
//               <p><strong>Time:</strong> {selectedAppointment.hour}</p>
//               <p><strong>Description:</strong> {selectedAppointment.desc}</p>
//               <div className="flex items-center">
//                 <strong>Status:</strong>
//                 <span className={`ml-2 px-2 py-1 rounded text-white ${
//                   selectedAppointment.status ? "bg-green-500" : "bg-yellow-500"
//                 }`}>
//                   {selectedAppointment.status ? "Confirmed" : "Pending"}
//                 </span>
//               </div>
//             </div>

//             <div className="mt-6 flex justify-between items-center">
//               <button
//                 onClick={() => handleStatusChange(selectedAppointment.id)}
//                 className={`flex items-center px-4 py-2 rounded-md transition-colors ${
//                   selectedAppointment.status
//                     ? "bg-yellow-500 hover:bg-yellow-600"
//                     : "bg-green-500 hover:bg-green-600"
//                 } text-white`}
//               >
//                 {selectedAppointment.status ? (
//                   <>
//                     <XCircle className="w-5 h-5 mr-2" />
//                     Mark Pending
//                   </>
//                 ) : (
//                   <>
//                     <CheckCircle className="w-5 h-5 mr-2" />
//                     Confirm
//                   </>
//                 )}
//               </button>

//               <button
//                 onClick={() => handleDelete(selectedAppointment.id)}
//                 className="flex items-center text-red-500 hover:text-red-600"
//               >
//                 <XCircle className="w-5 h-5 mr-2" />
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

 export default DoctorDashboard;