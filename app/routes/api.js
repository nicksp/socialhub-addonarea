'use strict';

const accountCtrl  = require('../controllers/account');
const addonCtrl    = require('../controllers/addon');
const userCtrl     = require('../controllers/user');
const emailCtrl    = require('../controllers/email');

module.exports = (app, express) => {

  const apiRouter = express.Router();

  // Test route to make sure everything is working (accessed at GET http://localhost:1330/api)
  apiRouter.get('/', (req, res) => {
    res.json({ message: 'welcome to our api!' });
  });

  // On routes that end in /emails/new
  apiRouter.route('/emails/new')
    .post(emailCtrl.sendEmail);

  // On routes that end in /accounts
  apiRouter.route('/accounts')
    .get(accountCtrl.getItem);

  // On routes that end in /users
  apiRouter.route('/users')
    .get(userCtrl.getItem);

  // On routes that end in /features
  apiRouter.route('/features')
    .get(addonCtrl.getItems);

  apiRouter.route('/features/:id')
    .put(addonCtrl.updateItem);

  return apiRouter;
};
