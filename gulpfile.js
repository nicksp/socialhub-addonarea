'use strict';

var gulp        = require('gulp');
var eslint      = require('gulp-eslint');
var browserSync = require('browser-sync');

var config =  {
  browserSync: {
    browserPort: 3000,
    UIPort: 3001,
    baseDir: './public/app/views'
  },

  scripts: {
    src: ['app/**/*.js', 'server.js']
  }
};

gulp.task('lint', function() {
  return gulp.src(config.scripts.src)
    .pipe(eslint())
    .pipe(eslint.format())
    // Brick on failure to be super strict
    .pipe(eslint.failOnError());
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: config.browserSync.baseDir
    },
    port: config.browserSync.browserPort,
    ui: {
      port: config.browserSync.UIPort
    },
    ghostMode: false
  });
});

gulp.task('build', ['lint']);
gulp.task('default', ['build', 'browser-sync']);
