const express = require("express");
const router = express.Router();
const { protect, landlordOnly } = require("../middleware/authMiddleware");
const {
  addProperty,
  getAllProperties,
  getPropertyById,
  deleteProperty,
  getFilteredProperties
} = require("../controllers/propertyController");

// GET all properties (with optional filters)
router.get("/", getFilteredProperties);

// POST new property (only landlord can add)
router.post("/", protect, landlordOnly, addProperty);

// GET single property by id
router.get("/:id", getPropertyById);

// DELETE property (only landlord can delete their own)
router.delete("/:id", protect, landlordOnly, deleteProperty);

module.exports = router;
