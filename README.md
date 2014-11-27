# gulp-flex-svg

[![Build Status](https://travis-ci.org/shinnn/gulp-flex-svg.svg?branch=master)](https://travis-ci.org/shinnn/gulp-flex-svg)
[![Build status](https://ci.appveyor.com/api/projects/status/7t6wot5vv49423h5?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/gulp-flex-svg)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/gulp-flex-svg.svg)](https://coveralls.io/r/shinnn/gulp-flex-svg)
[![Dependency Status](https://david-dm.org/shinnn/gulp-flex-svg.svg)](https://david-dm.org/shinnn/gulp-flex-svg)
[![devDependency Status](https://david-dm.org/shinnn/gulp-flex-svg/dev-status.svg)](https://david-dm.org/shinnn/gulp-flex-svg#info=devDependencies)

[flex-svg](https://github.com/shinnn/node-flex-svg) plugin for [gulp](https://github.com/gulpjs/gulp)

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px">
</svg>
```

↓

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<svg xmlns="http://www.w3.org/2000/svg">
</svg>
```

## Installation

[![NPM version](https://badge.fury.io/js/gulp-flex-svg.svg)](https://www.npmjs.org/package/gulp-flex-svg)

[Use npm.](https://www.npmjs.org/doc/cli/npm-install.html)

```sh
npm install --save-dev gulp-flex-svg
```

## API

```javascript
var flexSvg = require('gulp-flex-svg');
```

### flexSvg()

Return: `Object` ([stream.Transform](http://nodejs.org/docs/latest/api/stream.html#stream_class_stream_transform))

```javascript
var gulp = require('gulp');
var flexSvg = require('flex-svg');

gulp.task('default', function() {
  return gulp.src('src/**/*.svg')
    .pipe(flexSvg())
    .pipe(gulp.dest('dist'));
});
```

## License

Copyright (c) 2014 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
