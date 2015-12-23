var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var coffee = require('gulp-coffee');

gulp.task('sass', function(){
  gulp.src(['src/sass/**/*.sass','!src/sass/**/_*.sass'])
    .pipe(sass())
    .pipe(gulp.dest('public'));
});

gulp.task('coffee', function() {
  gulp.src(['src/coffee/**/*.coffee', '!src/coffee/**/_*.coffee'])
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('public'));
});

gulp.task('jade', ['sass', 'coffee'], function() {
  gulp.src(['src/jade/**/*.jade', '!src/jade/**/_*.jade'])
    .pipe(jade())
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
  gulp.watch('src/sass/**/*.sass', ['sass']);
  gulp.watch('src/coffee/**/*.coffee', ['coffee']);
  gulp.watch('src/jade/**/*.jade', ['jade']);
});

gulp.task('default', ['watch', 'sass', 'coffee', 'jade']);
