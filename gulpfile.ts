import {runRollup} from './rollup';

const childProcess = require('child_process');
const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('task:client:ngc', () => childProcess
  .execSync('node_modules/.bin/ngc -p tsconfig.ngc.json'));

gulp.task('task:client:rollup', done => runRollup());

gulp.task('task:client:copy', () => gulp
  .src([
    'src/index.html',
    'src/global.css',
    'node_modules/zone.js/dist/zone.js',
  ])
  .pipe(gulp.dest('release')));

gulp.task('build', done => runSequence(
  'task:client:ngc',
  'task:client:rollup',
  'task:client:copy',
  done
));