'use strict';

window.AccountModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: '/api/accounts'
});

window.FeatureModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: '/api/features'
});

window.UserModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: '/api/users'
});

window.FeaturesCollection = Backbone.Collection.extend({
  model: FeatureModel,
  url: '/api/features'
});
