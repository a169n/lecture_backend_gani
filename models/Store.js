const mongoose = require('mongoose');

// Store schema for practice REST API.
const storeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    link: { type: String },
    isPrivate: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Store', storeSchema);
