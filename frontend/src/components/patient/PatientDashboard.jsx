// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserAppointments, removeAppointment } from "/src/redux/actions/appointmentActions";
// import { CalendarDays, Clock, CheckCircle, XCircle } from "lucide-react";
// import DetailsCard from "../DetailsCard";

// const PatientDashboard = () => {
//   const dispatch = useDispatch();
//   const appointments = useSelector((state) => state.appointment.userAppointments || []);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);

//   // Create a function to handle appointment removal
//   const remove = (id) => {
//     dispatch(removeAppointment(id))
//       .then(() => {
//         dispatch(fetchUserAppointments()); // Optionally, refetch the appointments
//         alert("Appointment deleted successfully");
//       })
//       .catch(() => {
//         alert("Failed to delete appointment");
//       });
//   };

//   useEffect(() => {
//     dispatch(fetchUserAppointments());
//   }, [dispatch]);

//   return (
//     <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-3xl">
//     <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Your Appointments</h2>
//     <div className="space-y-5">
//       {appointments.length === 0 ? (
//         <p className="text-center text-gray-500">You have no appointments.</p>
//       ) : (
//         appointments.map((appointment) => (
//           <div
//             key={appointment._id}
//             className="flex items-center justify-between bg-blue-50 border-l-4 border-blue-600 p-6 rounded-xl shadow-md"
//           >
//             <div>
//               <p className="text-lg font-medium text-blue-900 flex items-center">
//                 <CalendarDays className="w-5 h-5 mr-2 text-blue-500" />
//                 {appointment.date}
//               </p>
//               <p className="text-md text-gray-700 flex items-center mt-1">
//                 <Clock className="w-5 h-5 mr-2 text-green-500" />
//                 {appointment.hour}
//               </p>
//             </div>
//             <div className="flex gap-3 items-center">
//               {appointment.status === "Confirmed" ? (
//                 <CheckCircle className="w-6 h-6 text-green-500" />
//               ) : (
//                 <XCircle onClick={() => remove(appointment._id)} className="w-6 h-6 text-red-500 cursor-pointer hover:scale-110 transition" />
//               )}
//               <button
//                 onClick={() => setSelectedAppointment(appointment)}
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all"
//               >
//                 Details
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//     {selectedAppointment && (
//       <div className="mt-6">
//         <DetailsCard data={selectedAppointment} onClose={() => setSelectedAppointment(null)} />
//       </div>
//     )}
//   </div>
  
//   );
// };

// export default PatientDashboard;

// PatientDashboard.jsx - Same logic, better design
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAppointments, removeAppointment } from "/src/redux/actions/appointmentActions";
import { CalendarDays, Clock, CheckCircle, XCircle } from "lucide-react";
import DetailsCard from "../DetailsCard";

const PatientDashboard = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointment.userAppointments || []);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const remove = (id) => {
    dispatch(removeAppointment(id))
      .then(() => {
        dispatch(fetchUserAppointments());
        alert("Appointment deleted successfully");
      })
      .catch(() => {
        alert("Failed to delete appointment");
      });
  };

  useEffect(() => {
    dispatch(fetchUserAppointments());
  }, [dispatch]);

  return (
    <div className="space-y-8">
      {/* Header - Responsive */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-4 md:p-8 text-center text-white">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full mx-auto mb-4 md:mb-6 flex items-center justify-center">
          <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3">Your Appointments</h2>
        <p className="text-purple-100 text-sm md:text-lg">Manage and track your medical appointments</p>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-3xl shadow-xl md:shadow-2xl border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-8">
          {appointments.length === 0 ? (
            <div className="text-center py-8 md:py-16">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-100 rounded-full mx-auto mb-4 md:mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 md:w-12 md:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-600 mb-2">No Appointments Yet</h3>
              <p className="text-gray-500 text-sm md:text-base">Book your first appointment to get started</p>
            </div>
          ) : (
            <div className="space-y-4 md:space-y-6">
              {appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-4 md:p-6 hover:shadow-lg md:hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row items-start justify-between">
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-4 mb-4 md:mb-6">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg md:text-2xl font-bold text-purple-900 mb-1">Medical Appointment</h3>
                          <p className="text-purple-700 text-sm md:text-base">Healthcare Consultation</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3 md:gap-6 md:grid-cols-2">
                        <div className="flex items-center gap-3 bg-white rounded-lg md:rounded-xl p-3 md:p-4 shadow-sm">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <CalendarDays className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs md:text-sm text-gray-600">Date</p>
                            <p className="text-base md:text-lg font-bold text-gray-800">{appointment.date}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 bg-white rounded-lg md:rounded-xl p-3 md:p-4 shadow-sm">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Clock className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-xs md:text-sm text-gray-600">Time</p>
                            <p className="text-base md:text-lg font-bold text-gray-800">{appointment.hour}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-row md:flex-col gap-3 mt-4 md:mt-0 md:ml-8 w-full md:w-auto">
                      <div className="flex items-center gap-2">
                        {appointment.status === "Confirmed" ? (
                          <div className="flex items-center gap-1 bg-green-100 px-3 py-1 md:px-4 md:py-2 rounded-full">
                            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                            <span className="text-green-700 font-semibold text-xs md:text-sm">Confirmed</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => remove(appointment._id)}
                            className="flex items-center gap-1 bg-red-100 hover:bg-red-200 px-3 py-1 md:px-4 md:py-2 rounded-full transition-colors"
                          >
                            <XCircle className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
                            <span className="text-red-700 font-semibold text-xs md:text-sm">Cancel</span>
                          </button>
                        )}
                      </div>
                      
                      <button
                        onClick={() => setSelectedAppointment(appointment)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl shadow md:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm md:text-base"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Responsive Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-white rounded-xl md:rounded-3xl shadow-xl md:shadow-2xl w-full max-w-md md:max-w-2xl max-h-[95vh] overflow-auto">
            <DetailsCard 
              data={selectedAppointment} 
              onClose={() => setSelectedAppointment(null)} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;