'use strict';

var through = require('through2');
var {PluginError} = require('gulp-util');
var flexSvg = require('flex-svg');

module.exports = () => {
  // Create and return a stream through which each file will pass
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
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
      return cb(new PluginError('gulp-flex-svg', 'Streaming not supported'));
    }
  });
};
