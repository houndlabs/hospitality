(function() {

  window.hospitality = {};

  // - cross browser each/extend implementation

  var each = function(obj, iterator, context) {
    if (obj == null) return;
    if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = [];
      for (var key in obj) if (_.has(obj, key)) keys.push(key);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
  };

  var extend = function(obj) {
    each(Array.prototype.slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // ----

  var now = function() {
    return (new Date()).getTime();
  }

  var get_cookie = function () {
    return document.cookie.replace(
      new RegExp("(?:(?:^|.*;)\\s*" + default_settings.unique.replace(
        /[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"),
      "$1") || null;
  };

  var set_cookie = function() {
    console.log(default_settings.unique + '=' + (new Date()).getTime() +
      "; path='/'; domain=." +
      window.location.hostname.split('.').slice(-2).join('.'));
    document.cookie = default_settings.unique + '=' + now() +
      "; path='/'; domain=" + default_settings.domain;
  };

  var default_settings = {
    unique: '_ret',
    visit: {
      'new': null,
      'return': null
    },
    // No matter how many times someone visits, they need to wait Xms
    // until they're "returning". The default is 1hr.
    wait: 1000 * 60 * 60,
    domain: window.location.hostname
  };

  window.hospitality.init = function(settings) {
    extend(default_settings, settings);

    var last_visit = get_cookie();

    // -- If there isn't a cookie set yet, they're not a returning visitor.
    if (!last_visit) {
      set_cookie();
      if (default_settings.visit.new) { default_settings.visit.new(); }
      return
    }

    if (now() - parseInt(last_visit) > default_settings.wait &&
      default_settings.visit.return) {
      settings.visit.return();
    }
  };

})();
