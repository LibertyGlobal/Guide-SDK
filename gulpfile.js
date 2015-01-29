var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var karma = require('gulp-karma');
var header = require('gulp-header');
var rig = require('gulp-rigger');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var jsdoc2md = require('jsdoc-to-markdown');
var lazypipe = require('lazypipe');
var sequence = require('run-sequence');
var pkg = require('./package.json');

var banner = [
  '/**',
  ' * <%= pkg.title || pkg.name %> (<%= type %> version) - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''
].join('\n');


function build(type) {
  return lazypipe()
      .pipe(rig)
      .pipe(rename, { basename: 'lgi-guide-' + type.toLowerCase() })
      .pipe(header, banner, { pkg: pkg, type: type })
      .pipe(gulp.dest, 'dist')
      .pipe(uglify, { preserveComments: 'some', mangle: false })
      .pipe(rename, { suffix: '.min' })
      .pipe(gulp.dest, 'dist')();
}

gulp.task('clean', function () {
  return gulp.src('dist', { read: false })
      .pipe(clean());
});

gulp.task('lint', function () {
  return gulp.src('src/**/*.js')
      .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(jshint.reporter('fail'));
});

gulp.task('test', function () {
  return gulp.src('.dummy', { read: false })
      .pipe(plumber({ errorHandler: notify.onError('Unit tests failed') }))
      .pipe(karma({
        configFile: path.resolve('karma.conf.js'),
        action: 'run'
      }));
});

gulp.task('build-barebones', function () {
  return gulp.src('src/index-barebones.js')
      .pipe(build('Bare-bones'));
});

gulp.task('build-standalone', function () {
  return gulp.src('src/index-standalone.js')
      .pipe(build('Standalone'));
});

gulp.task('build-jquery', function () {
  return gulp.src('src/index-jquery.js')
      .pipe(build('jQuery'));
});

gulp.task('build-angular', function () {
  return gulp.src('src/index-angular.js')
      .pipe(build('Angular'));
});

gulp.task('build-plain', function () {
  return gulp.src('src/index.js')
      .pipe(rig())
      .pipe(gulp.dest('.tmp'));
});

gulp.task('build-all', [
  'build-barebones',
  'build-standalone',
  'build-jquery',
  'build-angular'
]);

gulp.task('default', function () {
  sequence('clean', 'lint', 'test', 'build-all', function () {});
});

gulp.task('watch', ['build-all'], function () {
  gulp.watch(['src/**/*.js', 'test/spec/**/*.js'], ['build-all']);
});

gulp.task('doc', ['build-plain'], function () {
  var src = '.tmp/index.js';
  var dest = '.tmp/doc.md';
  var options = {};

  gutil.log(gutil.colors.yellow('writing documentation to ' + dest));

  jsdoc2md.render(src , options)
      .on('error', function (error) {
        gutil.log(gutil.colors.red('jsdoc2md failed'), error.message);
      })
      .pipe(fs.createWriteStream(dest));
});
