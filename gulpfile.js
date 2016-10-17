var gulp = require('gulp');
var less = require('gulp-less');
var  sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
gulp.task('less', function () {
	gulp.src('./public/src/style/lab.less')
	.pipe(sourcemaps.init())
	.pipe(less())
	.pipe(sourcemaps.write())
	.pipe(postcss([autoprefixer(['ios >= 7', 'android >= 4.1'])]))
	.pipe(rename(function (path) {
		path.basename += '.min';
	}))
	.pipe(gulp.dest('./public/style/'))
	.pipe(browserSync.reload({stream: true}));
});
gulp.task('revCss', function () {
	gulp.src('./public/style/lab.min.css')
	.pipe(rev())
	.pipe(rev.manifest())
	.pipe(gulp.dest('./public/style/'))
})

gulp.task('rev', ['revCss'], function () {
	gulp.src(['./public/style/*.json', './views/index.ejs'])
	.pipe(revCollector())
	.pipe(gulp.dest('./views/'));
})
// gulp.task('default', ['less', 'rev']);
gulp.task('watch', function () {
	gulp.watch('./public/src/style/**/*.less', ['less']);
})
gulp.task('server', function () {
	browserSync.init({
		server:{
			baseDir: "./public/"
		}
	});
});
gulp.task('test', function () {
	gulp.start('server');
	gulp.start('watch');
})
