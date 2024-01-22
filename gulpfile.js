const {src, dest, watch, parallel} = require("gulp");

//Imagenes
const imagemin = require("gulp-imagemin")
const cache = require("gulp-cache")
const avif = require("gulp-avif")
const webp = require("gulp-webp")

//CSS
const sass = require('gulp-sass')(require('sass')); //llama al script de sass que se encuentra en el package.json y conecta gulp con sass
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

function css (done){ 
    src('src/scss/**/*.scss') //identificar el archivo sass
        .pipe(sourcemaps.init())
        .pipe( plumber() )
        .pipe( sass()) //compilarlo
        .pipe( postcss([autoprefixer(), cssnano() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/css"))  //almacenar en el disco

    done();
}
// Imagenes webp
function versionWebp (done){
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
    .pipe( webp(opciones) )
    .pipe( dest('build/img') )
    done();
}
// Imagenes AVIF
function versionAvif (done){
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
    .pipe( avif(opciones) )
    .pipe( dest('build/img') )
    done();
}

//aligerar imagenes jpg

function imagenes(done){
    const opciones = {
        optimizationLevel:3
    }

    src('src/img/**/*.{png,jpg}')
        .pipe( cache(imagemin(opciones) ) )
        .pipe(dest('build/img') )

    done();
}

//javascript
const terser = require('gulp-terser-js');

function javascript(done){
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe( terser() )
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));

    done();
}

function dev(done){
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javascript)

    done();
}

exports.css = css;
exports.js = javascript;
exports.versionWebp = versionWebp;
exports.imagenes = imagenes;
exports.versionAvif = versionAvif;
exports.dev = parallel ( imagenes, versionWebp,versionAvif, javascript, dev );