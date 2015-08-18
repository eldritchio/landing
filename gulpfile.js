var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');

gulp.task('sass', function(){
  gulp.src(['src/sass/**/*.sass','!src/sass/**/_*.sass'])
    .pipe(sass())
    .pipe(gulp.dest('./'));
});

gulp.task('jade', ['sass'], function() {
  gulp.src(['src/jade/**/*.jade', '!src/jade/**/_*.jade'])
    .pipe(jade())
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  gulp.watch('src/sass/**/*.sass', ['sass']);
  gulp.watch('src/jade/**/*.jade', ['jade']);
});

gulp.task('default', ['watch', 'sass', 'jade']);
