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
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
        Your Appointments
      </h2>

      <div className="space-y-4">
        {appointments.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300 text-center">
            No appointments found.
          </p>
        ) : (
          appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 flex items-center justify-between border border-gray-200 dark:border-gray-700"
            >
              <div>
                <p className="flex items-center text-gray-700 dark:text-gray-300">
                  <CalendarDays className="w-5 h-5 mr-2 text-blue-500" />
                  {appointment.date}
                </p>
                <p className="flex items-center text-gray-700 dark:text-gray-300">
                  <Clock className="w-5 h-5 mr-2 text-green-500" />
                  {appointment.hour}
                </p>
              </div>

              <div className="flex items-center">
                {appointment.status === "Confirmed" ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle onClick={() => remove(appointment._id)} className="w-6 h-6 text-red-500 cursor-pointer" />
                )}
                <button 
                  onClick={() => setSelectedAppointment(appointment)} 
                  className="shadow-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
                  Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Show DetailsCard if an appointment is selected */}
      {selectedAppointment && <DetailsCard data={selectedAppointment} onClose={() => setSelectedAppointment(null)} />}
    </div>
  );
};

export default PatientDashboard;
