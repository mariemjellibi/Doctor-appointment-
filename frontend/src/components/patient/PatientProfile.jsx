// import { useDispatch, useSelector } from "react-redux";
// import { updateProfile } from '../../redux/actions/authActions';
// import { useEffect } from "react";
// import { useForm } from "react-hook-form";

// const PatientProfile = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth.user);

//   const { register, handleSubmit, reset, formState: { errors } } = useForm({
//     defaultValues: {
//       firstName: '',
//       lastName: '',
//       email: '',
//       phone: '',
//       password: ''
//     }
//   });

//   // Set default values when user data is available
//   useEffect(() => {
//     if (user) {
//       reset(user); // Populate form with user data
//     }
//   }, [user, reset]);

//   const onSubmit = async (data) => {
//     try {
//       await dispatch(updateProfile(data));
//       alert("Profile updated successfully");
//     } catch (error) {
//       alert("Failed to update profile");
//       console.error("Error updating profile:", error);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-10 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-2xl">
//     <h3 className="text-4xl font-bold text-blue-900 mb-10 text-center">Patient Profile</h3>
//     <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div>
//           <label className="block text-gray-700 text-md font-medium mb-1">First Name</label>
//           <input
//             {...register("firstName", { required: "First name is required" })}
//             className="w-full border border-gray-300 px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.firstName && <p className="text-sm text-red-600">{errors.firstName.message}</p>}
//         </div>
//         <div>
//           <label className="block text-gray-700 text-md font-medium mb-1">Last Name</label>
//           <input
//             {...register("lastName", { required: "Last name is required" })}
//             className="w-full border border-gray-300 px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.lastName && <p className="text-sm text-red-600">{errors.lastName.message}</p>}
//         </div>
//       </div>
  
//       <div>
//         <label className="block text-gray-700 text-md font-medium mb-1">Email</label>
//         <input
//           {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" } })}
//           className="w-full border border-gray-300 px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
//       </div>
  
//       <div>
//         <label className="block text-gray-700 text-md font-medium mb-1">Phone</label>
//         <input
//           {...register("phone", { required: "Phone number is required" })}
//           className="w-full border border-gray-300 px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
//       </div>
  
//       <div>
//         <label className="block text-gray-700 text-md font-medium mb-1">Password</label>
//         <input
//           type="password"
//           {...register("password")}
//           className="w-full border border-gray-300 px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
  
//       <button
//         type="submit"
//         className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-indigo-600 transition-all duration-300"
//       >
//         Save Changes
//       </button>
//     </form>
//   </div>
  
//   );
// };

// export default PatientProfile;



// PatientProfile.jsx - Same logic, better design
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
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-8 text-center">
        <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 className="text-4xl font-bold text-white mb-3">Patient Profile</h3>
        <p className="text-emerald-100 text-lg">Manage your personal information</p>
      </div>

      {/* Form */}
      <form className="p-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 mb-3">First Name</label>
            <input
              {...register("firstName", { required: "First name is required" })}
              className="w-full border-2 border-gray-200 px-5 py-4 rounded-2xl text-lg focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 focus:outline-none transition-all duration-300"
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm font-semibold mt-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700 mb-3">Last Name</label>
            <input
              {...register("lastName", { required: "Last name is required" })}
              className="w-full border-2 border-gray-200 px-5 py-4 rounded-2xl text-lg focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 focus:outline-none transition-all duration-300"
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm font-semibold mt-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <label className="block text-sm font-bold text-gray-700 mb-3">Email Address</label>
          <input
            {...register("email", { 
              required: "Email is required", 
              pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" } 
            })}
            className="w-full border-2 border-gray-200 px-5 py-4 rounded-2xl text-lg focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 focus:outline-none transition-all duration-300"
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm font-semibold mt-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mt-8">
          <label className="block text-sm font-bold text-gray-700 mb-3">Phone Number</label>
          <input
            {...register("phone", { required: "Phone number is required" })}
            className="w-full border-2 border-gray-200 px-5 py-4 rounded-2xl text-lg focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 focus:outline-none transition-all duration-300"
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm font-semibold mt-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="mt-8">
          <label className="block text-sm font-bold text-gray-700 mb-3">Password (Leave blank to keep current)</label>
          <input
            type="password"
            {...register("password")}
            className="w-full border-2 border-gray-200 px-5 py-4 rounded-2xl text-lg focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 focus:outline-none transition-all duration-300"
            placeholder="Enter new password (optional)"
          />
        </div>

        <div className="mt-12 text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 px-12 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transform transition-all duration-300 text-lg"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientProfile;