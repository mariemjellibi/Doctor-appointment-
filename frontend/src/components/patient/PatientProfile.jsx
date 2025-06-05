import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from '../../redux/actions/authActions';
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const PatientProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: ''
    }
  });

  // Set default values when user data is available
  useEffect(() => {
    if (user) {
      reset(user); // Populate form with user data
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      await dispatch(updateProfile(data));
      alert("Profile updated successfully");
    } catch (error) {
      alert("Failed to update profile");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-10 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-2xl">
    <h3 className="text-4xl font-bold text-blue-900 mb-10 text-center">Patient Profile</h3>
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-gray-700 text-md font-medium mb-1">First Name</label>
          <input
            {...register("firstName", { required: "First name is required" })}
            className="w-full border border-gray-300 px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.firstName && <p className="text-sm text-red-600">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700 text-md font-medium mb-1">Last Name</label>
          <input
            {...register("lastName", { required: "Last name is required" })}
            className="w-full border border-gray-300 px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.lastName && <p className="text-sm text-red-600">{errors.lastName.message}</p>}
        </div>
      </div>
  
      <div>
        <label className="block text-gray-700 text-md font-medium mb-1">Email</label>
        <input
          {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" } })}
          className="w-full border border-gray-300 px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>
  
      <div>
        <label className="block text-gray-700 text-md font-medium mb-1">Phone</label>
        <input
          {...register("phone", { required: "Phone number is required" })}
          className="w-full border border-gray-300 px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
      </div>
  
      <div>
        <label className="block text-gray-700 text-md font-medium mb-1">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full border border-gray-300 px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-600 transition-all duration-300"
      >
        Save Changes
      </button>
    </form>
  </div>
  
  );
};

export default PatientProfile;