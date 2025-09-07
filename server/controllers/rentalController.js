const RentalProperty = require("../models/RentalProperty");
const cloudinary = require("cloudinary").v2;

// Add a rental property
const addRental = async (req, res) => {
  try {
    const { title, location, price, description, area } = req.body;

    // get Cloudinary URLs from multer
    const imageUrls = req.files ? req.files.map(file => file.path) : [];

    const rental = new RentalProperty({
      title,
      location,
      price,
      description,
      area,
      image: imageUrls,  // ✅ Save array of URLs
      createdBy: req.user.id,
    });

    await rental.save();
    res.status(201).json({ message: "Property added successfully", rental });
  } catch (error) {
    console.error("Error adding rental:", error);
    res.status(500).json({ message: "Failed to add property", error });
  }
};

// Get available rentals
const getAvailableRentals = async (req, res) => {
  try {
    const rentals = await RentalProperty.find({ isRented: false });
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rentals", error: error.message });
  }
};

// Filter rentals
const filterRentals = async (req, res) => {
  try {
    const { location, minPrice, maxPrice } = req.query;
    let filter = {};

    if (location) filter.location = { $regex: location, $options: "i" };
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };

    const rentals = await RentalProperty.find(filter);
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ message: "Error filtering rentals", error: error.message });
  }
};

// Get rentals of logged-in user
const getUserRentals = async (req, res) => {
  try {
    const rentals = await RentalProperty.find({ createdBy: req.user.id });
    res.json(rentals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user rentals", error: error.message });
  }
};

// Update rental
const updateRental = async (req, res) => {
  try {
    const property = await RentalProperty.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // If new images uploaded, append them to existing ones
    if (req.files && req.files.length > 0) {
      const newImageUrls = req.files.map(file => file.path);
      property.image = [...property.image, ...newImageUrls]; // merge old + new
    }

    property.title = req.body.title || property.title;
    property.description = req.body.description || property.description;
    property.location = req.body.location || property.location;
    property.price = req.body.price || property.price;
    property.area = req.body.area || property.area;
    property.availableFrom = req.body.availableFrom || property.availableFrom;

    const updatedProperty = await property.save();
    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: "Error updating property", error: error.message });
  }
};
// Delete rental
const deleteRental = async (req, res) => {
  try {
    const property = await RentalProperty.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    console.log("Property.createdBy:", property.createdBy.toString());
    console.log("Logged in user:", req.user._id.toString());

    if (property.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        message: "Forbidden - You can only delete your own properties" 
      });
    }

    await property.deleteOne();
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting property", error: error.message });
  }
};



module.exports = {
  addRental,
  getAvailableRentals,
  filterRentals,
  getUserRentals,
  updateRental,
  deleteRental,
};
