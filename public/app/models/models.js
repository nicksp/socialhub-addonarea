'use strict';

SHApp.Models.AccountModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: '/api/accounts'
});

SHApp.Models.FeatureModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: '/api/features'
});

SHApp.Models.UserModel = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: '/api/users'
});

SHApp.Models.FeaturesCollection = Backbone.Collection.extend({
  model: SHApp.Models.FeatureModel,
  url: '/api/features'
});
