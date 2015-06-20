/*!
 * gulp-flex-svg | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/gulp-flex-svg
*/
'use strict';

var FlexSvg = require('flex-svg').FlexSvg;
var PluginError = require('gulp-util').PluginError;
var Transform = require('readable-stream/transform');
var VinylBufferStream = require('vinyl-bufferstream');

module.exports = function gulpFlexSvg(options) {
  var flexSvg = new FlexSvg(options);
  var run = new VinylBufferStream(function(buf, done) {
    flexSvg(buf, function(err, result) {
      if (err) {
        done(err);
        return;
      }
      done(null, new Buffer(result));
    });
  });

  return new Transform({
    objectMode: true,
    transform: function(file, enc, cb) {
      var self = this;

      run(file, function(err, contents) {
        if (err) {
          self.emit('error', new PluginError('gulp-flex-svg', err, {fileName: file.path}));
        } else {
          file.contents = contents;
          self.push(file);
        }
        cb();
      });
    }
  });
};
