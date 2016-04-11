var gulp = require('gulp')
var shell = require('gulp-shell')
var elixir = require('laravel-elixir');
var uglifycss = require('gulp-uglifycss');
var rename = require("gulp-rename");

var Task = elixir.Task;

require('laravel-elixir-stylus');

elixir.extend("minifycss", function(path, savePath) {
    new Task("minifycss", function() {
        gulp.src(path)
            .pipe(uglifycss({
                "maxLineLen": 80,
                "uglyComments": true
            }))
            .pipe(rename(function(path) {
                path.basename += ".min";
            }))
            .pipe(gulp.dest(savePath));
    })
});

elixir(function(mix) {
    mix.stylus("./dist/styl/custom-alert.styl", "./dist/css/");
    mix.minifycss("./dist/css/custom-alert.css", "./dist/css/");
});
