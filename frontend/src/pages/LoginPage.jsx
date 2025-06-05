// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { loginUser, registerUser } from "../redux/actions/authActions";
// import { useForm } from "react-hook-form";
// //import { GoogleLogin } from "@react-oauth/google"; // Import GoogleLogin

// const LoginPage = () => {
//   const [isLogin, setIsLogin] = useState(false); // Toggle between Sign Up and Login
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       let response;

//       if (isLogin) {
//         // Login logic
//         response = await dispatch(loginUser(data.email, data.password));
//         console.log(response);

//         if (response?.payload?._id) {
//           const userId = response.payload._id;
//           if (response.payload.isDoctor) {
//             navigate(`/doctor/`);
//           } else {
//             navigate(`/profile/${userId}`);
//           }
//         } else {
//           console.error("Login failed: User ID not found.");
//         }
//       } else {
//         // Registration logic
//         if (data.password !== data.cpassword) {
//           setError("cpassword", {
//             type: "manual",
//             message: "Passwords do not match!",
//           });
//           return;
//         }

//         response = await dispatch(
//           registerUser(
//             data.firstName,
//             data.lastName,
//             data.email,
//             data.phone,
//             data.password
//           )
//         );
//         console.log("response", response);
//         if (response?._id) {
//           const userId = response._id;
//           navigate(`/profile/${userId}`);
//         } else {
//           console.error("Registration failed: User ID not found.");
//         }
//       }
//     } catch (error) {
//       console.error("Error during login/registration:", error.message);
//     }
//   };

//   // const handleGoogleLogin = async (response) => {
//   //   if (response.error) {
//   //     console.error("Google Login Error", response.error);
//   //   } else {
//   //     console.log("Google Login Success", response);
  
//   //     // Get the Google token from the response
//   //     const googleToken = response.credential;
  
//   //     if (googleToken) {
//   //       try {
//   //         // Send the token to your backend to verify and get user data
//   //         const res = await fetch("https://localhost:5005/api/auth/google", {
//   //           method: "POST",
//   //           headers: {
//   //             "Content-Type": "application/json",
//   //           },
//   //           body: JSON.stringify({ token: googleToken }),
//   //         });
  
//   //         const user = await res.json(); // Assuming the backend returns a user object
  
//   //         if (user && user._id) {
//   //           // After receiving the user data from the backend, navigate to the user's profile
//   //           navigate(`/profile/${user._id}`);
//   //         } else {
//   //           console.error("User ID not found after Google login.");
//   //         }
//   //       } catch (error) {
//   //         console.error("Error during Google token verification:", error);
//   //       }
//   //     } else {
//   //       console.error("No Google token received.");
//   //     }
//   //   }
//   // };
  
  

