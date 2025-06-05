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
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-3xl">
    <h2 className="text-3xl font-semibold text-blue-800 mb-6 text-center">Book an Appointment</h2>
  
    <div className="space-y-5">
      <div>
        <label htmlFor="date" className="block text-gray-700 mb-1">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>
  
      <div>
        <label htmlFor="hour" className="block text-gray-700 mb-1">Hour</label>
        <input
          type="time"
          id="hour"
          name="hour"
          value={formData.hour}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>
  
      <div>
        <label htmlFor="status" className="block text-gray-700 mb-1">Status</label>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="status"
            name="status"
            checked={formData.status}
            onChange={handleChange}
            className="h-5 w-5 text-blue-600"
          />
          <span className="text-sm text-gray-600">{formData.status ? "Active" : "Inactive"}</span>
        </div>
      </div>
  
      <div>
        <label htmlFor="description" className="block text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>
  
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all"
      >
        Submit Appointment
      </button>
    </div>
  </form>
  
  );
};

export default AppointmentForm;
