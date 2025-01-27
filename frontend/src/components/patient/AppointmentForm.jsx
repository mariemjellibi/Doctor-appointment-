import { useState } from "react";

const AppointmentForm = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Data:", formData);
    // You can add your logic here to send the data to the backend
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>
      
      {/* Date */}
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      
      {/* Hour */}
      <div className="mb-4">
        <label htmlFor="hour" className="block text-gray-700 font-medium mb-2">Hour</label>
        <input
          type="time"
          id="hour"
          name="hour"
          value={formData.hour}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      
      {/* Status */}
      <div className="mb-4">
        <label htmlFor="status" className="block text-gray-700 font-medium mb-2">Status</label>
        <input
          type="checkbox"
          id="status"
          name="status"
          checked={formData.status}
          onChange={handleChange}
          className="mr-2"
        />
        <span>{formData.status ? "Active" : "Inactive"}</span>
      </div>
      
      {/* Description */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          placeholder="Provide additional details..."
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      
      {/* Submit Button */}
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
        Book Appointment
      </button>
    </form>
  );
};

export default AppointmentForm;
