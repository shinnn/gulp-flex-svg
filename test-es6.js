var assert = require('assert');
var es = require('event-stream');
var File = require('vinyl');
var gulpFlexSvg = require('./index');

var fixture = `\
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px">
  <rect width="50px" height="50px"></rect>
</svg>`;

var expected =`\
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<svg xmlns="http://www.w3.org/2000/svg">
  <rect width="50px" height="50px"/>
</svg>`;

describe('gulp-flex-svg', () => {
  describe('in buffer mode', () => {

    it('should remove width and height attributes', (done) => {

      // create the fake file
      let fakeFile = new File({
        contents: new Buffer(fixture)
      });

      // Create a prefixer plugin stream
      let myFlexSvg = gulpFlexSvg();

      // write the fake file to it
      myFlexSvg.write(fakeFile);

      // wait for the file to come back out
      myFlexSvg.once('data', (file) => {
        // make sure it came out the same way it went in
        assert(file.isBuffer());

        // check the contents
        assert.equal(file.contents.toString('utf8'), expected);
        done();
      });

    });

  });
});