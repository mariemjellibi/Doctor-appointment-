// import { useState } from "react";
// import PatientDashboard from "../components/patient/PatientDashboard";
// import PatientProfile from "../components/patient/PatientProfile";
// import AppointmentForm from "../components/patient/AppointmentForm";

// const PatientPage = () => {
//   const [selectedOption, setSelectedOption] = useState("profile");

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//   };

//   return (
//     <div className="flex h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-xl border-r border-gray-200 p-6 flex flex-col justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Patient Panel</h2>
//           <ul className="space-y-3">
//             <li
//               onClick={() => handleOptionClick("profile")}
//               className={`cursor-pointer px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
//                 selectedOption === "profile"
//                   ? "bg-blue-600 text-white shadow-md"
//                   : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
//               }`}
//             >
//               🧍 Profile
//             </li>
//             <li
//               onClick={() => handleOptionClick("appointment")}
//               className={`cursor-pointer px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
//                 selectedOption === "appointment"
//                   ? "bg-blue-600 text-white shadow-md"
//                   : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
//               }`}
//             >
//               📅 New Appointment
//             </li>
//             <li
//               onClick={() => handleOptionClick("dashboard")}
//               className={`cursor-pointer px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
//                 selectedOption === "dashboard"
//                   ? "bg-blue-600 text-white shadow-md"
//                   : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
//               }`}
//             >
//               📋 Appointments
//             </li>
//           </ul>
//         </div>
//         <div className="text-center text-sm text-gray-500 mt-10">
//           © 2025 YourClinic
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto p-10">
//         {selectedOption === "profile" && <PatientProfile />}
//         {selectedOption === "appointment" && <AppointmentForm />}
//         {selectedOption === "dashboard" && <PatientDashboard />}
//       </main>
//     </div>
//   );
// };

// export default PatientPage;
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import PatientDashboard from "../components/patient/PatientDashboard";
import PatientProfile from "../components/patient/PatientProfile";
import AppointmentForm from "../components/patient/AppointmentForm";
import { getUserProfile } from "../redux/actions/authActions";

const PatientPage = () => {
  const [selectedOption, setSelectedOption] = useState("profile");
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const notificationRef = useRef(null);

  // Handle click outside to close notifications
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle window resize
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!user?.email) return;
    
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch(
        `http://localhost:5005/api/notifications/${user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (isMobile) {
      setSidebarOpen(false);
      setIsNotificationOpen(false);
    }
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
    // Mark as read when opened
    if (!isNotificationOpen && notifications.length > 0) {
      setHasNotification(false);
    }
  };

  // Notification Bell Component
  const NotificationBell = () => (
    <div className="relative" ref={notificationRef}>
      <button 
        onClick={toggleNotifications}
        className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
      >
        <svg
          className="w-7 h-7 text-gray-600 hover:text-blue-600 transition"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C8.67 6.165 8 7.388 8 9v5.159c0 .538-.214 1.055-.595 1.436L6 17h5m4 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-block w-3 h-3 bg-red-500 rounded-full"></span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isNotificationOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-50 border border-gray-200 max-h-80 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-800">Notifications</h3>
          </div>
          
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notification, index) => (
                <li 
                  key={index} 
                  className="p-4 border-b border-gray-100 hover:bg-gray-50"
                >
                  <p className="text-sm text-gray-700">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.date).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No notifications
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Mobile Sidebar Component
  const MobileSidebar = () => (
    <div className={`fixed inset-0 z-40 flex md:hidden transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="w-64 bg-white shadow-2xl z-50 h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">MediCare</h2>
              <p className="text-gray-500 text-xs">Patient Portal</p>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button
            onClick={() => handleOptionClick("profile")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${
              selectedOption === "profile"
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                : "text-gray-700 hover:bg-emerald-50"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            My Profile
          </button>

          <button
            onClick={() => handleOptionClick("appointment")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${
              selectedOption === "appointment"
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                : "text-gray-700 hover:bg-blue-50"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book Appointment
          </button>

          <button
            onClick={() => handleOptionClick("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${
              selectedOption === "dashboard"
                ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                : "text-gray-700 hover:bg-purple-50"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012 2h2a2 2 0 012-2" />
            </svg>
            My Appointments
          </button>
        </nav>

        <div className="p-4 text-center text-xs text-gray-500 border-t border-gray-200">
          <p className="font-medium">© 2025 MediCare</p>
          <p>Your health, our priority</p>
        </div>
      </div>
      <div 
        className="flex-1 bg-black bg-opacity-30"
        onClick={() => setSidebarOpen(false)}
      ></div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between bg-white p-4 shadow-md sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-800">MediCare</h1>
        </div>

        <div className="flex items-center gap-4">
          <NotificationBell />
          <button 
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 focus:outline-none"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-80 bg-white shadow-2xl border-r border-gray-100 p-8 flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">MediCare</h2>
                <p className="text-gray-500 text-sm">Patient Portal</p>
              </div>
            </div>
            <NotificationBell />
          </div>

          {/* Navigation */}
          <nav className="space-y-4">
            <button
              onClick={() => handleOptionClick("profile")}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                selectedOption === "profile"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl transform scale-105"
                  : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-md"
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              My Profile
            </button>

            <button
              onClick={() => handleOptionClick("appointment")}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                selectedOption === "appointment"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl transform scale-105"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md"
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Appointment
            </button>

            <button
              onClick={() => handleOptionClick("dashboard")}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                selectedOption === "dashboard"
                  ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-xl transform scale-105"
                  : "text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:shadow-md"
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012 2h2a2 2 0 012-2" />
              </svg>
              My Appointments
            </button>
          </nav>
        </div>

        <div className="text-center text-sm text-gray-500 pt-8 border-t border-gray-100">
          <p className="font-medium">© 2025 MediCare</p>
          <p>Your health, our priority</p>
        </div>
      </aside>

      {/* Content Section */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        {selectedOption === "profile" && <PatientProfile />}
        {selectedOption === "appointment" && <AppointmentForm />}
        {selectedOption === "dashboard" && <PatientDashboard />}
      </main>
    </div>
  );
};

export default PatientPage;
