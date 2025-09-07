const mongoose = require('mongoose');

const rentalPropertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    area: { type: String, required: true },

    // Store image filename (saved locally in /uploads folder)
    image: [{ type: String }],

    availableFrom: { type: Date, default: Date.now },
    isRented: { type: Boolean, default: false },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('RentalProperty', rentalPropertySchema);
