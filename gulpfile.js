var gulp = require('gulp');
var sass = require('gulp-sass');
var child = require('child_process');
var gutil = require('gulp-util');

gulp.task('default', ['sass', 'jekyll', 'sass:watch']);

gulp.task('sass', function () {
  return gulp.src('./_css/norstone.scss')
    .pipe(sass({
      includePaths: [
        './_css',
        './bower_components/foundation-sites/scss',
        './bower_components/motion-ui/src',
        './bower_components/owl.carousel/src/scss'
      ]
    }).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./_css/**/*.scss', ['sass']);
});

gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['serve']);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});
