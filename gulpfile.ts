import {runRollup} from './rollup';

const rimraf = require('rimraf');
const del = require('del');
const childProcess = require('child_process');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const precache = require('sw-precache');

gulp.task('task:clean', done => rimraf('deploy', () => rimraf('release', done)));

gulp.task('task:client:ngc', () => childProcess
  .execSync('node_modules/.bin/ngc -p tsconfig.ngc.json'));

gulp.task('task:client:rollup', done => runRollup());

gulp.task('task:client:copy', () => gulp
  .src([
    'src/index.html',
    'src/global.css',
    'src/manifest.json',
    'src/favicon.ico',
    'node_modules/zone.js/dist/zone.js',
  ])
  .pipe(gulp.dest('release')));

gulp.task('task:client:copy_images', () => gulp
  .src([
    'src/images/**/*.png',
  ], {base: 'src'})
  .pipe(gulp.dest('release')));


gulp.task('task:client:delete_unminified', () => del(['release/hn-app.js']));

gulp.task('task:client:sw', done => {
  precache.write('release/sw.js', {
    staticFileGlobs: ['release/**/*.{js,html,css,png,json,ico}'],
    stripPrefix: 'release',
    skipWaiting: true,
    clientsClaim: true,
    navigateFallback: '/index.html',
    runtimeCaching: [{
      urlPattern: /api/,
      handler: 'fastest',
      options: {
        cache: {
          maxEntries: 50,
          name: 'api-cache'
        }
      }
    }]
  }, done);
});

gulp.task('task:build:client', done => runSequence(
  'task:client:ngc',
  'task:client:rollup',
  [
    'task:client:copy',
    'task:client:copy_images',
    'task:client:delete_unminified',
  ],
  'task:client:sw',
  done,
));

gulp.task('task:build:appengine', done => runSequence(
  'task:appengine:tsc',
  [
    'task:appengine:copy_templates',
    'task:appengine:copy_from_root',
  ],
  done,
))

gulp.task('task:appengine:tsc', () => childProcess
  .execSync('node_modules/.bin/tsc -p tsconfig.ae.json'));

gulp.task('task:appengine:copy_templates', () => gulp
  .src([
    'src/app/**/*.html',
    'src/app/**/*.css'
  ], {base: 'src'})
  .pipe(gulp.dest('deploy')));

gulp.task('task:appengine:copy_from_root', () => gulp
  .src([
    'release/**/*.*',
    'node_modules/**/*.*',
    'package.json',
    'app.yaml',
    'app.js',
  ], {base: '.'})
  .pipe(gulp.dest('deploy')));

gulp.task('build', done => runSequence(
  'task:clean',
  'task:build:client',
  'task:build:appengine',
  done,
));

gulp.task('build:client', done => runSequence(
  'task:clean',
  'task:build:client',
  done,
));