const checkDoctor = (req, res, next) => {
    // Ensure req.user exists
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
  
    // Check if the user is a doctor
    if (!req.user.isDoctor) {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this route" });
    }
  
    // If the user is a doctor, allow the request to proceed
    next();
  };
  
  export default checkDoctor;
  