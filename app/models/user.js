'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// `user` schema
const UserSchema = new Schema({
  accountId: mongoose.Schema.Types.ObjectId,
  lastName: String,
  firstName: String,
  role: String,
  email: String,
  userName: String
});

module.exports = mongoose.model('User', UserSchema);
