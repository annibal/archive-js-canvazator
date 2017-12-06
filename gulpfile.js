var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var babel = require('gulp-babel');
var include = require('gulp-include');

var canvazatorFiles = [
  'src/main.js',
]

gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['dist']);
});

gulp.task('build:canvazator', ['clean'], function() {
  return gulp.src(canvazatorFiles)
    .pipe(sourcemaps.init())
      .pipe( include() )
        .on('error', console.log)
      .pipe(babel({
        "presets": [
          ["env", {
            "targets": {
              "browsers": ["last 2 versions", "safari >= 7"]
            }
          }]
        ]
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
