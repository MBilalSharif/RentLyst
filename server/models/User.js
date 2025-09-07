const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { genSalt, hash, compare } = bcrypt;

const userSchema = new Schema(
  {
    // Common fields
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['renter', 'admin', 'landlord'], required: true },

    // Landlord-specific fields
    phone: { type: String },
    address: { type: String },
    companyName: { type: String },
    taxId: { type: String },
    bankAccount: { type: String },
    yearsExperience: { type: String },
    bio: { type: String },
    profileImage: { type: String }, // store file path or URL
    governmentId: { type: String },   // store file path or URL
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

// Match password during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};





module.exports = mongoose.model('User', userSchema);
