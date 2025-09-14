const express = require("express");
const router = express.Router();
const {
  addRental,
  getAvailableRentals,
  filterRentals,
  getUserRentals,
  updateRental,
  deleteRental,
 
} = require("../controllers/rentalController");
const RentalProperty = require("../models/RentalProperty");

const { protect,landlordOnly } = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleMiddleware"); // import role middleware
const upload = require("../middleware/uploadMiddleware");

// Public Routes
router.get("/", getAvailableRentals);
router.get("/filter", filterRentals);


// Protected Routes (Landlord only)
router.post("/landlord-dashboard", protect, landlordOnly, addRental);
router.post("/", protect, landlordOnly, upload.array("image",5), addRental);
router.get("/my-properties", protect, landlordOnly, getUserRentals);
router.put("/:id", protect, landlordOnly, upload.array("image",5), updateRental);
router.delete("/:id", protect, landlordOnly, deleteRental);


router.get("/:id", async (req, res) => {
  try {
    const property = await RentalProperty.findById(req.params.id).populate("createdBy", "-password");
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
