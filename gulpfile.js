var gulp = require("gulp")
var browserify = require("browserify")

var del = require("del")
var vinyl_buffer = require("vinyl-buffer")
var vinyl_source = require("vinyl-source-stream")

gulp.task("default", ["build"])

gulp.task("build", function() {
    del(["./build"], function() {
        gulp.start([
            "build:markup",
            "build:scripts",
            "build:styles",
            "build:stuffs"
        ])
    })
})

gulp.task("build:markup", function() {
    gulp.src("./source/index.html")
        .pipe(gulp.dest("./build"))
})

gulp.task("build:scripts", function() {
    browserify("./source/index.js").bundle()
        .pipe(vinyl_source("index.js"))
        .pipe(gulp.dest("./build"))
})

gulp.task("build:styles", function() {
    gulp.src("./source/index.css")
        .pipe(gulp.dest("./build"))
})

gulp.task("build:stuffs", function() {
    gulp.src(["./source/**/*", "!./source/**/*.html",
              "!./source/**/*.js", "!./source/**/*.css"])
        .pipe(gulp.dest("./build"))
})

gulp.task("watch", function() {
    gulp.watch("./source/**/*", function() {
        gulp.start("build")
    })
})
