﻿import gulpSvgSprite from 'gulp-svg-sprite';

export const svgSprive = () => {
  return app.gulp
    .src(app.path.src.svgIcons)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'SVG',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      gulpSvgSprite({
        mode: {
          stack: {
            sprite: `../icons/icon.svg`,
            example: true,
          },
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.images));
};
