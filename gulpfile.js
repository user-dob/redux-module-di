const gulp = require("gulp");
const tslint = require("tslint");
const gulpTslint = require("gulp-tslint");
const typescript = require("typescript");
const tsc = require("gulp-typescript");
const del = require("del");

gulp.task("clean", () => {
    return del([
        "lib",
        "dts"
    ]);
});

gulp.task("lint", () => {
    
    var program = tslint.Linter.createProgram("./tsconfig.json");
    
    return gulp.src([
        "src/**/**.{ts, tsx}",
        "test/**/**.test.{ts, tsx}"
    ])
    .pipe(gulpTslint({
        formatter: "stylish",
        program
    }))
    .pipe(gulpTslint.report());

});

const tsLibProject = tsc.createProject("tsconfig.json", {
    module: "es2015",
    typescript
});

gulp.task("build", () => {
    return gulp.src([
        "src/**/*.{ts,tsx}"
    ])
    .pipe(tsLibProject())
    .on("error", (err) => {
        process.exit(1);
    })
    .js.pipe(gulp.dest("lib/"));
});

const tsDtsProject = tsc.createProject("tsconfig.json", {
    declaration: true,
    noResolve: false,
    typescript
});

gulp.task("build-dts", () => {
    return gulp.src([
        "src/**/*.{ts,tsx}"
    ])
    .pipe(tsDtsProject())
    .on("error", (err) => {
        process.exit(1);
    })
    .dts.pipe(gulp.dest("dts"));
});
