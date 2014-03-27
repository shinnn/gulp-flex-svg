'use strict';
var through = require('through2');
var PluginError = require('gulp-util').PluginError;
var flexSvg = require('flex-svg');
var PLUGIN_NAME = 'gulp-flex-svg';
module.exports = (function() {
  var stream = through.obj(function(file, enc, cb) {
    var $__0 = this;
    if (file.isNull()) {
      this.push(file);
      return cb();
    }
    if (file.isBuffer()) {
      flexSvg(file.contents, (function(err, result) {
        file.contents = new Buffer(result);
        $__0.push(file);
        return cb();
      }));
    }
    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }
  });
  return stream;
});
