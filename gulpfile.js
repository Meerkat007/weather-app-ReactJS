var gulp = require('gulp');
var babel = require('gulp-babel');
var bowerFiles = require('main-bower-files');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var gulpIf = require('gulp-if');
var htmlreplace = require('gulp-html-replace');
var inject = require('gulp-inject');
var newer = require('gulp-newer');
var print = require('gulp-print');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');

var buildPath = {
    base: '../weatherApp',
    JS: '../weatherApp/js/',
    jsCustom: '../weatherApp/js/custom',
    cssDist: '../weatherApp/styles/'
}

var sourcePath = {
    customJSX: './scripts',
    customCSS: './styles'
}

// Lint JS/JSX files
gulp.task('eslint', function() {
  return gulp.src(jsFiles.source)
    .pipe(eslint({
      baseConfig: {
        "ecmaFeatures": {
           "jsx": true
         }
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/* concat css files */
gulp.task('concat-minify-css', function() {
    return gulp.src(sourcePath.customCSS + '/*.css')
        .pipe(concat('main.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(buildPath.cssDist))
});



/* convert jsx to js */
gulp.task('convert-jsx', function() {
  return gulp.src(sourcePath.customJSX + '/*.jsx')
    .pipe(babel({
      "plugins": ["transform-react-jsx"]
    }))
    .pipe(gulp.dest(buildPath.jsCustom))
});

/* concat all min.js files */
gulp.task('concat-minify-js', function() {
    return gulp.src([
        'node_modules/react/dist/react.min.js',
        'node_modules/react-dom/dist/react-dom.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/bootstrap.min.js',
        'node_modules/moment/min/moment-with-locales.min.js'
        ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildPath.JS))
});

/* concat min.js files with jsx-js files */
gulp.task('concat-js-react-components', ['convert-jsx', 'concat-minify-js'], function() {
    return gulp.src([
        buildPath.JS + '/*.min.js',
        buildPath.jsCustom + '/*.js'
    ])
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest(buildPath.JS))
});

gulp.task('replace-html', function() {
    return gulp.src('index.html')
        .pipe(htmlreplace({
            'replace-css': 'styles/main.min.css',
            'replace-js': 'js/app.min.js'
        }))
        .pipe(gulp.dest(buildPath.base))
});

gulp.task('build', ['concat-minify-css', 'concat-js-react-components', 'replace-html']);