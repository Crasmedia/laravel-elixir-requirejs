var gulp = require('gulp'),
	shell = require('gulp-shell'),
	_ = require('underscore'),
	elixir = require('laravel-elixir');

elixir.extend('requirejs', function(options) {
	var config = this,
		defaultOptions = {
			debug:  ! config.production,
			srcDir: config.assetsDir + 'js',
			output: config.jsOutput
		};

	options = _.extend(defaultOptions, options);

	gulp.task('requirejs', shell.task([
		'r.js -o ' + options.buildfile
	], {
		errorMessage : 'RequireJS failed, please check your build file',
		quiet : !options.debug,
		ignoreErrors : !options.debug //Don't pop error on production environment
	}));

	this.registerWatcher('requirejs', [options.srcDir + '/**/*.js']);

	return this.queueTask('requirejs');
});
