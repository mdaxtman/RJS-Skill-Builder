var gulp = require('gulp');
var path = require('path');
//universal
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
//javascript
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var autopolyfiller = require('gulp-autopolyfiller');
var modernizr = require('gulp-modernizr');
//sass/css
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');

var jsInputDir = path.normalize(__dirname + '/public/javascripts');
var sassInputDir = path.normalize(__dirname + '/public/stylesheets');
var outputDir = path.normalize(__dirname + '/public/dist');

var jsGlob = path.normalize(jsInputDir + '**/*.js');
var sassGlob = path.normalize(sassInputDir + '**/*.scss'); 

gulp.task('js-app', function(done){
	gulp.src(jsGlob)
		.pipe(sourcemaps.init())
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(concat('front-end-app.js'))
			.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(outputDir));
	done();
});

gulp.task('polyfills', function(done){
	gulp.src(jsGlob)
		.pipe(autopolyfiller('polyfills.js'))
		.pipe(gulp.dest(outputDir));
	done();
});

gulp.task('modernizr', function() {
  gulp.src(jsGlob)
    .pipe(modernizr('modernizr.js'))
    .pipe(gulp.dest(outputDir));
});

gulp.task('js-all', ['js-app', 'polyfills', 'modernizr']);
