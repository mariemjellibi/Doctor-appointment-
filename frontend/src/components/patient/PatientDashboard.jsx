import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAppointments, removeAppointment } from "/src/redux/actions/appointmentActions";
import { CalendarDays, Clock, CheckCircle, XCircle } from "lucide-react";
import DetailsCard from "../DetailsCard";

const PatientDashboard = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointment.userAppointments || []);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Create a function to handle appointment removal
  const remove = (id) => {
    dispatch(removeAppointment(id))
      .then(() => {
        dispatch(fetchUserAppointments()); // Optionally, refetch the appointments
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
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-3xl">
    <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Your Appointments</h2>
    <div className="space-y-5">
      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">You have no appointments.</p>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="flex items-center justify-between bg-blue-50 border-l-4 border-blue-600 p-6 rounded-xl shadow-md"
          >
            <div>
              <p className="text-lg font-medium text-blue-900 flex items-center">
                <CalendarDays className="w-5 h-5 mr-2 text-blue-500" />
                {appointment.date}
              </p>
              <p className="text-md text-gray-700 flex items-center mt-1">
                <Clock className="w-5 h-5 mr-2 text-green-500" />
                {appointment.hour}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              {appointment.status === "Confirmed" ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <XCircle onClick={() => remove(appointment._id)} className="w-6 h-6 text-red-500 cursor-pointer hover:scale-110 transition" />
              )}
              <button
                onClick={() => setSelectedAppointment(appointment)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all"
              >
                Details
              </button>
            </div>
          </div>
        ))
      )}
    </div>
    {selectedAppointment && (
      <div className="mt-6">
        <DetailsCard data={selectedAppointment} onClose={() => setSelectedAppointment(null)} />
      </div>
    )}
  </div>
  
  );
};

export default PatientDashboard;
