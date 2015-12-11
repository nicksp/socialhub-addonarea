'use strict';

var AppRouter = Backbone.Router.extend({

  routes: {
    '(/)'         : 'home',
    'features(/)' : 'list',
    'about(/)'    : 'about'
  },

  initialize: function () {
    this.headerView = new HeaderView();
    $('.header').html(this.headerView.el);
  },

  getCurrentUser: function () {
    var user = new UserModel();
    return user.fetch();
  },

  showCurrentUser: function () {
    var userData = this.getCurrentUser();
    $.when(userData).then(function (user) {
      $('.user-name').html(user.firstName + ' ' + user.lastName + ' (' + user.email + ')');
    });
  },

  showBadgeCount: function () {
    var addons = new FeaturesCollection();
    addons.fetch({
      success: function (data) {
        $('.badge').html(data.length);
      }
    });
  },

  updateHeaderMeta: function () {
    this.showCurrentUser();
    this.showBadgeCount();
  },

  home: function () {
    if (!this.homeView) {
      this.homeView = new HomeView();
    }

    $('#content').html(this.homeView.el);
    this.updateHeaderMeta();
  },

  list: function (id) {
    var _this = this;

    var p = id ? parseInt(id, 10) : 1;
    var featureList = new FeaturesCollection();
    featureList.fetch({
      success: function (data) {
        $('#content').html(new FeatureListView({ model: featureList }).el);
      }
    });
    this.updateHeaderMeta();
  },

  getFeatureList: function (data) {
    var features = data.models[0].get('features');
    var premiumFeatures = data.models[0].get('premiumFeatures');
    var featureMap = {};

    for (var attr in features) {
      featureMap[attr] = {};
      featureMap[attr].isPremium = false;
      featureMap[attr].isEnabled = features[attr];
      featureMap[attr].title = 'test title';
      featureMap[attr].description = 'test description';
    }

    for (var attr in premiumFeatures) {
      featureMap[attr] = {};
      featureMap[attr].isPremium = true;
      featureMap[attr].isEnabled = premiumFeatures[attr];
      featureMap[attr].title = 'test premium title';
      featureMap[attr].description = 'test premium description';
    }
    return featureMap;
  },

  renderFeatures: function (data) {
    var features = this.getFeatureList(data);
    $('#content').html(new FeatureListView({ model: features }).el);
  },

  about: function () {
    if (!this.aboutView) {
      this.aboutView = new AboutView();
    }
    $('#content').html(this.aboutView.el);
    this.updateHeaderMeta();
  }
});

// Bootstrap app
utils.loadTemplate(['HomeView', 'HeaderView', 'FeatureView', 'FeatureListItemView', 'AboutView'], function () {
  var appRouter = new AppRouter();
  Backbone.history.start({ pushState: false });
});
