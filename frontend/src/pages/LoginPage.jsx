import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../redux/actions/authActions";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(false); // Toggle between Sign Up and Login
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response;

      if (isLogin) {
        // Login logic
        response = await dispatch(loginUser(data.email, data.password));
        console.log(response);

        if (response?.payload?._id) {
          const userId = response.payload._id;
          if (response.payload.isDoctor) {
            navigate(`/doctor/`);
          } else {
            navigate(`/profile/${userId}`);
          }
        } else {
          console.error("Login failed: User ID not found.");
        }
      } else {
        // Registration logic
        if (data.password !== data.cpassword) {
          setError("cpassword", {
            type: "manual",
            message: "Passwords do not match!",
          });
          return;
        }

        response = await dispatch(
          registerUser(
            data.firstName,
            data.lastName,
            data.email,
            data.phone,
            data.password
          )
        );
        console.log("response", response);
        if (response?._id) {
          const userId = response._id;
          navigate(`/profile/${userId}`);
        } else {
          console.error("Registration failed: User ID not found.");
        }
      }
    } catch (error) {
      console.error("Error during login/registration:", error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-r from-[#FBFBFB] via-[#E8F9FF] to-[#C4D9FF] shadow-lg rounded-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-[#C5BAFF]">
          {isLogin ? "Log In" : "Sign Up"}
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#C5BAFF] hover:text-[#C4D9FF] font-semibold"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Conditional Form Fields */}
        {isLogin ? (
          <div className="space-y-4">
            <div>
              <label className="text-gray-700 text-sm mb-2 block">Email</label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C4D9FF]"
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>
            <div>
              <label className="text-gray-700 text-sm mb-2 block">Password</label>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C4D9FF]"
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-700 text-sm mb-2 block">First Name</label>
              <input
                {...register("firstName", { required: "First Name is required" })}
                type="text"
                className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C4D9FF]"
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">{errors.firstName.message}</span>
              )}
            </div>
            <div>
              <label className="text-gray-700 text-sm mb-2 block">Last Name</label>
              <input
                {...register("lastName", { required: "Last Name is required" })}
                type="text"
                className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C4D9FF]"
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm">{errors.lastName.message}</span>
              )}
            </div>
            <div>
              <label className="text-gray-700 text-sm mb-2 block">Email</label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C4D9FF]"
                placeholder="Enter email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>
            <div>
              <label className="text-gray-700 text-sm mb-2 block">Phone</label>
              <input
                {...register("phone", { required: "Phone is required" })}
                type="tel"
                className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C4D9FF]"
                placeholder="Enter mobile number"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone.message}</span>
              )}
            </div>
            <div>
              <label className="text-gray-700 text-sm mb-2 block">Password</label>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C4D9FF]"
                placeholder="Enter password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>
            <div>
              <label className="text-gray-700 text-sm mb-2 block">Confirm Password</label>
              <input
                {...register("cpassword", { required: "Confirm Password is required" })}
                type="password"
                className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C4D9FF]"
                placeholder="Confirm password"
              />
              {errors.cpassword && (
                <span className="text-red-500 text-sm">{errors.cpassword.message}</span>
              )}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="w-full py-3 px-6 bg-[#C5BAFF] text-white text-sm font-semibold rounded-lg hover:bg-[#C4D9FF] focus:outline-none focus:ring-2 focus:ring-[#C5BAFF] transition-all"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
