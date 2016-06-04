var gulp = require('gulp');
var bowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var stylus = require('gulp-stylus');
var es = require('event-stream');

gulp.task('index', function () {
    var cssFiles = gulp.src('./styles/.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./build'));

    gulp.src('./index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
        .pipe(inject(es.merge(
            cssFiles,
            gulp.src('./scripts/**/*.js', {read: false})
        )))
        .pipe(gulp.dest('./build'));
});