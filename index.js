/*!
 * gulp-flex-svg | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/gulp-flex-svg
*/
'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError.bind(gutil, 'gulp-flex-svg');
var flexSvg = require('flex-svg');

module.exports = function gulpFlexSvg() {
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new PluginError('Streaming not supported'));
      return;
    }

    flexSvg(file.contents, function(err, result) {
      if (err) {
        cb(new PluginError(err, {fileName: file.path}));
        return;
      }

      file.contents = new Buffer(result);
      this.push(file);
    }.bind(this));
  });
};
