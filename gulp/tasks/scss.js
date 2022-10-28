import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import gulpRename from 'gulp-rename';

import gulpCleanCss from 'gulp-clean-css';
import gulpWebpCss from 'gulp-webpcss';
import gulpAutoPrefixer from 'gulp-autoprefixer';
import gulpGroupCssMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp
    .src(app.path.src.scss, { sourcemaps: app.dev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'SCSS',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    .pipe(
      sass({
        outputStyle: 'expanded',
      })
    )
    .pipe(app.plugins.if(app.prod, gulpGroupCssMediaQueries()))
    .pipe(
      app.plugins.if(
        app.prod,
        gulpAutoPrefixer({
          grid: true,
          overrideBrowserslist: ['last 3 versions'],
          cascade: true,
        })
      )
    )
    .pipe(
      app.plugins.if(
        app.prod,
        gulpWebpCss({
          webpClass: '.webp',
          noWebpClass: '.no-webp',
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.if(app.prod, gulpCleanCss()))
    .pipe(
      gulpRename({
        extname: '.min.css',
      })
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browserSync.stream());
};
