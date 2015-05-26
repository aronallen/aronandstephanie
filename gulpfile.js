'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var util = require('gulp-util');
var del = require('del');
var jshint = require('gulp-jshint');
var autoPrefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var browserify = require('gulp-browserify');
var reactify = require('reactify');
var ignore = require('gulp-ignore');
var foreach = require('gulp-foreach');
var iconfont = require('gulp-iconfont');
var eventStream = require('event-stream');
var iconfontCss = require('gulp-iconfont-css');
var stylish = require('jshint-stylish');
var srcDir = 'client';
var destDir = 'public';
var serverDir = 'server';
var _ = require('lodash');
var jsxhint = require('jshint-jsx');

var isProduction = process.env.NODE_ENV === 'production' || !!util.env.production;



var paths = {
	src : {
		app : srcDir + '/app.js',
		test : srcDir + '/component-test.jsx',
		jsFiles : srcDir + '/**/*.{js,jsx}',
		dashFile : srcDir + '/dasheverywhere.min.js',
		htmlFiles : srcDir + '/**/*.{html,json}',
		lessFiles : srcDir + '/**/*.less',
		lessIndex : srcDir + '/**/index--**.less',
		imgFiles: srcDir + '/images/*.{jpeg,jpg,gif,svg,png}',
		fontFiles: srcDir + '/**/*.{eot,woff,ttf}',
		iconFiles : [srcDir + '/icons/tdc/*.svg', srcDir + '/icons/yousee/*.svg']
	},
	dest : {
		jsFiles : destDir + '/**/*.js',
		htmlFiles : destDir + '/**/*.html',
		style : destDir +  '/'
	}
};




gulp.task('lint-server', function () {
	return gulp.src(serverDir + '/**.js')
		.pipe(jshint.reporter(stylish));
});

gulp.task('lint-client', function () {
	return gulp.src([paths.src.jsFiles, '!**/node_modules/**'])
		.pipe(jshint({ linter: jsxhint.JSXHINT }))
		.pipe(jshint.reporter(stylish));
});

gulp.task('scripts', function () {
	return gulp.src(paths.src.app)
		.pipe(
			browserify(
				{
					transform : [reactify],
					debug : !isProduction
				}))
		.pipe(isProduction ? util.noop() : livereload())
		.pipe(gulp.dest(destDir));
});

gulp.task('clean', function () {
	del.sync(destDir + '/', {force : true});
});


gulp.task('styles', function () {
	gulp.src(paths.src.lessFiles)
	.pipe(concat('style.less'))
	.pipe(less({
		paths : [srcDir]
	}))
	.pipe(autoPrefixer({
		browsers: ['last 3 versions'],
	}))
	.pipe(gulp.dest(paths.dest.style))
	.pipe(isProduction ? util.noop() : livereload());
});

gulp.task('html', function () {
	gulp.src(paths.src.htmlFiles)
		.pipe(gulp.dest(destDir))
		.pipe(isProduction ? util.noop() : livereload());

});

gulp.task('copy-dash-player', function () {
	gulp.src(paths.src.dashFile)
		.pipe(gulp.dest(destDir))
		.pipe(isProduction ? util.noop() : livereload());

});

gulp.task('images', function () {
	gulp.src(paths.src.imgFiles)
	.pipe(gulp.dest(destDir + '/images'))
	.pipe(isProduction ? util.noop() : livereload());
});

gulp.task('fonts', function () {
	gulp.src(paths.src.fontFiles)
	.pipe(gulp.dest(destDir))
	.pipe(isProduction ? util.noop() : livereload());
});


gulp.task('iconfont', function () {
	_.each(paths.src.iconFiles, function (path) {
		var fontName;
		var matches = path.match(/icons\/([a-z]+)\//);
		if (matches) {
			fontName = matches[1] + '-icon-font';
		}
		gulp.src(path)
			.pipe(
				iconfontCss({
					fontName : fontName,
					targetPath     : '../styles/' + fontName + '.less',
					fontPath : '/fonts/'
				})
			)
			.pipe(
				iconfont({
					fontName : fontName
				})
			)

			.pipe(gulp.dest(srcDir + '/fonts'));
		});
});


gulp.task('build', ['lint-client', 'iconfont', 'styles', 'html', 'scripts', 'copy-dash-player', 'images', 'fonts']);
gulp.task('lint', ['lint-client', 'lint-server']);
gulp.task('watch', function () {
	if (isProduction) {
		return;
	}
	livereload.listen();
	gulp.watch(paths.src.jsFiles, ['lint-client', 'scripts']);
	gulp.watch(paths.src.htmlFiles, ['html']);
	gulp.watch(paths.src.lessFiles, ['styles']);
	gulp.watch(paths.src.imgFiles, ['images']);
	gulp.watch(paths.src.fontFiles, ['fonts']);
	gulp.watch(paths.src.iconFiles, ['iconfont']);
});

gulp.task('default', ['clean', 'build', 'watch']);
