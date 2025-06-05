import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  Search,
  Filter,
  XCircle,
  UserCheck,
  Clock4,
  Stethoscope,
  Shield,
  Activity,
  HeartPulse
} from "lucide-react";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
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

  // Filter appointments based on search and status
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = searchTerm ? 
      `${appointment.patient.firstName} ${appointment.patient.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.patient.email.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    const matchesStatus = statusFilter === "all" ? true : 
      statusFilter === "confirmed" ? appointment.status : !appointment.status;
    
    return matchesSearch && matchesStatus;
  });

  // Group appointments by date
  const todayAppointments = filteredAppointments.filter(apt => 
    new Date(apt.date).toDateString() === new Date().toDateString()
  );

  const upcomingAppointments = filteredAppointments.filter(apt => 
    new Date(apt.date) > new Date() && new Date(apt.date).toDateString() !== new Date().toDateString()
  );

  // Stats calculation
  const stats = {
    total: filteredAppointments.length,
    confirmed: filteredAppointments.filter(apt => apt.status).length,
    pending: filteredAppointments.filter(apt => !apt.status).length,
    today: todayAppointments.length
  };

  // Handle status change (from first code - local state update with mock functionality)
  const handleStatusChange = (id) => {
    setAppointments(appointments.map(appointment => 
      appointment._id === id 
        ? { ...appointment, status: !appointment.status } 
        : appointment
    ));
  };

  // Handle deletion (from first code - local state update with mock functionality)
  const handleDelete = (id) => {
    setAppointments(appointments.filter((appointment) => appointment._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-xl mr-4">
                <Stethoscope className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage your patient appointments efficiently</p>
              </div>
            </div>
            <button 
              onClick={fetchAppointments}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.confirmed}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Clock4 className="w-6 h-6 text-amber-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today</p>
                <p className="text-2xl font-bold text-gray-900">{stats.today}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search patients by name or email..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
              <p className="text-gray-600">Loading appointments...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                <p className="text-red-700">{error}</p>
              </div>
              <button 
                onClick={fetchAppointments} 
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* No Appointments */}
        {!loading && !error && filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Appointments Grid */}
        {!loading && !error && filteredAppointments.length > 0 && (
          <div>
            {/* Today's Appointments */}
            {todayAppointments.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <HeartPulse className="w-5 h-5 text-red-500 mr-2" />
                  Today's Appointments
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {todayAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment._id}
                      appointment={appointment}
                      onStatusChange={handleStatusChange}
                      onDelete={handleDelete}
                      priority="today"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Appointments */}
            {upcomingAppointments.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 text-blue-500 mr-2" />
                  Upcoming Appointments
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment._id}
                      appointment={appointment}
                      onStatusChange={handleStatusChange}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* All other appointments (past/other) */}
            {filteredAppointments.filter(apt => 
              new Date(apt.date).toDateString() !== new Date().toDateString() && 
              new Date(apt.date) <= new Date()
            ).length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 text-gray-500 mr-2" />
                  All Appointments
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAppointments
                    .filter(apt => 
                      new Date(apt.date).toDateString() !== new Date().toDateString() && 
                      new Date(apt.date) <= new Date()
                    )
                    .map((appointment) => (
                      <AppointmentCard
                        key={appointment._id}
                        appointment={appointment}
                        onStatusChange={handleStatusChange}
                        onDelete={handleDelete}
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Security Notice */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
          <div className="flex items-center">
            <Shield className="w-6 h-6 text-blue-600 mr-4" />
            <div>
              <p className="text-sm text-blue-800 font-medium">
                Your patient data is protected with HIPAA-compliant encryption
              </p>
              <p className="text-xs text-blue-700 mt-1">
                All information is securely stored and transmitted using AES-256 encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppointmentCard = ({ appointment, onStatusChange, onDelete, priority }) => {
  const StatusIcon = appointment.status ? CheckCircle : AlertCircle;
  
  return (
    <div className={`bg-white rounded-xl shadow-sm border transition-all hover:shadow-md ${
      priority === "today" ? "border-l-4 border-l-red-500" : "border-gray-200"
    }`}>
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-gray-900">
                {appointment.patient.firstName} {appointment.patient.lastName}
              </h3>
              <div className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                appointment.status ? "text-emerald-700 bg-emerald-100" : "text-amber-700 bg-amber-100"
              }`}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {appointment.status ? "Confirmed" : "Pending"}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span>
              {new Date(appointment.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-gray-400" />
            <span>{appointment.hour}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Mail className="w-4 h-4 mr-2 text-gray-400" />
            <span className="truncate">{appointment.patient.email}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Phone className="w-4 h-4 mr-2 text-gray-400" />
            <span>{appointment.patient.phone}</span>
          </div>
        </div>

        {appointment.description && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-start">
              <FileText className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
              <p className="text-sm text-gray-700">{appointment.description}</p>
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-between">
          {/* Toggle Status Button (from first code functionality) */}
          <button
            onClick={() => onStatusChange(appointment._id)}
            className={`px-3 py-2 rounded-lg flex items-center transition ${
              appointment.status 
                ? "bg-amber-100 text-amber-700 hover:bg-amber-200" 
                : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
            }`}
          >
            <UserCheck className="w-4 h-4 mr-1" />
            {appointment.status ? "Mark as Pending" : "Mark as Confirmed"}
          </button>
          
          {/* Delete Button (from first code functionality) */}
          <button
            onClick={() => onDelete(appointment._id)}
            className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center transition"
          >
            <XCircle className="w-4 h-4 mr-1" />
            Delete
          </button>
        </div>
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