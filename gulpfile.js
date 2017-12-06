var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var canvazatorFiles = [
  'src/**/*.*',
]

gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['dist']);
});

gulp.task('build:canvazator', ['clean'], function() {
  return gulp.src(canvazatorFiles)
    .pipe(sourcemaps.init())
      .pipe(babel({
          presets: ['env']
      }))
      .pipe(uglify())
      .pipe(concat('canvazator.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch:canvazator', function() {
  gulp.watch(canvazatorFiles, ['build:canvazator']);
})

gulp.task('default', ['watch:canvazator']);
