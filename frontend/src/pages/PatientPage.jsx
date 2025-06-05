import { useState } from "react";
import PatientDashboard from "../components/patient/PatientDashboard";
import PatientProfile from "../components/patient/PatientProfile";
import AppointmentForm from "../components/patient/AppointmentForm";

const PatientPage = () => {
  const [selectedOption, setSelectedOption] = useState("profile");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl border-r border-gray-200 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Patient Panel</h2>
          <ul className="space-y-3">
            <li
              onClick={() => handleOptionClick("profile")}
              className={`cursor-pointer px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                selectedOption === "profile"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
              }`}
            >
              🧍 Profile
            </li>
            <li
              onClick={() => handleOptionClick("appointment")}
              className={`cursor-pointer px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                selectedOption === "appointment"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
              }`}
            >
              📅 New Appointment
            </li>
            <li
              onClick={() => handleOptionClick("dashboard")}
              className={`cursor-pointer px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                selectedOption === "dashboard"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
              }`}
            >
              📋 Appointments
            </li>
          </ul>
        </div>
        <div className="text-center text-sm text-gray-500 mt-10">
          © 2025 YourClinic
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-10">
        {selectedOption === "profile" && <PatientProfile />}
        {selectedOption === "appointment" && <AppointmentForm />}
        {selectedOption === "dashboard" && <PatientDashboard />}
      </main>
    </div>
  );
};

export default PatientPage;
