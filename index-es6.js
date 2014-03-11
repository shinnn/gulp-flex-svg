'use strict';

var through = require('through2');
var PluginError = require('gulp-util').PluginError;
var flexSvg = require('flex-svg');

const PLUGIN_NAME = 'gulp-flex-svg';

// Plugin level function (dealing with files)
module.exports = () => {
  
  // Creating a stream through which each file will pass
  let stream = through.obj(function(file, enc, callback) {
    if (file.isNull()) {
      this.push(file); // Do nothing if no contents
      return callback();
    }

    if (file.isBuffer()) {
      flexSvg(file.contents, (err, result) => {
        file.contents = new Buffer(result);
        this.push(file);
        return callback();
      });
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return callback();
    }
  });

  // returning the file stream
  return stream;
};
