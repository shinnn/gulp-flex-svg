# gulp-flex-svg

[![NPM version](https://img.shields.io/npm/v/gulp-flex-svg.svg)](https://www.npmjs.com/package/gulp-flex-svg)
[![Build Status](https://travis-ci.org/shinnn/gulp-flex-svg.svg?branch=master)](https://travis-ci.org/shinnn/gulp-flex-svg)
[![Build status](https://ci.appveyor.com/api/projects/status/7t6wot5vv49423h5?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/gulp-flex-svg)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/gulp-flex-svg.svg)](https://coveralls.io/r/shinnn/gulp-flex-svg)
[![Dependency Status](https://img.shields.io/david/shinnn/gulp-flex-svg.svg?label=deps)](https://david-dm.org/shinnn/gulp-flex-svg)
[![devDependency Status](https://img.shields.io/david/dev/shinnn/gulp-flex-svg.svg?label=devDeps)](https://david-dm.org/shinnn/gulp-flex-svg#info=devDependencies)

[flex-svg](https://github.com/shinnn/node-flex-svg) plugin for [gulp](http://gulpjs.com/)

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

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install --save-dev gulp-flex-svg
```

## API

```javascript
const flexSvg = require('gulp-flex-svg');
```

### flexSvg([*options*])

*options*: `Object` (directly passed to the [xml2js.Parser](https://github.com/Leonidas-from-XIV/node-xml2js#options) options and the [xml2js.Builder](https://github.com/Leonidas-from-XIV/node-xml2js#options-for-the-builder-class) options)  
Return: `Object` ([stream.Transform](https://nodejs.org/docs/latest/api/stream.html#stream_class_stream_transform))

```javascript
const gulp = require('gulp');
const flexSvg = require('flex-svg');

gulp.task('default', () => {
  return gulp.src('src/**/*.svg')
    .pipe(flexSvg())
    .pipe(gulp.dest('dist'));
});
```

## License

Copyright (c) 2014 - 2015 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
