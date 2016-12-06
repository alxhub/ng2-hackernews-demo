
const childProcess = require('child_process');
const gulp = require('gulp');

gulp.task('task:client:ngc', () => childProcess
  .execSync('node_modules/.bin/ngc -p tsconfig.client.json'));