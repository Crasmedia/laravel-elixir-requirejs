# laravel-elixir-requirejs

Simple extension to *Laravel Elixir* to compile/trace RequireJS AMD files into one single file using a build script

## Install

```
npm install --save-dev Crasmedia/laravel-elixir-requirejs
```

## Usage

### Example *Gulpfile*:

```javascript
var elixir = require("laravel-elixir");
require("laravel-elixir-requirejs");

elixir(function(mix) {
    mix.requirejs({
    	buildfile : 'build.js'
    });
});
```

### Example *build.js*:
```javascript
({
	baseUrl: 'resources/assets/js',
	mainConfigFile: 'resources/assets/js/config.js',

	out: 'public/assets/js/compressed.js',
	name: '../vendor/requirejs/require',
	include : 'main', //Include our main js file in the require build
	optimize: 'uglify'
})
```