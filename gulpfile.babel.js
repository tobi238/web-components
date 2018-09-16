'use strict';

import gulp from 'gulp';
import del from 'del';
import sass from 'gulp-sass';
import tsify from 'tsify';
import browserify from 'browserify';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserSync from 'browser-sync';

/* BROWSERSYNC */
browserSync.create();
export const initBrowser = done => {
	browserSync.init({
		server: {
			baseDir: ".",
		},
		notify: false,
		logLevel: "silent"
	});
	done();
}

export const reloadBrowser = done => {
	browserSync.reload();
	done();
}

/* SCSS */
export const buildSCSS = () => {
	return gulp.src('src/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/'));
}

export const watchSCSS = () => {
	return gulp.watch('src/**/*.scss', {
		read: false
	}, gulp.series(buildSCSS, reloadBrowser))
};

/* TS */
export const buildJS = () => {
	return browserify()
		.add('src/main.ts')
		.plugin(tsify)
		.bundle()
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/'));
}

export const watchJS = () => {
	return gulp.watch('src/**/*.ts', {
		read: false
	}, gulp.series(buildJS, reloadBrowser))
}

/* OTHER FILES */
export const copyStaticFiles = () => {
	return gulp.src([
			'node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
			'node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'
		])
		.pipe(gulp.dest('dist/'));
}

/* CLEAN */
export const clean = () => del(['dist']);

/* TASKS */
export const build = gulp.series(clean, gulp.parallel(buildSCSS, buildJS, copyStaticFiles));
gulp.task('build', build);

export const server = gulp.series(build, initBrowser, gulp.parallel(watchSCSS, watchJS));
gulp.task('server', server);