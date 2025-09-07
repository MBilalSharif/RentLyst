const express = require('express');
const router = express.Router();



const { protect} = require('../middleware/authMiddleware');
const User = require('../models/User');
const upload = require('../middleware/uploadMiddleware');

// Controllers
const { 
  register, 
  registerLandlord, 
  login, 
  updateLandlordProfile,
  getLandlordProfile,
} = require('../controllers/authController');



/**
 * @route   POST /api/auth/register-landlord
 * @desc    Register a new landlord with profile image upload
 * @access  Public
 */
router.post(
  '/register-landlord',
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'governmentId', maxCount: 1 }
  ]),
  registerLandlord
);

/**
 * @route   POST /api/auth/register
 * @desc    Register a standard user
 * @access  Public
 */
router.post('/register', (req, res, next) => {
  console.log("✅ /register route hit");
  next();
}, register);

/**
 * @route   POST /api/auth/login
 * @desc    User login
 * @access  Public
 */



router.post('/login', login);

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged-in user
 * @access  Private
 */





router.get('/me', protect, (req, res) => {
  res.json({ msg: 'Authenticated route', user: req.user });
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/landlord/profile", protect, getLandlordProfile);
router.put("/landlord/profile", protect, upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "governmentId", maxCount: 1 },
]), updateLandlordProfile);


module.exports = router;
