'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// `accounts` schema
const AccountsSchema = new Schema({
  features: Object,
  premiumFeatures: Object
});

module.exports = mongoose.model('Accounts', AccountsSchema);
