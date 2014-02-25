'use strict';

var through = require('through2');
var PluginError = require('gulp-util').PluginError;
var flexSvg = require('flex-svg');

// Consts
var PLUGIN_NAME = 'gulp-flex-svg';

// Plugin level function (dealing with files)
module.exports = function gulpFlexSvg() {
  
  // Creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, callback) {
    var self = this;
    
    if (file.isNull()) {
      self.push(file); // Do nothing if no contents
      return callback();
    }

    if (file.isBuffer()) {
      flexSvg(file.contents, function(err, result) {
        file.contents = new Buffer(result);
        self.push(file);
        return callback();
      });
    }

    if (file.isStream()) {
      self.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return callback();
    }
  });

  // returning the file stream
  return stream;
};
