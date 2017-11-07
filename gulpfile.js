const gulp = require('gulp');
const gutil = require('gulp-util');

const ts = require('gulp-typescript');
const mocha = require('gulp-mocha');

gulp.task('watch', function () {
    gulp.watch(['src/**', 'test/**'], ['mocha']);
});

gulp.task('ts', function () {
    return gulp.src('src/**/*.ts').pipe(ts({
        noImplicitAny: true
    })).pipe(gulp.dest('dist'));
});

gulp.task('mocha', function () {
    return gulp.src(['test/**/*.js'], {
        read: false
    }).pipe(mocha({ 
        ui: 'tdd',
        reporter: 'list'
    }));
});