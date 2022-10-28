import { configFTP } from '../config/ftp.js';
import gulpVinylFTP from 'vinyl-ftp';
import gulpUtil from 'gulp-util';

export const ftp = () => {
  configFTP.log = gulpUtil.log;
  const ftpConnect = gulpVinylFTP.create(configFTP);
  return app.gulp
    .src(`${app.path.buildFolder}/**/*.*`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'FTP',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`));
};
