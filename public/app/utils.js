'use strict';

// App namespaces
var SHApp = SHApp || {};
SHApp.Models = SHApp.Models || {};
SHApp.Views = SHApp.Views || {};
SHApp.Utils = SHApp.Utils || {};

SHApp.Utils = {

  // Asynchronously load templates located in separate .html files
  loadTemplate: function (views, callback) {

    var deferreds = [];

    $.each(views, function(index, view) {
      if (SHApp.Views[view]) {
        deferreds.push($.get('app/templates/' + view + '.html', function(data) {
          SHApp.Views[view].prototype.template = _.template(data);
        }));
      }
    });

    $.when.apply(null, deferreds).done(callback);
  },

  displayValidationErrors: function (messages) {
    for (var key in messages) {
      if (messages.hasOwnProperty(key)) {
        this.addValidationError(key, messages[key]);
      }
    }
    this.showAlert('Warning!', 'Fix validation errors and try again', 'alert-warning');
  },

  addValidationError: function (field, message) {
    var controlGroup = $('#' + field).parent().parent();
    controlGroup.addClass('error');
    $('.help-inline', controlGroup).html(message);
  },

  removeValidationError: function (field) {
    var controlGroup = $('#' + field).parent().parent();
    controlGroup.removeClass('error');
    $('.help-inline', controlGroup).html('');
  },

  showAlert: function(title, text, klass) {
    $('.alert').removeClass('alert-error alert-warning alert-success alert-info');
    $('.alert').addClass(klass);
    $('.alert').html('<strong>' + title + '</strong> ' + text);
    $('.alert').show();
  },

  hideAlert: function() {
    $('.alert').hide();
  }
};
