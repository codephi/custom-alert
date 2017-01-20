var gulp = require('gulp');
var stylus = require('gulp-stylus');
var pug = require('gulp-pug');
var clean = require('gulp-clean');
var minify = require('gulp-minify');
var plumber = require('gulp-plumber');
var autowatch = require('gulp-autowatch');

gulp.task('views', function() {
    gulp.src('./*.html')
        .pipe(plumber())
        .pipe(clean())

    gulp.src('./demo/assets/views/*.pug')
        .pipe(plumber())
        .pipe(pug())
        .pipe(gulp.dest('./'))
})

gulp.task('stylus', function() {
    gulp.src('./demo/assets/styl/*.styl')
        .pipe(plumber())
        .pipe(stylus({
            compress: true
        }))
        .pipe(gulp.dest('./demo/public/css'))
})

gulp.task('js', function() {
    gulp.src('./demo/assets/js/*.js')
        .pipe(plumber())
        .pipe(minify())
        .pipe(gulp.dest('./demo/public/js'))
})


gulp.task('watch', function() {
    autowatch(gulp, {
        'stylus': './demo/assets/**/*.styl',
        'js': './demo/assets/**/*.js',
        'views': './demo/assets/**/*.pug',
        'default': ['./src/js/*.js', './src/styl/*.styl']
    });
});

gulp.task('live', ['default', 'stylus', 'js', 'views', 'watch']);

gulp.task('default', function() {
    gulp.src('./src/js/custom-alert.js')
        .pipe(minify({
            ext: {
                src: '-debug.js',
                min: '.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('./dist/js'))

    gulp.src(['./src/styl/custom-alert.styl','./src/styl/custom-alert-bootstrap.styl'])
        .pipe(stylus({
            compress: true
        }))
        .pipe(gulp.dest('./dist/css'))
})
