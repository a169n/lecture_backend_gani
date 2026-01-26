const mongoose = require('mongoose');

// User schema for practice REST API.
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'member' },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
