var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concatCss = require('gulp-concat-css'),
	del = require('del'),
	nodemon = require('gulp-nodemon'),
	jshint = require('gulp-jshint');

gulp.task('default',function(){
	nodemon({
		script: 'server.js',
		ext: 'html js',
		tasks: ['sass:watch','sass','lint']
	}).on('restart', function () {
		console.log('Restarted!')
	})
});

gulp.task('lint', function () {
  gulp.src('public/**/*.js')
    .pipe(jshint());
})

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