// var syntax = 'sass', // Syntax: sass or scss;
//     gulpversion = '4'; // Gulp version: 3 or 4

// var gulp = require('gulp'),




var gulp          = require('gulp');
var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');
var rigger        = require('gulp-rigger');
var connect       = require('gulp-connect');
var livereload    = require('gulp-livereload');
var open          = require('gulp-open');
var imagemin      = require('gulp-imagemin');
var autoprefixer  = require('gulp-autoprefixer');
var del           = require('del');
var plumber       = require('gulp-plumber');
var concat        = require('gulp-concat');
var rename        = require('gulp-rename');
var cleancss      = require('gulp-clean-css');
var uglify        = require('gulp-uglify');

var browserSync = require('browser-sync').create();


var prefix = '';

var path = {
  tempBuild: {
    js: prefix+'src/script/',
    css: prefix+'src/style/'
  },
  build: {
    html: prefix+'production/',
    prod_html: prefix+'production/*.html',
    js: prefix+'production/js/',
    css: prefix+'production/css/',
    img: prefix+'production/img/',
    fonts: prefix+'production/fonts/',

  },
  src: {
    html: prefix+'src/*.html',
    sass: prefix+'src/scss/**/*.scss',
    js: prefix+'src/js/*.js',
    css: prefix+'src/css/*.css',
    img: prefix+'src/img/**/*.*',
    fonts: prefix+'src/fonts/**/*.*',

  },
  watch: {
    html: prefix+'src/**/*.html',
    js: prefix+'src/js/**/*.js',
  },
  vendor: {
    css: prefix+'src/vendor/**/*.css',
    js: prefix+'src/vendor/**/*.js'
  },
  clean: {
    html: prefix+'production/*.html',
    css: prefix+'production/css',
    js: prefix+'production/js',
    fonts: prefix+'production/fonts',
    img: prefix+'production/img',
  },
  port: 8880,
  cleanAll: prefix+'production/*'

};

gulp.task('cleanAll', function() {
  return del.sync(path.cleanAll); 
});

gulp.task('html', function () {
 return gulp.src(path.src.html)
    .pipe(rigger())
    // .pipe(livereload())
    .pipe(plumber())
    .pipe(gulp.dest(path.build.html))
    .on('end', browserSync.reload);
});

gulp.task('scripts', function () {
 return gulp.src(path.src.js)
    // .pipe(plumber())
    .pipe(rigger())
    // .pipe(sourcemaps.init())
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.tempBuild.js))
});



/*Configuration/settings*/

var input = prefix+'src/scss/**/*.scss';
// var output = 'app/src/css';
var input_html = prefix+'production/*.html';

var options = {
  sass: {
    outputStyle: 'extended'
  }
};

/*Sass compilation*/

gulp.task('sass', function () {
  return gulp.src(path.src.sass)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass(options.sass).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.tempBuild.css));
});

/*Sass compilation End*/

/*IMG Compressing*/

gulp.task('image', function () {
  return gulp.src(path.src.img)
    // .pipe(plumber())
    // .pipe(imagemin())
    .pipe(gulp.dest(path.build.img));
});

/*IMG Compressing End*/


/*compose css and js*/

gulp.task('allCss', function () {
  return gulp.src([path.vendor.css, path.tempBuild.css+'style.css'])
    .pipe(sourcemaps.init())
    // .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
    .pipe(concat('style.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css))
    .on('end', browserSync.reload);
});

gulp.task('allJs', function () {
 return gulp.src([
      prefix+'src/vendor/jquery/jquery-3.3.1.js',
      prefix+'src/vendor/customScrollBar/customScrollBar.js',
      path.tempBuild.js+'main.js'
    ])
    .pipe(plumber())
    .pipe(rigger())
    // .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(path.build.js))
    .on('end', browserSync.reload);
});

/*compose css and js End*/


/*fonts Files*/

gulp.task('fonts', function () {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});

/*fonts Files End*/

/*Server connect*/

// gulp.task('connect', function() {
//   return connect.server({
//     root: 'app/production/',
//     port: path.port,
//   });

// });
/*Server connect End*/

/*Browser Start*/

// gulp.task('chrome', function() {
//    var app = {
//         uri: 'http://localhost:'+path.port,
//         app: 'chrome'
//     };
//   return gulp.src(__filename)
//     .pipe(open(app));
// })


/*Browser Start End*/

gulp.task('serve', function() {

    browserSync.init({
        server: "./"+prefix+"production"
    });

    // gulp.watch("src/sass/*.sass", ['sass']);
    // gulp.watch("production/*.html").on('change', browserSync.reload);
    // gulp.watch("production", browserSync.reload);
});

/*browser-sync end*/

/*Watchers*/

gulp.task('watch', function() {

  gulp.watch([path.watch.html], gulp.series('html')).on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  gulp.watch([path.watch.js], gulp.series('scripts', 'allJs')).on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });

  // livereload.listen({port: 35829});
  gulp.watch(path.src.sass, gulp.series('sass', 'allCss')).on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });



  gulp.watch(path.src.img, gulp.series('image')).on('change', function(event) {
    console.log('File ' + event + ' was ' + event.type + ', running tasks...');
  });

  gulp.watch(path.src.fonts, gulp.series('fonts')).on('change', function(event) {
    console.log('File ' + event + ' was ' + event.type + ', running tasks...');
  });

  
  gulp.watch(path.build.prod_html, gulp.parallel('sass'));
  gulp.watch(path.build.prod_html).on('change', function(event) {
    // livereload();
  });
 
});
/*Watchers End*/

gulp.task('default', gulp.parallel('html', 'scripts', 'allJs', 'image', 'fonts', 'sass', 'allCss', 'serve', 'watch'));




// gulp.task('scripts', function () {
//     return gulp.src([
//         'app/production/js/main.js', // Always at the end
//         'frontend/web/js/site.js', // Always at the end
//     ])
//         .pipe(concat('main.min.js'))
//         .pipe(gulp.dest('frontend/web/js'))
// });
//
// gulp.task('copy_styles', function () {
//     return gulp.src('app/production/css/style.css').pipe(gulp.dest('frontend/web/css'));
// });
// gulp.task('copy_scripts', function () {
//     return gulp.src('app/production/js/vendors.js').pipe(gulp.dest('frontend/web/js'));
// });
// gulp.task('copy_fonts', function () {
//     return gulp.src('app/production/fonts/*')
//         .pipe(gulp.dest('frontend/web/fonts'));
// });
// gulp.task('copy_img', function () {
//     return gulp.src('app/production/img/**/*')
//         .pipe(gulp.dest('frontend/web/img'));
// });

// gulp.task('buildProject', gulp.series('scripts', 'copy_styles', 'copy_scripts', 'copy_fonts', 'copy_img'));