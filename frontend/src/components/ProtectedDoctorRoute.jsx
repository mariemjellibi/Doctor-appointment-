import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedDoctorRoute = () => {
  const { user, isDoctor } = useSelector((state) => state.auth);
console.log("user", user); // Check if the user has correct data

  console.log(user, isDoctor);

  // Check if the user is still loading or hasn't been set
  if (!user || user._id === null || !isDoctor) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedDoctorRoute;
