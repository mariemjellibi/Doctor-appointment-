// import { useState } from "react";
// import PatientDashboard from "../components/doctor/PatientDashboard";
// import AppointmentForm from "../components/doctor/DoctorAppointment";
// const DoctorPage = () => {
//   const [selectedOption, setSelectedOption] = useState("profile");

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//   };

//   return (

//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="w-60 bg-gray-100 border-r border-gray-200">
//         <ul className="space-y-4 p-4">
         
//           <li
//             onClick={() => handleOptionClick("appointment")}
//             className={`cursor-pointer py-2 px-4 rounded-lg ${
//               selectedOption === "appointment"
//                 ? "bg-blue-500 text-white"
//                 : "hover:bg-blue-100 text-gray-800"
//             }`}
//           >
//             New Appointment
//           </li>
//           <li
//             onClick={() => handleOptionClick("dashboard")}
//             className={`cursor-pointer py-2 px-4 rounded-lg ${
//               selectedOption === "dashboard"
//                 ? "bg-blue-500 text-white"
//                 : "hover:bg-blue-100 text-gray-800"
//             }`}
//           >
//             Appointments
//           </li>
//         </ul>
//       </div>

//        <div className="flex-1 p-6 bg-gray-50">
//         {selectedOption === "appointment" && <AppointmentForm />}
//         {selectedOption === "dashboard" && <PatientDashboard />}
//       </div> 
//     </div>
//   );
// };

// export default DoctorPage;

import DoctorDashboard from "../components/doctor/DoctorDashboard"
const DoctorPage = () => {
  return (
    <div><DoctorDashboard/></div>
  )
}

export default DoctorPage