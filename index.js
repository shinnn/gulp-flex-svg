/*!
 * gulp-flex-svg | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/gulp-flex-svg
*/
'use strict';

var BufferStreams = require('bufferstreams');
var FlexSvg = require('flex-svg').FlexSvg;
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var through = require('through2');

module.exports = function gulpFlexSvg(options) {
  var flexSvg = new FlexSvg(options);

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    var self = this;

    function run(buf, done) {
      flexSvg(buf, function(err, result) {
        if (err) {
          err.fileName = file.path;
          done(new PluginError('gulp-flex-svg', err));
          return;
        }
        done(null, new Buffer(result));
      });
    }

    if (file.isStream()) {
      file.contents = file.contents.pipe(new BufferStreams(function(none, buf, done) {
        run(buf, function(err, contents) {
          if (err) {
            self.emit('error', err);
            done(err);
          } else {
            done(null, contents);
            self.push(file);
          }
          cb();
        });
      }));
      return;
    }

    run(file.contents, function(err, contents) {
      if (err) {
        self.emit('error', err);
      } else {
        file.contents = contents;
        self.push(file);
      }
      cb();
    });
  });
};
