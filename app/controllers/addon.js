'use strict';

const Addon = require('../models/addon');

exports.getItems = (req, res) => {
  Addon.find((err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

exports.updateItem = (req, res) => {
  const currentItem = req.body;

  Addon.update({name: currentItem.name}, currentItem, {}, (err, item) => {
    if (err) {
      res.send(err)
    }
    res.json(item);
  });
};
