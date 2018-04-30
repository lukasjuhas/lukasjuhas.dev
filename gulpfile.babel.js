import gulp from 'gulp';
import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
// import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
import vue from 'rollup-plugin-vue';
import alias from 'rollup-plugin-alias';
import uglify from 'rollup-plugin-uglify';
import builtins from 'rollup-plugin-node-builtins';
import { minify } from 'uglify-es';
import path from 'path';
import clean from 'gulp-clean';
import sass from 'gulp-sass';
import inject from 'gulp-inject';
import autoprefixer from 'gulp-autoprefixer';
import svgSprite from 'gulp-svg-sprite';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
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
import { join } from 'path';
import swPrecache from 'sw-precache';
import size from 'gulp-size';

const { log } = console;
let production = false;
let error = false;

const { reload } = browserSync;
const config = {
  srcBase: './src',
  src: './src/assets',
  tmp: './.tmp',
  public: './public',
};

const tasks = ['images', 'scripts', 'core-styles', 'styles', 'html', 'move', 'generate-service-worker'];

const getPackageJson = () => JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const roll = (input, file, cb) => {
  let env = 'development';
  if (production) {
    env = 'production';
  }

  return rollup({
    input,
    plugins: [
      alias({
        vue: 'node_modules/vue/dist/vue.esm.js',
      }),
      vue({
        // autoStyles: false,
        scss: {
          data: '@import "./src/assets/styles/config/variables";@import "./src/assets/styles/config/mixins";',
        },
        css(content, styles) {
          if (!fs.existsSync(config.tmp)) {
            fs.mkdirSync(config.tmp);
          }
          styles.forEach(({ id, code }) => {
            const filename = path.basename(id).replace(/\.vue$/, '.scss');
            fs.writeFileSync(`${config.tmp}/_${changeCase.lower(filename)}`, code);
          });
        },
      }),
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
      babel({
        presets: [
          [
            'env', {
              modules: false,
            },
          ],
        ],
        plugins: [
          'external-helpers',
        ],
        comments: false,
        babelrc: false,
        exclude: 'node_modules/**',
      }),
      production ? uglify({}, minify) : '',
      globals(),
      builtins(),
    ],
  }).then((bundle) => {
    bundle.write({
      format: 'iife',
      name: 'ItsLukasBundle',
      sourcemap: !production,
      file,
    });

    cb();
  }).catch((err) => {
    error = true;
    log(' 🚨 ', err.stack);
    cb();
  });
};

gulp.task('scripts', (cb) => {
  roll(`${config.src}/scripts/app.js`, `${config.public}/scripts/app.min.js`, () => {
    gulp.src([`${config.public}/scripts/app.min.js`])
      .pipe(size({
        showFiles: true,
        showTotal: false,
      }))
      .pipe(gulp.dest(`${config.public}/scripts`));
    cb();
  });
});

gulp.task('clean', () => (
  gulp.src([`${config.public}/styles`, `${config.public}/scripts`], {
    read: false,
  }).pipe(clean())
));

gulp.task('clean-static', () => {
  const staticFiles = [
    `${config.public}/*.html`,
    `${config.public}/manifest.json`,
  ];

  return gulp.src(staticFiles, {
    read: false,
  }).pipe(clean());
});

gulp.task('browser-sync', () => {
  browserSync.init(null, {
    server: {
      baseDir: config.public,
    },
    // proxy: 'http://webstarter.dev',
    files: [`${config.public}/**/*.*`],
    // browser: 'google chrome',
    port: 2525,
  });
});

gulp.task('watch-files', tasks, () => {
  gulp.watch([`${config.src}/styles/core.scss`], ['core-styles', 'html', reload]);
  gulp.watch([`${config.src}/styles/**/*.scss`, `${config.tmp}/*.scss`, `!${config.src}/styles/core.scss`], ['styles', reload]);
  gulp.watch(`${config.src}/scripts/**/*.vue`, ['styles', 'core-styles', 'html', 'scripts', reload]);
  gulp.watch(`${config.src}/scripts/**/*.js`, ['scripts', reload]);
  gulp.watch(`${config.src}/images/**/*.*`, ['images', reload]);
});

