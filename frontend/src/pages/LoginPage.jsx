import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../redux/actions/authActions"; // Import the correct thunk actions

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(false); // Toggle between Sign Up and Login
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    cpassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handling form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submission logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (isLogin) {
        // Login logic
        response = await dispatch(loginUser(formData.email, formData.password));
        if (response?.payload?._id) {
          const userId = response.payload._id;
          navigate(`/profile/${userId}`); // Redirect to profile page after login
        } else {
          console.error("Login failed: User ID not found.");
        }
      } else {
        // Registration logic
        if (formData.password !== formData.cpassword) {
          alert("Passwords do not match!");
          return;
        }

        const response = await dispatch(
          registerUser(
            formData.firstName,
            formData.lastName,
            formData.email,
            formData.phone,
            formData.password
          )
        );

        if (response?.payload?._id) {
          const userId = response.payload._id;
          navigate(`/profile/${userId}`); // Redirect to profile page after registration
        } else {
          console.error("Registration failed: User ID not found.");
        }
      }
    } catch (error) {
      console.error("Error during login/registration:", error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 font-sans bg-gradient-to-r from-[#e0e7ff] via-[#f4f4ff] to-white shadow-lg rounded-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-blue-600">
          {isLogin ? "Log In" : "Sign Up"}
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Conditional Form Fields */}
        {isLogin ? (
          <div className="space-y-4">
            <div>
              <label className="text-gray-700 text-sm mb-2 block">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="text-gray-700 text-sm mb-2 block">Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-700 text-sm mb-2 block">First Name</label>
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="text-gray-700 text-sm mb-2 block">Last Name</label>
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter last name"
              />
            </div>
            <div>
              <label className="text-gray-700 text-sm mb-2 block">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="text-gray-700 text-sm mb-2 block">Phone</label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter mobile number"
              />
            </div>
            <div>
              <label className="text-gray-700 text-sm mb-2 block">Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>
            <div>
              <label className="text-gray-700 text-sm mb-2 block">Confirm Password</label>
              <input
                name="cpassword"
                type="password"
                value={formData.cpassword}
                onChange={handleChange}
                className="w-full bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm password"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
