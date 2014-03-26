'use strict';

var through = require('through2');
var PluginError = require('gulp-util').PluginError;
var flexSvg = require('flex-svg');

const PLUGIN_NAME = 'gulp-flex-svg';

// Plugin level function (dealing with files)
module.exports = () => {
  
  // Creating a stream through which each file will pass
  let stream = through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      this.push(file); // Do nothing if no contents
      return cb();
    }

    if (file.isBuffer()) {
      flexSvg(file.contents, (err, result) => {
        file.contents = new Buffer(result);
        this.push(file);
        return cb();
      });
    }

    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }
  });

  // returning the file stream
  return stream;
};
