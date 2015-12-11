'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// `addon` schema
const AddonSchema = new Schema({
  name: String,
  title: String,
  description: String,
  imageUrl: { type: String,  default: '' },
  isEnabled: { type: Boolean, default: false },
  isPremium: { type: Boolean, default: false }
});

module.exports = mongoose.model('Addon', AddonSchema);
