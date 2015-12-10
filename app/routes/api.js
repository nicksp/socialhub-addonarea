'use strict';

const Accounts = require('../models/accounts');
const config   = require('../../config');

module.exports = (app, express) => {

  const apiRouter = express.Router();

  // Test route to make sure everything is working (accessed at GET http://localhost:1330/api)
  apiRouter.get('/', (req, res) => {
    res.json({ message: 'welcome to our api!' });
  });

  // On routes that end in /accounts
  apiRouter.route('/accounts')

    // Get all the accounts (accessed at GET http://localhost:1330/api/accounts)
    .get((req, res) => {
      Accounts.find((err, data) => {
        if (err) {
          res.send(err);
        }
        // Return accounts
        res.json(data);
      });
    });

  return apiRouter;
};
