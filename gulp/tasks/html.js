﻿import gulpFileInclude from 'gulp-file-include';
import gulpWebpHtmlNosvg from 'gulp-webp-html-nosvg';
import gulpVersionNumber from 'gulp-version-number';

export const html = () => {
  return app.gulp
    .src(app.path.src.html)
    .pipe(gulpFileInclude())
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'HTML',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(app.plugins.replace(/@img\//g, 'img/'))
    .pipe(app.plugins.if(app.prod, gulpWebpHtmlNosvg()))
    .pipe(
      app.plugins.if(
        app.prod,
        gulpVersionNumber({
          value: '%DT%',
          append: {
            key: '_v',
            cover: 0,
            to: ['css', 'js'],
          },
          output: {
            file: 'gulp/version.json',
          },
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream());
};
