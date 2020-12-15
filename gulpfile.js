(() => {
  ("use strict");

  /**************** gulpfile.js configuration ****************/

  const dir = {
    src: "frontend/",
    build: "build/",
  };

  /*
   *  HTML CONFIG ---------------------------------------------
   */
  const htmlConfig = {
    src: dir.src + "templates/**/*",
    build: dir.build,
    minOpts: {
      optimizationLevel: 5,
    },
  };

  /*
   *  CSS CONFIG ---------------------------------------------
   */
  const cssConfig = {
    src: dir.src + "scss/main.scss",
    watch: dir.src + "scss/**/*",
    build: dir.build + "css/",
    sassOpts: {
      //sourceMap       : devBuild,
      imagePath: "/images/",
      precision: 3,
      errLogToConsole: true,
    },
    postCSS: [
      require("autoprefixer")({
        browsers: ["> 1%"],
      }),
      require("cssnano"),
    ],
  };

  /*
   *  IMAGE CONFIG ---------------------------------------------
   */
  const imgConfig = {
    src: dir.src + "images/**/*",
    build: dir.build + "img/",
    minOpts: {
      optimizationLevel: 5,
    },
  };

  /*
   *  FONT CONFIG ---------------------------------------------
   */
  const fontConfig = {
    src: dir.src + "fonts/**/*",
    build: dir.build + "assets/fonts/",
    minOpts: {
      optimizationLevel: 5,
    },
  };

  /*
   *  LOAD ALL MODULES ---------------------------------------------
   */
  const // development or production
    devBuild =
      (process.env.NODE_ENV || "development").trim().toLowerCase() ===
      "development",
    gulp = require("gulp"),
    noop = require("gulp-noop"),
    newer = require("gulp-newer"),
    size = require("gulp-size"),
    imagemin = require("gulp-imagemin"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    htmlclean = require("gulp-htmlclean");

  console.log("Gulp", devBuild ? "development" : "production", "build");

  const { task } = require("gulp");

  /*
   *  IMAGES ---------------------------------------------
   */
  function images() {
    return gulp
      .src(imgConfig.src)
      .pipe(newer(imgConfig.build))
      .pipe(imagemin(imgConfig.minOpts))
      .pipe(size({ showFiles: true }))
      .pipe(gulp.dest(imgConfig.build));
  }
  exports.images = images;

  /*
   *  FONTS ---------------------------------------------
   */
  function fonts() {
    return gulp
      .src(fontConfig.src)
      .pipe(newer(fontConfig.build))
      .pipe(size({ showFiles: true }))
      .pipe(gulp.dest(fontConfig.build));
  }
  exports.fonts = fonts;

  /*
   *  CSS ---------------------------------------------
   */
  function css() {
    console.log("::::::: START: GULP / CSS  :::::::");
    return (
      gulp
        .src(cssConfig.src)
        // .pipe(sourcemaps ? sourcemaps.init() : noop())
        .pipe(sass(cssConfig.sassOpts).on("error", sass.logError))
        .pipe(postcss(cssConfig.postCSS))
        // .pipe(sourcemaps ? sourcemaps.write() : noop())
        .pipe(size({ showFiles: true }))
        .pipe(gulp.dest(cssConfig.build))
      // .pipe(browsersync ? browsersync.reload({ stream: true }) : noop())
    );
  }
  exports.css = css;

  /*
   *  JS ---------------------------------------------
   */
  function js() {
    console.log("::::::: START: GULP / JS  :::::::");
    const out = dir.build + "js/";
    console.log("output folder: " + out);

    return gulp
      .src(dir.src + "js/**/*")
      .pipe(newer(out))
      .pipe(size({ showFiles: true }))
      .pipe(gulp.dest(out));
  }
  exports.js = js;

  /*
   *  HTML ---------------------------------------------
   */
  function html() {
    console.log("::::::: START: GULP / HTML  :::::::");

    return (
      gulp
        .src(htmlConfig.src)
        .pipe(newer(htmlConfig.build))
        // .pipe(htmlclean())
        .pipe(size({ showFiles: true }))
        .pipe(devBuild ? noop() : htmlclean())
        .pipe(gulp.dest(htmlConfig.build))
    );
  }
  exports.html = html;

  /**************** watch task ****************/
  function watch(done) {
    // html
    gulp.watch(htmlConfig.src, html);
    // CSS changes
    gulp.watch(cssConfig.watch, css);
    //  js
    gulp.watch(dir.src + "js/**/*", js);
    // image changes
    gulp.watch(imgConfig.src, images);
    console.log("::::::: START: GULP / WATCHER RUNNING  :::::::");
    done();
  }
  task(watch);
  /**************** default task ****************/
  // exports.default = gulp.series(exports.css, watch, server);
  exports.default = gulp.series(html, css, js, watch, images);
})();
