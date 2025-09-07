// controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};
// =============================
// 📌 Register Controller (Fixed)
// =============================
const register = async (req, res) => {
  console.log("✅ register controller hit");
  console.log("🧾 Registering:", req.body);
  console.log("📂 Uploaded files:", req.files);

  try {
    let {
      name,
      email,
      password,
      role,
      phone,
      address,
      companyName,
      taxId,
      bankAccount,
      yearsExperience,
      bio,
    } = req.body;

    // Normalize input
    email = email.trim().toLowerCase();
    password = password.trim();

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // 📤 Upload files to Cloudinary
    let profileImage = null;
    let governmentId = null;

    if (req.files?.profileImage?.[0]) {
      const result = await cloudinary.uploader.upload(
        req.files.profileImage[0].path,
        { folder: "landlordProfiles/profileImages" }
      );
      profileImage = result.secure_url;
    }

    if (req.files?.governmentId?.[0]) {
      const result = await cloudinary.uploader.upload(
        req.files.governmentId[0].path,
        { folder: "landlordProfiles/governmentIds" }
      );
      governmentId = result.secure_url;
    }

    // ✅ Pass raw password, Mongoose pre('save') will hash it
    const user = await User.create({
      name,
      email,
      password,
      role,
      phone,
      address,
      companyName,
      taxId,
      bankAccount,
      yearsExperience,
      bio,
      profileImage,
      governmentId,
    });

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        companyName: user.companyName,
        taxId: user.taxId,
        bankAccount: user.bankAccount,
        yearsExperience: user.yearsExperience,
        bio: user.bio,
        profileImage: user.profileImage,
        governmentId: user.governmentId,
      },
    });
  } catch (err) {
    console.error("❌ Error in register:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// =============================
// 📌 Login Controller (Updated)
// =============================
const login = async (req, res) => {
  console.log("✅ login controller hit");
  console.log("RAW BODY:", req.body);

  try {
    let { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Please provide email and password" });
    }

    // Normalize input
    email = email.trim().toLowerCase();
    password = password.trim();

    // Find user by email (include password for comparison)
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      console.warn(`❌ No user found with email: ${email}`);
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Debug logs
    console.log("📩 Email from request:", email);
    console.log("📩 Password entered:", `"${password}"`);
    console.log("📩 Hashed password in DB:", user.password);

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔍 Bcrypt compare result:", isMatch);

    if (!isMatch) {
      console.warn(`❌ Password mismatch for email: ${email}`);
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user);

    // Respond with user data
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        companyName: user.companyName,
        taxId: user.taxId,
        bankAccount: user.bankAccount,
        yearsExperience: user.yearsExperience,
        bio: user.bio,
        profileImage: user.profileImage,
        governmentId: user.governmentId,
      },
    });
  } catch (err) {
    console.error("❌ Error in login:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};


const registerLandlord = async (req, res) => {
  req.body.role = "landlord"; // Force landlord role
  return register(req, res);
};

// =============================
// 📌 Protect Middleware (fixed)
// =============================
const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token, access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ msg: "User not found, access denied" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("❌ Protect middleware error:", err);
    res.status(401).json({ msg: "Invalid token" });
  }
};

// =============================
// 📌 Update Landlord Profile
// =============================
const updateLandlordProfile = async (req, res) => {
  try {
    const landlord = await User.findById(req.user.id);
    if (!landlord) {
      return res.status(404).json({ msg: "Landlord not found" });
    }

    // Prepare update data
    const updateData = {
      name: req.body.name || landlord.name,
      phone: req.body.phone || landlord.phone,
      address: req.body.address || landlord.address,
      companyName: req.body.companyName || landlord.companyName,
      taxId: req.body.taxId || landlord.taxId,
      bankAccount: req.body.bankAccount || landlord.bankAccount,
      yearsExperience: req.body.yearsExperience || landlord.yearsExperience,
      bio: req.body.bio || landlord.bio,
    };

    // ✅ Upload new profileImage if provided
    if (req.files?.profileImage?.[0]) {
      const result = await cloudinary.uploader.upload(
        req.files.profileImage[0].path,
        { folder: "landlords/profileImages" } // 📂 Cloudinary folder
      );
      updateData.profileImage = result.secure_url;
    }

    // ✅ Upload new governmentId if provided
    if (req.files?.governmentId?.[0]) {
      const result = await cloudinary.uploader.upload(
        req.files.governmentId[0].path,
        { folder: "landlords/governmentIds" }
      );
      updateData.governmentId = result.secure_url;
    }

    // 🔄 Update landlord
    const updatedLandlord = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true }
    );

    res.json({
      msg: "Profile updated successfully",
      user: {
        id: updatedLandlord._id,
        name: updatedLandlord.name,
        email: updatedLandlord.email,
        phone: updatedLandlord.phone,
        address: updatedLandlord.address,
        companyName: updatedLandlord.companyName,
        taxId: updatedLandlord.taxId,
        bankAccount: updatedLandlord.bankAccount,
        yearsExperience: updatedLandlord.yearsExperience,
        bio: updatedLandlord.bio,
        profileImage: updatedLandlord.profileImage || null,
        governmentId: updatedLandlord.governmentId || null,
        role: updatedLandlord.role,
      },
    });
  } catch (err) {
    console.error("❌ Error updating landlord profile:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// =============================
// 📌 Get Landlord Profile
// =============================
const getLandlordProfile = async (req, res) => {
  try {
    const landlord = await User.findById(req.user.id);
    if (!landlord) {
      return res.status(404).json({ msg: "Landlord not found" });
    }
    res.json({ user: landlord });
  } catch (err) {
    console.error("❌ Error fetching landlord profile:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { register, login, registerLandlord, updateLandlordProfile, getLandlordProfile, protect };
