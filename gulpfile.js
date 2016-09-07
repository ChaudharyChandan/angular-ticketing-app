var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concatCss = require('gulp-concat-css'),
	del = require('del');

gulp.task('default',['sass:watch','sass'], function() {
  console.log('Gulp default task started');
});

gulp.task('clean', function(){
	return del(["public/index.css"]);
})

gulp.task('sass:watch', function () {
  gulp.watch('public/**/*.scss', ['sass']);
});

gulp.task('sass',['clean'], function(){
	return gulp.src("public/**/*.scss")
		.pipe(sass().on('error', sass.logError))
		.pipe(concatCss("index.css"))
		.pipe(gulp.dest("public/"));
});