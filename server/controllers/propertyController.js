const Property = require('../models/Property');

// Create new property
const createProperty = async (req, res) => {
  try {
    const { title, description, location, price, area, image } = req.body;
    const newProperty = await Property.create({
      title,
      description,
      location,
      price,
      area,
      image: req.file ? `/upload/${req.file.filename}` : null,
      createdBy: req.user.id
    });
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ msg: 'Error creating property', error: error.message });
  }
};
// const Property = require('../models/Property');

// 🧾 GET /api/properties?location=&minPrice=&maxPrice=&area=
const getFilteredProperties = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, area } = req.query;

    const filter = {};
    if (location) filter.location = location;
    if (area) filter.area = area;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(filter);
    res.json(properties);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// 🧾 POST /api/properties (Protected)
const addProperty = async (req, res) => {
  try {
    const newProperty = new Property({ ...req.body, createdBy: req.user.id });
    const saved = await newProperty.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};



// Get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('createdBy', 'name email');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching properties', error: error.message });
  }
};

// Get property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ msg: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching property', error: error.message });
  }
};

// Delete property (only owner can delete)
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ msg: 'Property not found' });

    if (property.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized to delete this property' });
    }

    await property.deleteOne();
    res.json({ msg: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting property', error: error.message });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  deleteProperty,
  getFilteredProperties,
  addProperty
};
