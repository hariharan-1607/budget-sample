const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get token from Authorization header (format: "Bearer <token>" or just "<token>")
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Extract token (handle both "Bearer <token>" and just "<token>" formats)
  const token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