//   return (
//     <div className="max-w-lg mx-auto mt-30 p-8 bg-gradient-to-r from-[#569fe4] via-[#8094fb] to-[#a0c1ff] rounded-lg">
//       <div className="text-center mb-6">
//         <h1 className="text-3xl font-semibold text-[#000000]">
//           {isLogin ? "Log In" : "Sign Up"}
//         </h1>
//         <p className="text-sm text-gray-500 mt-2">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="text-[#000000] hover:text-[#C4D9FF] font-semibold"
//           >
//             {isLogin ? "Sign Up" : "Log In"}
//           </button>
//         </p>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         {/* Conditional Form Fields */}
//         {isLogin ? (
//           <div className="space-y-4">
//             <div>
//               <label className="text-gray-700 text-sm mb-2 block">Email</label>
//               <input
//                 {...register("email", { required: "Email is required" })}
//                 type="email"
//                 className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C4D9FF]"
//                 placeholder="Enter your email"
//               />
//               {errors.email && (
//                 <span className="text-red-500 text-sm">{errors.email.message}</span>
//               )}
//             </div>
//             <div>
//               <label className="text-gray-700 text-sm mb-2 block">Password</label>
//               <input
//                 {...register("password", { required: "Password is required" })}
//                 type="password"
//                 className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C4D9FF]"
//                 placeholder="Enter your password"
//               />
//               {errors.password && (
//                 <span className="text-red-500 text-sm">{errors.password.message}</span>
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className="grid sm:grid-cols-2 gap-6">
//             {/* Registration Form Fields */}
//             <div>
//               <label className="text-gray-700 text-sm mb-2 block">First Name</label>
//               <input
//                 {...register("firstName", { required: "First Name is required" })}
//                 className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C4D9FF]"
//                 placeholder="Enter your first name"
//               />
//             </div>
//             <div>
//               <label className="text-gray-700 text-sm mb-2 block">Last Name</label>
//               <input
//                 {...register("lastName", { required: "Last Name is required" })}
//                 className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C4D9FF]"
//                 placeholder="Enter your last name"
//               />
//             </div>
//             <div className="col-span-2">
//               <label className="text-gray-700 text-sm mb-2 block">Email</label>
//               <input
//                 {...register("email", { required: "Email is required" })}
//                 type="email"
//                 className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C4D9FF]"
//                 placeholder="Enter your email"
//               />
//               {errors.email && (
//                 <span className="text-red-500 text-sm">{errors.email.message}</span>
//               )}
//             </div>
//             <div>
//               <label className="text-gray-700 text-sm mb-2 block">Phone</label>
//               <input
//                 {...register("phone", { required: "Phone number is required" })}
//                 className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C4D9FF]"
//                 placeholder="Enter your phone number"
//               />
//             </div>
//             <div>
//               <label className="text-gray-700 text-sm mb-2 block">Password</label>
//               <input
//                 {...register("password", { required: "Password is required" })}
//                 type="password"
//                 className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C4D9FF]"
//                 placeholder="Enter your password"
//               />
//               {errors.password && (
//                 <span className="text-red-500 text-sm">{errors.password.message}</span>
//               )}
//             </div>
//             <div>
//               <label className="text-gray-700 text-sm mb-2 block">Confirm Password</label>
//               <input
//                 {...register("cpassword", { required: "Confirm Password is required" })}
//                 type="password"
//                 className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C4D9FF]"
//                 placeholder="Confirm your password"
//               />
//               {errors.cpassword && (
//                 <span className="text-red-500 text-sm">{errors.cpassword.message}</span>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Submit Button */}
//         <div className="mt-6 text-center">
//           <button
//             type="submit"
//             className="w-full py-3 px-6 bg-[#C5BAFF] text-white text-sm font-semibold rounded-lg hover:bg-[#C4D9FF] focus:outline-none focus:ring-2 focus:ring-[#C5BAFF] transition-all"
//           >
//             {isLogin ? "Log In" : "Sign Up"}
//           </button>
//         </div>
//       </form>

//       {/* Google Login Button */}
//       {/* <div className="mt-6">
//         <GoogleLogin
//           clientId="878359082505-hs6qbfbvf1hcqa0dbn3md6n1cvqn9hjv.apps.googleusercontent.com" // Replace with your Google client ID
//           buttonText="Login with Google"
//           onSuccess={handleGoogleLogin}
//           onFailure={handleGoogleLogin}
//           cookiePolicy={"single_host_origin"}
//         />
//       </div> */}
//     </div>
//   );
// };

