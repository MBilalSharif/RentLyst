// middleware/roleMiddleware.js
const roleCheck = (requiredRole) => {
  return (req, res, next) => {
    // req.user is already set by your authMiddleware (JWT)
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: "Access denied: insufficient permissions" });
    }

    next();
  };
};

module.exports = roleCheck;
