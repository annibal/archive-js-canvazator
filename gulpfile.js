var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var babel = require('gulp-babel');
var include = require('gulp-include');
var gulpSequence = require('gulp-sequence');

var files = {
  canvazatorMain:"src/main.js",
  sourceAll:"src/**/*.js"
}

gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['dist']);
});

gulp.task('build:dist', function() {
  return gulp.src(files.canvazatorMain)
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
gulp.task('build:dev', function() {
  return gulp.src(files.canvazatorMain)
    .pipe(include())
      .on('error', console.log)
    .pipe(concat('canvazator.js'))
    .pipe(gulp.dest('dist'));
})

gulp.task('watch', function() {
  gulp.watch(files.sourceAll, function() {
    gulpSequence('clean', 'build:dev')(function(err) {
      if (err) console.log(err);
    })
  });
})

gulp.task('build', function() {
  gulpSequence('clean', 'build:dev', 'build:dist')(function(err) {
    if (err) console.log(err);
  })
})

gulp.task('default', function() {
  gulpSequence('build', 'watch')(function(err) {
    if (err) console.log(err);
  });
})
