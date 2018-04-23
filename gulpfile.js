var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    render = require('gulp-htmlrender'),
    sourcemaps = require('gulp-sourcemaps'),
    nunjucksRender = require('gulp-nunjucks-render'),
    babel = require('gulp-babel');

gulp.task('copyHtml', function() {
  gulp.src('src/*.html').pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
  return gulp
    .src(['src/**/*.html', '!src/templates/**/*', '!src/content/**/*'], { read: false })
    .pipe(render.render())
    .pipe(
        nunjucksRender({
          path: ['src/templates/']
      })
    )
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('css', function () {
    return gulp.src('src/assets/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js',function(){
  gulp.src('src/assets/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('scripts.js'))
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('images', function() {
  return gulp.src('src/assets/img/**/*.{gif,jpg,png,svg}')
    .pipe(gulp.dest('dist/assets/img'));
});

gulp.task('video', function() {
  return gulp.src('src/assets/video/**/*')
    .pipe(gulp.dest('dist/assets/video'));
});

gulp.task('components', function() {
  return gulp.src('src/assets/components/**/*')
    .pipe(gulp.dest('dist/assets/components'));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "dist"
        }
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['css', 'js', 'html', 'images', 'video', 'components', 'browser-sync'], function () {
    gulp.watch('src/assets/scss/*/*.scss', ['css']);
    gulp.watch(['src/assets/scss/**/*.scss', 'rc/assets/scss/**/**/*.scss'], ['css']);
    gulp.watch('src/assets/js/*.js', ['js']);
    gulp.watch('src/*.html', ['bs-reload']);
});
