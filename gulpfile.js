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
	.pipe(rev())
	.pipe(gulp.dest('./public/style/'))
	.pipe(rev.manifest())
	.pipe(gulp.dest('./public/src/rev/'))
	.pipe(browserSync.reload({stream: true}));
});
// gulp.task('watch', function () {
// 	gulp.watch('less_learn/src/*.less', ['less']);
// })
// gulp.task('server', function () {
// 	browserSync.init({
// 		server:{
// 			baseDir: "less_learn/dist/"
// 		}
// 	});
// });
// gulp.task('test', function () {
// 	gulp.start('server');
// 	gulp.start('watch');
// })

gulp.task('rev', function () {
	gulp.src(['./public/src/rev/*.json', './views/*.ejs'])
	.pipe(revCollector())
	.pipe(gulp.dest('./views/'));
})
