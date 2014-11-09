'use strict';

var assert = require('assert');

var File = require('vinyl');
var bufferStream = require('simple-bufferstream');

var gulpFlexSvg = require('./');

var fixture = [
  '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
  '<svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px">',
  '  <rect width="50px" height="50px"></rect>',
  '</svg>'
].join('\n');

var expected = [
  '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
  '<svg xmlns="http://www.w3.org/2000/svg">',
  '  <rect width="50px" height="50px"/>',
  '</svg>'
].join('\n');

describe('gulp-flex-svg', function() {
  describe('in buffer mode', function() {
    it('should remove width and height attributes', function(done) {
      gulpFlexSvg()
      .once('data', function(file) {
        assert(file.isBuffer());
        assert.equal(file.contents.toString('utf8'), expected);
        done();
      })
      .end(new File({contents: new Buffer(fixture)}));
    });

    it('should not modify an empty file.', function(done) {
      gulpFlexSvg()
      .once('data', function(file) {
        assert(file.isNull());
        done();
      })
      .end(new File());
    });

    it('should emit an error when it fails to parse SVG.', function(done) {
      gulpFlexSvg()
      .on('error', function(err) {
        assert.equal(err.plugin, 'gulp-flex-svg');
        assert.equal(
          err.message,
          'Unquoted attribute value\nLine: 0\nColumn: 8\nChar: 1'
        );
        assert.equal(err.fileName, 'bar/baz');
        done();
      })
      .end(new File({
        cwd: 'foo',
        path: 'bar/baz',
        contents: new Buffer('<svg f=1></svg>')
      }));
    });
  });

  describe('in stream mode', function() {
    it('should pass an plugin error', function(done) {
      gulpFlexSvg()
      .on('error', function(err) {
        assert.equal(err.plugin, 'gulp-flex-svg');
        assert.equal(err.message, 'Streaming not supported');
        done();
      })
      .end(new File({contents: bufferStream(fixture)}));
    });
  });
});
