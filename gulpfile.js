var gulp = require('gulp');
var server = require('gulp-express');

gulp.task('serve', function() {
  server.run(["server/dev.js"]);
  gulp.watch(['app/**/*'], server.notify);
});

gulp.task('prod', function() {
  server.run(["server/prod.js"]);
})