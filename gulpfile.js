"use strict";

const dirs = {
  source: "src",
  build: "dist",
};

const gulp = require("gulp");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const del = require("del");
const browserSync = require("browser-sync").create();
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const cleanCSS = require("gulp-cleancss");
const wait = require("gulp-wait");
const htmlbeautify = require("gulp-html-beautify");

let postCssPlugins = [autoprefixer()];

gulp.task("style", function () {
  return gulp
    .src(dirs.source + "/scss/style.scss")
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "Styles compilation error",
            message: err.message,
          })(err);
          this.emit("end");
        },
      })
    )
    .pipe(wait(100))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(postCssPlugins))
    .pipe(sourcemaps.write("/"))
    .pipe(gulp.dest(dirs.build + "/css/"))
    .pipe(browserSync.stream({ match: "**/*.css" }))
    .pipe(rename("style.min.css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest(dirs.build + "/css/"));
});

gulp.task("html", function () {
  return gulp
    .src(dirs.source + "/*.html")
    .pipe(htmlbeautify())
    .pipe(gulp.dest(dirs.build));
});

gulp.task("clean", function () {
  return del([dirs.build + "/**/*", "!" + dirs.build + "/readme.md"]);
});

gulp.task("build", gulp.series("clean", "style", "html"));

gulp.task(
  "serve",
  gulp.series("build", function () {
    browserSync.init({
      server: dirs.build,
      startPath: "index.html",
      open: true,
      port: 3000,
    });

    gulp.watch(
      [
        dirs.source + "/scss/style.scss",
        dirs.source + "/scss/variables.scss",
        dirs.source + "/scss/fonts.scss",
        dirs.source + "/scss/base.scss",
        dirs.source + "/blocks/**/*.scss",
      ],
      gulp.series("style")
    );

    gulp.watch([dirs.source + "/**/*.html"], gulp.series("html", reload));
  })
);

function reload(done) {
  browserSync.reload();
  done();
}

gulp.task("default", gulp.series("serve"));
