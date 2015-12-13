'use strict';

SHApp.Views.FeatureListView = Backbone.View.extend({

  initialize: function () {
    this.render();
  },

  render: function () {
    var features = this.model.models;
    var len = features.length;

    $(this.el).html('<div class="feature-list"></div>');

    for (var i = 0; i < len; i++) {
        $('.feature-list', this.el).append(new SHApp.Views.FeatureListItemView({model: features[i]}).render().el);
    }
    return this;
  }
});

SHApp.Views.FeatureListItemView = Backbone.View.extend({

  initialize: function () {
    this.model.bind("destroy", this.close, this);
  },

  events: {
    'click .checkbox input': 'toggleAddon'
  },

  toggleAddon: function (e) {
    var id = this.model.id;
    var isPremium = this.model.get('isPremium');

    if (!isPremium) {
      this.$('.panel').toggleClass('panel-default');
      this.$('.panel').toggleClass('panel-success');
      this.model.set('isEnabled', !this.model.get('isEnabled'));
      this.model.save();
    } else {
      // Send an email with request to enable feature
      this.sendEmail();
    }
  },

  getMetaData: function () {
    var data = {};
    var user = new SHApp.Models.UserModel();
    var account = new SHApp.Models.AccountModel();

    data['user'] = user.fetch();
    data['account'] = account.fetch();

    return data;
  },

  sendEmail: function () {

    var meta = this.getMetaData();
    var _this = this;

    $.when(meta['user']).then(function (data) {
      var userData = data;

      $.when(meta['account']).then(function (data) {
        var accountData = data;

        var html = [
          '<h2>Addon request by ' + userData.userName +'!</h2>',
          '<h3>Account</h3>',
          '<p class="account-name">name: ' + accountData.name + '</p>',
          '<p class="account-id">ID: ' + accountData._id + '</p>',
          '<h3>User</h3>',
          '<p class="user-name">username: ' + userData.userName + '</p>',
          '<p class="user-email">useremail: ' + userData.email + '</p>',
          '<h3>Addon</h3>',
          '<p class="addon-name">name: ' + _this.model.get('title') + '</p>',
          '<p class="addon-id">ID: ' + _this.model.get('_id') + '</p>',
        ].join('');

        // AJAX request to our server
        $.post('/api/emails/new', { emailBody: html }, function (data) {
          console.log('email has been sent');
        });
      });
    });
  },

  render: function () {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
});
