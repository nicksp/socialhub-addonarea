'use strict';

const User = require('../models/user');

exports.getItem = (req, res) => {
  User.findOne({}, (err, users) => {
    if (err) {
      res.send(err)
    }
    if (users) {
      res.json(users);
    }
  });
};
