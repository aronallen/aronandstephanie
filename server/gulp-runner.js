/** @module server/gulp */
'use strict';

var fork = require('child_process').fork;
var path = require('path');

function runGulpInBackground() {
  var gulp = fork(require.resolve('gulp/bin/gulp'), {
    cwd: path.resolve(__dirname, '../')
  });

  gulp.on('close', function(code, signal) {
    console.log(
      'Gulp exited with code %s%s. Restarting in a few seconds!',
      code,
      signal ? ' (killed by signal ' + signal + ')' : ''
    );
    setTimeout(runGulpInBackground, 1000);
  });

  process.on('exit', function(){
    gulp.kill();
  });
}

if (process.env.NODE_ENV !== 'production') {
  runGulpInBackground();
}