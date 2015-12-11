'use strict';

const Account = require('../models/account');

exports.getItem = (req, res) => {
  Account.findOne({}, (err, users) => {
    if (err) {
      res.send(err)
    }
    if (users) {
      res.json(users);
    }
  });
};
