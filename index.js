var gulp = require('gulp'),
	shell = require('gulp-shell'),
	_ = require('underscore'),
	elixir = require('laravel-elixir');

elixir.extend('requirejs', function(options) {
	var config = this,
		defaultOptions = {
			debug:  ! config.production,
			optimizer: 'uglify',
			srcDir: config.assetsDir + 'js',
			output: config.jsOutput
		};

	options = _.extend(defaultOptions, options);

	if(options.build === undefined) {
		options.build = [];
	} else if(typeof options.build === 'string') {
		options.build = [options.build];
	}

	var tasks = [];
	for (index = 0, len = options.build.length; index < len; ++index)
	{
		var buildfile = options.build[index];
		if(buildfile)
		{
			tasks.push('r.js -o optimize=' + (options.debug ? 'none' : options.optimizer) + ' ' + buildfile);
		}
	}

	gulp.task('requirejs', shell.task(tasks, {
		errorMessage: 'RequireJS failed! Did you make a typo in one of your build files .. ?',
		quiet: !options.debug,
		ignoreErrors: !options.debug //Don't pop error on production environment
	}));

	this.registerWatcher('requirejs', [options.srcDir + '/**/*.js']);

	return this.queueTask('requirejs');
});