gulp.task('core-styles', () => (
  gulp.src([`${config.src}/styles/core.scss`])
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(sass({
      outputStyle: production ? 'compressed' : 'nested',
    }).on('error', (err) => {
      error = true;
      log(' 🚨 ', err.stack);
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
    }))
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulpif(!production, sourcemaps.write('.')))
    .pipe(gulp.dest(`${config.public}/styles`))
));

gulp.task('styles', () => (
  gulp.src([`${config.src}/styles/app.scss`, `${config.tmp}/*.scss`])
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(inject(gulp.src([`${config.tmp}/*.scss`], { read: false }), {
      starttag: '/* inject:imports */',
      endtag: '/* endinject */',
      transform: filepath => `@import "../../../${filepath}";`,
    }))
    .pipe(sass({
      outputStyle: production ? 'compressed' : 'nested',
    }).on('error', (err) => {
      error = true;
      log(' 🚨 ', err.stack);
    }))
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
  // hadle all images that are not svg
  gulp.src([`${config.src}/images/**/*.*`, `!${config.src}/images/sprite/*.svg`])
    .pipe(imagemin({
      progressive: true,
    }))
    .pipe(gulp.dest(`${config.public}/images`))
    .on('end', () => gulp.src(`${config.public}/images/*`)
      .pipe(webp())
      .pipe(gulp.dest(`${config.public}/images`)));

  // handle svg
  gulp.src(`${config.src}/images/**/*.svg`)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false,
      }],
    }))
    .pipe(gulp.dest(`${config.tmp}/svgs`));

  // create a sprite
  gulp.src(`${config.src}/images/sprite/*.svg`)
    .pipe(svgSprite({
      svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false,
      },
      mode: {
        inline: true,
        symbol: {
          dest: '.',
          sprite: 'sprite.svg',
        },
      },
    }))
    .pipe(gulp.dest(`${config.public}/images`));
});

gulp.task('html', ['styles'], () => {
  gulp.src(`${config.srcBase}/*.html`)
    .pipe(greplace(/<link href="styles\/core.min.css"[^>]*>/, () => {
      const style = fs.readFileSync(`${config.public}/styles/core.min.css`, 'utf8');
      return `<style>\n${style}\n</style>`;
    }))
    .pipe(greplace(/<!-- svg-sprite -->/, () => {
      const style = fs.readFileSync(`${config.public}/images/sprite.svg`, 'utf8');
      return `<div style="display:none;">\n${style}\n</div>`;
    }))
    .pipe(greplace(/{version}/g, () => {
      const pkg = getPackageJson();
      return pkg.version;
    }))
    .pipe(gulp.dest(config.public));
});

gulp.task('move', ['clean-static'], () => {
  const staticFiles = [
    `${config.srcBase}/*.html`,
    `${config.srcBase}/manifest.json`,
  ];

  gulp.src(staticFiles)
    .pipe(gulp.dest(config.public));
});

gulp.task('getversion', () => JSON.parse(fs.readFileSync('./package.json', 'utf8')).version);

gulp.task('bump', () => {
  let type = 'patch';
  if (argv.minor) type = 'minor';
  if (argv.major) type = 'major';

  return gulp.src('./package.json')
    .pipe(bump({ type }))
    .pipe(gulp.dest('./'));
});

gulp.task('generate-service-worker', (cb) => {
  swPrecache.write(join(config.public, 'sw.js'), {
    staticFileGlobs: [`${config.public}/**/*.{js,html,css,png,jpg,gif,webp}`],
    stripPrefix: config.public,
  }, cb);
});

gulp.task('watch', cb => (
  runSequence('clean', () => {
    runSequence(tasks, 'browser-sync', () => {
      runSequence('watch-files', () => {
        cb();
        log(' 👀 ', 'Watching files for changes...');
      });
    });
  })
));

gulp.task('build', (cb) => {
  production = true;
  return runSequence('clean', () => {
    runSequence(tasks, () => {
      if (!error) {
        runSequence('bump', () => {
          cb();
          log(' 🚀 ', 'Build complete.');
        });
      }
    });
  });
});

gulp.task('default', cb => (
  runSequence('clean', () => {
    runSequence(tasks, () => cb());
  })
));
