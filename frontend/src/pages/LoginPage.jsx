import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../redux/actions/authActions";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "@react-oauth/google"; // Import GoogleLogin

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

  const handleGoogleLogin = async (response) => {
    if (response.error) {
      console.error("Google Login Error", response.error);
    } else {
      console.log("Google Login Success", response);
  
      // Get the Google token from the response
      const googleToken = response.credential;
  
      if (googleToken) {
        try {
          // Send the token to your backend to verify and get user data
          const res = await fetch("https://localhost:5005/api/auth/google", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: googleToken }),
          });
  
          const user = await res.json(); // Assuming the backend returns a user object
  
          if (user && user._id) {
            // After receiving the user data from the backend, navigate to the user's profile
            navigate(`/profile/${user._id}`);
          } else {
            console.error("User ID not found after Google login.");
          }
        } catch (error) {
          console.error("Error during Google token verification:", error);
        }
      } else {
        console.error("No Google token received.");
      }
    }
  };
  
  

  return (
    <div className="max-w-lg mx-auto mt-30 p-8 bg-gradient-to-r from-[#569fe4] via-[#8094fb] to-[#a0c1ff] rounded-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-[#000000]">
          {isLogin ? "Log In" : "Sign Up"}
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#000000] hover:text-[#C4D9FF] font-semibold"
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
            {/* Registration Form Fields */}
            <div>
              <label className="text-gray-700 text-sm mb-2 block">First Name</label>
              <input
                {...register("firstName", { required: "First Name is required" })}
                className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C4D9FF]"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label className="text-gray-700 text-sm mb-2 block">Last Name</label>
              <input
                {...register("lastName", { required: "Last Name is required" })}
                className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C4D9FF]"
                placeholder="Enter your last name"
              />
            </div>
            <div className="col-span-2">
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
              <label className="text-gray-700 text-sm mb-2 block">Phone</label>
              <input
                {...register("phone", { required: "Phone number is required" })}
                className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C4D9FF]"
                placeholder="Enter your phone number"
              />
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
            <div>
              <label className="text-gray-700 text-sm mb-2 block">Confirm Password</label>
              <input
                {...register("cpassword", { required: "Confirm Password is required" })}
                type="password"
                className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C4D9FF]"
                placeholder="Confirm your password"
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

      {/* Google Login Button */}
      <div className="mt-6">
        <GoogleLogin
          clientId="878359082505-hs6qbfbvf1hcqa0dbn3md6n1cvqn9hjv.apps.googleusercontent.com" // Replace with your Google client ID
          buttonText="Login with Google"
          onSuccess={handleGoogleLogin}
          onFailure={handleGoogleLogin}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
};

export default LoginPage;
