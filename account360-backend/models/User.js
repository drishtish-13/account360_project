const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  resetPasswordToken: { type: String },            // ✅ Optional: store hashed reset token (optional for enhanced security)
  resetPasswordExpires: { type: Date },            // ✅ Optional: token expiry (if you want to store expiry in DB)
});

module.exports = mongoose.model('User', UserSchema);
