window.HeaderView = Backbone.View.extend({

  initialize: function () {
    this.render();
  },

  events: {
    'click .js-new-addon': 'simulateAddNewAddon'
  },

  simulateAddNewAddon: function () {
    if (Backbone.history.getFragment() !== 'features') {
      Backbone.trigger('addon:add')
    }
  },

  render: function () {
    $(this.el).html(this.template());
    return this;
  },
});
