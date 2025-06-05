// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import {createAppointment} from "/src/redux/actions/appointmentActions"
// const AppointmentForm = () => {

//   const dispatch = useDispatch(); 
//   const [formData, setFormData] = useState({
//     date: "",
//     hour: "",
//     status: true, // Default to true
//     description: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Appointment Data:", formData);
    
//     try {
//       await dispatch(createAppointment(formData))
//       .then(()=>alert("Appointment created successfully")); // ✅ Dispatch the action
//       console.log("Appointment created successfully");
//       setFormData({
//         date: "",
//         hour: "",
//         status: true,
//         description: "",
//       });
//     } catch (error) {
//       console.error("Error creating appointment:", error);
//     }
//   };


//   return (
//     <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-3xl">
//     <h2 className="text-3xl font-semibold text-blue-800 mb-6 text-center">Book an Appointment</h2>
  
//     <div className="space-y-5">
//       <div>
//         <label htmlFor="date" className="block text-gray-700 mb-1">Date</label>
//         <input
//           type="date"
//           id="date"
//           name="date"
//           value={formData.date}
//           onChange={handleChange}
//           required
//           className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//         />
//       </div>
  
//       <div>
//         <label htmlFor="hour" className="block text-gray-700 mb-1">Hour</label>
//         <input
//           type="time"
//           id="hour"
//           name="hour"
//           value={formData.hour}
//           onChange={handleChange}
//           required
//           className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//         />
//       </div>
  
//       <div>
//         <label htmlFor="status" className="block text-gray-700 mb-1">Status</label>
//         <div className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             id="status"
//             name="status"
//             checked={formData.status}
//             onChange={handleChange}
//             className="h-5 w-5 text-blue-600"
//           />
//           <span className="text-sm text-gray-600">{formData.status ? "Active" : "Inactive"}</span>
//         </div>
//       </div>
  
//       <div>
//         <label htmlFor="description" className="block text-gray-700 mb-1">Description</label>
//         <textarea
//           id="description"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           rows={4}
//           className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//         />
//       </div>
  
//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all"
//       >
//         Submit Appointment
//       </button>
//     </div>
//   </form>
  
//   );
// };

// export default AppointmentForm;


// AppointmentForm.jsx - Same logic, better design
import { useState } from "react";
import { useDispatch } from "react-redux";
import {createAppointment} from "/src/redux/actions/appointmentActions"

const AppointmentForm = () => {
  const dispatch = useDispatch(); 
  const [formData, setFormData] = useState({
    date: "",
    hour: "",
    status: true, // Default to true
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Appointment Data:", formData);
    
    try {
      await dispatch(createAppointment(formData))
      .then(()=>alert("Appointment created successfully")); // ✅ Dispatch the action
      console.log("Appointment created successfully");
      setFormData({
        date: "",
        hour: "",
        status: true,
        description: "",
      });
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-8 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Book Your Appointment</h2>
        <p className="text-blue-100">Schedule your next medical consultation</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm font-bold text-gray-700 mb-3">
              Select Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 text-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="hour" className="block text-sm font-bold text-gray-700 mb-3">
              Select Time
            </label>
            <div className="relative">
              <input
                type="time"
                id="hour"
                name="hour"
                value={formData.hour}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 text-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <label htmlFor="status" className="block text-sm font-bold text-gray-700 mb-4">
            Appointment Status
          </label>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border-2 border-gray-200">
            <input
              type="checkbox"
              id="status"
              name="status"
              checked={formData.status}
              onChange={handleChange}
              className="h-6 w-6 text-blue-600 rounded-lg focus:ring-blue-500 border-2 border-gray-300"
            />
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${formData.status ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-lg font-semibold text-gray-700">
                {formData.status ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-3">
            Reason for Visit
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Please describe your symptoms or reason for the appointment..."
            className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 text-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all duration-300 resize-none"
          />
        </div>

        <div className="mt-10 text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-12 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transform transition-all duration-300 text-lg"
          >
            Schedule Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;