// export default LoginPage;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../redux/actions/authActions";
import { useForm } from "react-hook-form";
import { Heart, Stethoscope, Shield, UserPlus, LogIn } from "lucide-react";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response;

      if (isLogin) {
        // Login logic
        response = await dispatch(loginUser(data.email, data.password));
        
        if (response?.payload?._id) {
          const userId = response.payload._id;
          if (response.payload.isDoctor) {
            navigate(`/doctor/`);
          } else {
            navigate(`/profile/${userId}`);
          }
        } else {
          console.error("Login failed: User ID not found.");
          setError("root", {
            type: "manual",
            message: "Invalid email or password",
          });
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
        
        if (response?._id) {
          const userId = response._id;
          navigate(`/profile/${userId}`);
        } else {
          console.error("Registration failed: User ID not found.");
          setError("root", {
            type: "manual",
            message: "Registration failed. Please try again.",
          });
        }
      }
    } catch (error) {
      console.error("Error during login/registration:", error.message);
      setError("root", {
        type: "manual",
        message: error.message || "An unexpected error occurred",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Stethoscope className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            MediCare Connect
          </h1>
          <p className="text-gray-600">
            Your trusted healthcare companion
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
          {/* Toggle Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              {isLogin ? (
                <LogIn className="w-6 h-6 text-blue-600 mr-2" />
              ) : (
                <UserPlus className="w-6 h-6 text-blue-600 mr-2" />
              )}
              <h2 className="text-2xl font-semibold text-gray-800">
                {isLogin ? "Welcome Back" : "Join Our Community"}
              </h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              {isLogin 
                ? "Access your healthcare dashboard" 
                : "Start your journey to better health"
              }
            </p>
            
            {/* Toggle Button */}
            <div className="flex items-center justify-center">
              <span className="text-sm text-gray-600">
                {isLogin ? "New to MediCare?" : "Already have an account?"}
              </span>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-blue-600 hover:text-blue-700 font-semibold text-sm underline-offset-4 hover:underline transition-all"
              >
                {isLogin ? "Create Account" : "Sign In"}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errors.root && (
            <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg text-center">
              {errors.root.message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Login Form */}
            {isLogin ? (
              <div className="space-y-5">
                <div>
                  <label className="text-gray-700 text-sm font-medium mb-2 block">
                    Email Address
                  </label>
                  <input
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    type="email"
                    className="w-full bg-gray-50 text-gray-800 p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="doctor@medicareconnect.com"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                
                <div>
                  <label className="text-gray-700 text-sm font-medium mb-2 block">
                    Password
                  </label>
                  <input
                    {...register("password", { 
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                    type="password"
                    className="w-full bg-gray-50 text-gray-800 p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your secure password"
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="ml-2 text-gray-600">Remember me</span>
                  </label>
                  <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                    Forgot password?
                  </button>
                </div>
              </div>
            ) : (
              /* Registration Form */
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-700 text-sm font-medium mb-2 block">
                      First Name
                    </label>
                    <input
                      {...register("firstName", { 
                        required: "First Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters"
                        }
                      })}
                      className="w-full bg-gray-50 text-gray-800 p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <span className="text-red-500 text-xs mt-1 block">
                        {errors.firstName.message}
                      </span>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-gray-700 text-sm font-medium mb-2 block">
                      Last Name
                    </label>
                    <input
                      {...register("lastName", { 
                        required: "Last Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters"
                        }
                      })}
                      className="w-full bg-gray-50 text-gray-800 p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <span className="text-red-500 text-xs mt-1 block">
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-gray-700 text-sm font-medium mb-2 block">
                    Email Address
                  </label>
                  <input
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    type="email"
                    className="w-full bg-gray-50 text-gray-800 p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="john.doe@email.com"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="text-gray-700 text-sm font-medium mb-2 block">
                    Phone Number
                  </label>
                  <input
                    {...register("phone", { 
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9+-\s()]{10,15}$/,
                        message: "Invalid phone number"
                      }
                    })}
                    className="w-full bg-gray-50 text-gray-800 p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-sm mt-1 block">
                      {errors.phone.message}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-700 text-sm font-medium mb-2 block">
                      Password
                    </label>
                    <input
                      {...register("password", { 
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters"
                        }
                      })}
                      type="password"
                      className="w-full bg-gray-50 text-gray-800 p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="••••••••"
                    />
                    {errors.password && (
                      <span className="text-red-500 text-xs mt-1 block">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-gray-700 text-sm font-medium mb-2 block">
                      Confirm Password
                    </label>
                    <input
                      {...register("cpassword", { 
                        required: "Please confirm your password",
                        validate: value => 
                          value === watch('password') || "Passwords do not match"
                      })}
                      type="password"
                      className="w-full bg-gray-50 text-gray-800 p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="••••••••"
                    />
                    {errors.cpassword && (
                      <span className="text-red-500 text-xs mt-1 block">
                        {errors.cpassword.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Terms and Privacy */}
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1" 
                    {...register("terms", { required: "You must accept the terms" })}
                  />
                  <div className="ml-3 text-sm text-gray-600">
                    I agree to the{' '}
                    <button type="button" className="text-blue-600 hover:underline">Terms of Service</button>
                    {' '}and{' '}
                    <button type="button" className="text-blue-600 hover:underline">Privacy Policy</button>
                  </div>
                </div>
                {errors.terms && (
                  <span className="text-red-500 text-sm block">
                    {errors.terms.message}
                  </span>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <div className="flex items-center justify-center">
                {isLogin ? (
                  <>
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In to Dashboard
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5 mr-2" />
                    Create Account
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-blue-600 mr-2" />
              <p className="text-sm text-blue-800">
                Your health data is protected with enterprise-grade encryption
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2024 MediCare Connect. All rights reserved.</p>
          <div className="flex items-center justify-center mt-2 space-x-4">
            <button className="hover:text-blue-600 transition-colors">Help Center</button>
            <span>•</span>
            <button className="hover:text-blue-600 transition-colors">Contact Support</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;