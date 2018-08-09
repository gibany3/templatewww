var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglifyjs = require('uglify-js');
var composer = require('gulp-uglify/composer');
var minify = composer(uglifyjs, console);

gulp.task('scripts', function() {
    return gulp.src(['./node_modules/jquery/dist/jquery.js', './src/js/*.js'])
        .pipe(concat('bundle.js'))
        .pipe(minify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('sass', function () {
    gulp.src('./src/scss/styles.scss')
        .pipe(autoprefixer({browsers: ['> 1%', 'last 2 version', 'android 4']}))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('browser-sync', function() {
    browserSync.init(["*.html" ,"css/*.css", "js/*.js"], {
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('default', ['sass', 'browser-sync', 'scripts'], function () {
    gulp.watch("./src/scss/*.scss", ['sass']).on('change', browserSync.reload);
    gulp.watch("./dist/*.html").on('change', browserSync.reload);
    gulp.watch("./src/js/*.js", ['scripts']).on('change', browserSync.reload);
});