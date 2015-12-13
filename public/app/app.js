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
    this.listenTo(Backbone, 'addon:add', this.setBadgeCount);
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

  showBadgeCount: function (reset) {
    var addons = new FeaturesCollection();
    var _this = this;
    var lsKey = 'sh-new-addon-num';

    if (localStorage.getItem(lsKey) != null) {
      $('.badge').html(localStorage.getItem(lsKey));
      if (reset) {
        this.setBadgeCount('');
      }
      return;
    }

    addons.fetch({
      success: function (data) {
        $('.badge').html(data.length);
        localStorage.setItem(lsKey, data.length);
        if (reset) {
          _this.setBadgeCount('');
        }
      }
    });
  },

  setBadgeCount: function (num) {
    var $elem = $('.badge');
    var newCount = typeof num !== 'undefined' ? num : parseInt($elem.text() || 0, 10) + 1;

    $elem.text(newCount);
    localStorage.setItem('sh-new-addon-num', newCount);
  },

  updateHeaderMeta: function (reset) {
    this.showCurrentUser();
    this.showBadgeCount(reset);
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

    // At this point - no new addons. We see them all now at the screen.
    // Hence, reset its count in the badge.
    this.updateHeaderMeta(true);
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
