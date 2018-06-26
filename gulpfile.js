var gulp = require('gulp'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import'),
    browserSync = require('browser-sync').create();



gulp.task('css', function() {
  return gulp.src('./source/css/main.css')
  .pipe(postcss([cssImport,cssvars, nested, autoprefixer]))

  .on('error', function (errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
  })

  .pipe(gulp.dest('./build/assets/css'));
});


gulp.task('watch', function() {

  browserSync.init({
    server: {
      baseDir: 'build'
    }, notify: false
  });

  watch('./build/index.html', function() {
    console.log('something happened');
    browserSync.reload();
  });

  watch('./source/css/**/*.css', function() {
    gulp.start('cssInject');
  });
});

gulp.task('default', [ 'css', 'cssInject', 'watch'], function () {});


gulp.task('cssInject', ['css'], function () {
    return gulp.src('./build/assets/css/main.css')
        .pipe(browserSync.stream());
});
