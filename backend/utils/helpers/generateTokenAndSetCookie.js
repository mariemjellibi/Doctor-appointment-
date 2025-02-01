import jwt from "jsonwebtoken";
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, //to prevent the client side javascript from accessing the cookie
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
  sameSite: 'None', // Required for cross-origin cookies
  });
  return token;
};

export default generateTokenAndSetCookie;
