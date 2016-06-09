import gulp from 'gulp';
import babel from 'gulp-babel';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import eslint from 'gulp-eslint';
import htmlreplace from 'gulp-html-replace';
import print from 'gulp-print';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';

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

/* Lint JS/JSX files */
gulp.task('eslint', () => {
  gulp.src(sourcePath.customJSX)
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
gulp.task('concat-minify-css', () => {
    gulp.src(sourcePath.customCSS + '/*.css')
        .pipe(concat('main.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(buildPath.cssDist))
});

/* convert to es5, uglify, rename jsx files */ 
gulp.task('convert-jsx', ['eslint'], () => {
     gulp.src('./scripts/*.jsx')
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest(buildPath.JS));
});

/* concat, uglify all vendor js files */
gulp.task('concat-minify-js', () => {
    gulp.src([
        'node_modules/react/dist/react.min.js',
        'node_modules/react-dom/dist/react-dom.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/bootstrap.min.js',
        'node_modules/moment/min/moment-with-locales.min.js',
        ])
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildPath.JS))
});

/* replace the references in html */
gulp.task('replace-html', () => {
    gulp.src('index.html')
        .pipe(htmlreplace({
            'replace-css': 'styles/main.min.css',
            'replace-js-vendor': 'js/vendor.min.js',
            'replace-js-app': 'js/app.min.js'
        }))
        .pipe(gulp.dest(buildPath.base))
});

gulp.task('build', ['concat-minify-css', 'concat-minify-js', 'convert-jsx', 'replace-html']);