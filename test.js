var assert = require('assert');
var es = require('event-stream');
var File = require('vinyl');
var gulpFlexSvg = require('./index');
var fixture = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"50px\" height=\"50px\">\n  <rect width=\"50px\" height=\"50px\"></rect>\n</svg>";
var expected = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\">\n  <rect width=\"50px\" height=\"50px\"/>\n</svg>";
describe('gulp-flex-svg', (function() {
  describe('in buffer mode', (function() {
    it('should remove width and height attributes', (function(done) {
      var fakeFile = new File({contents: new Buffer(fixture)});
      var myFlexSvg = gulpFlexSvg();
      myFlexSvg.write(fakeFile);
      myFlexSvg.once('data', (function(file) {
        assert(file.isBuffer());
        assert.equal(file.contents.toString('utf8'), expected);
        done();
      }));
    }));
  }));
}));
