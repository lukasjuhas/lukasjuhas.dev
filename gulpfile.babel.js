import gulp from 'gulp';
import { rollup } from 'rollup';
import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
import vue from 'rollup-plugin-vue';
import multiEntry from 'rollup-plugin-multi-entry';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-js';
import path from 'path';
import clean from 'gulp-clean';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';
import gulpif from 'gulp-if';
import greplace from 'gulp-replace';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import fs from 'fs';
import bump from 'gulp-bump';
import runSequence from 'run-sequence';
import { argv } from 'yargs';
import changeCase from 'change-case';

let production = false;

const reload = browserSync.reload;
const config = {
  srcBase: './src',
  src: './src/assets',
  tmp: './.tmp',
  public: './public',
};

const tasks = ['images', 'scripts', 'styles', 'html', 'move'];

gulp.task('scripts', ['clean-scripts'], () => {
  let env = 'development';
  if (production) {
    env = 'production';
  }

  rollup({
    entry: `${config.src}/scripts/app.js`,
    plugins: [
      multiEntry(),
      vue({
        css(content, styles) {
          if (!fs.existsSync(config.tmp)) {
            fs.mkdirSync(config.tmp);
          }
          styles.forEach(({ id, code }) => {
            const filename = path.basename(id).replace(/\.vue$/, '.scss');
            fs.writeFileSync(`${config.tmp}/${changeCase.lower(filename)}`, code);
          });
        },
      }),
      buble(),
      nodeResolve({
        browser: true,
        main: true,
        jsnext: true,
      }),
      commonjs({
        include: [
          'node_modules/**',
          `${config.src}/**`,
        ],
      }),
      json(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(env),
        'process.env.VUE_ENV': JSON.stringify('browser'),
      }),
      production ? uglify({}, minify) : '',
    ],
  }).then((bundle) => {
    bundle.write({
      format: 'iife',
      moduleName: 'ItsLukasBundle',
      sourceMap: !production,
      dest: `${config.public}/scripts/app.min.js`,
    });
  }).catch(err => console.log(err.stack));
});

gulp.task('clean-styles', () => (
  gulp.src(`${config.public}/styles`, {
    read: false,
  })
  .pipe(clean())
));

gulp.task('clean-scripts', () => (
  gulp.src(`${config.public}/scripts`, {
    read: false,
  })
  .pipe(clean())
));

gulp.task('clean-html', () => (
  gulp.src(`${config.public}/*.html`, {
    read: false,
  })
  .pipe(clean())
));

gulp.task('browser-sync', () => {
  browserSync.init(null, {
    server: {
      baseDir: config.public,
    },
    // proxy: 'http://webstarter.dev',
    files: [`${config.public}/**/*.*`],
    browser: 'google chrome',
    port: 2525,
  });
});

gulp.task('watch', tasks, () => {
  gulp.watch([`${config.src}/styles/**/*.scss`, `${config.tmp}/*.scss`], ['styles', reload]);
  gulp.watch(`${config.src}/scripts/**/*.{js,vue}`, ['scripts', reload]);
  gulp.watch(`${config.src}/images/**/*.*`, ['images', reload]);
});

gulp.task('styles', () => (
  gulp.src([`${config.src}/styles/*.scss`, `${config.tmp}/*.scss`])
  .pipe(gulpif(!production, sourcemaps.init()))
  .pipe(sass({
    outputStyle: production ? 'compressed' : 'nested',
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
  }))
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulpif(!production, sourcemaps.write('.')))
  .pipe(gulp.dest(`${config.public}/styles`))
));

gulp.task('images', () => {
  gulp.src(`${config.src}/images/**/*.*`)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false,
      }],
    }))
    .pipe(gulp.dest(`${config.public}/images`));
});

gulp.task('html', ['styles'], () => {
  gulp.src(`${config.srcBase}/*.html`)
    .pipe(greplace(/<link href="styles\/core.min.css"[^>]*>/, () => {
      const style = fs.readFileSync(`${config.public}/styles/core.min.css`, 'utf8');
      return `<style>\n${style}\n</style>`;
    }))
    .pipe(gulp.dest(config.public));
});

gulp.task('move', ['clean-html'], () => {
  gulp.src([`${config.src}/*.html`])
    .pipe(gulp.dest(config.public));
});

gulp.task('getversion', () => {
  const version = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
  return version;
});

gulp.task('bump', () => {
  let type = 'patch';
  if (argv.minor) type = 'minor';
  if (argv.major) type = 'major';

  return gulp.src('./package.json')
    .pipe(bump({ type }))
    .pipe(gulp.dest('./'));
});

gulp.task('dev', () => (
  runSequence('clean-styles', 'clean-scripts', tasks, 'browser-sync', 'watch')
));

gulp.task('build', () => {
  production = true;
  return runSequence('clean-styles', 'clean-scripts', 'bump', 'getversion', tasks);
});

gulp.task('default', () => (
  runSequence('clean-styles', 'clean-scripts', tasks)
));
