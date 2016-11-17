var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var child = require('child_process');
var es = require('event-stream');

gulp.task('default', ['sass', 'js', 'jekyll:serve', 'sass:watch']);
gulp.task('build', ['sass', 'js', 'jekyll']);

gulp.task('sass', function() {
  return es.merge(
    gulp.src('./_css/norstone.scss')
      .pipe(sass({
        includePaths: [
          './_css',
          './bower_components/foundation-sites/scss',
          './bower_components/motion-ui/src',
          './bower_components/owl.carousel/src/scss'
        ],
        outputStyle: 'compressed'
      }).on('error', sass.logError)),
      gulp.src('./_css/landing.css')
    )
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./_css/**/*.scss', ['sass']);
});

gulp.task('js', function() {
  return gulp.src([
    './_js/jquery.js',
    './_js/what-input.js',
    './_js/foundation.js',
    './_js/owl.carousel.min.js',
    './_js/owl.carousel2.thumbs.js',
    './_js/norstone.js'
    ])
    .pipe(concat('norstone.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

gulp.task('jekyll', function() {
  const jekyll = child.spawn('jekyll', ['build']);

  const jekyllLogger = function(buffer) {
    buffer.toString()
      .split(/\n/)
      .forEach(function(message) {
        gutil.log('Jekyll: ' + message);
      });
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('jekyll:serve', function() {
  const jekyll = child.spawn('jekyll', ['serve']);

  const jekyllLogger = function(buffer) {
    buffer.toString()
      .split(/\n/)
      .forEach(function(message) {
        gutil.log('Jekyll: ' + message);
      });
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});
