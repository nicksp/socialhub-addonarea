'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// `account` schema
const AccountSchema = new Schema({
  history: Array,
  tags: Array,
  features: Object,
  premiumFeatures: Object,
  name: String,
  locale: { type: String, default: 'de' }
});

module.exports = mongoose.model('Account', AccountSchema);
