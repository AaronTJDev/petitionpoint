
const { series } = require('gulp');
const gulp = require('gulp');
const less = require('gulp-less');

// Where Less files are located
const srcDir = './src/assets/style/less';
// Where CSS files will be generated
const dstDir = './src/assets/style/css';

gulp.task('less', async function() {
	gulp
		.src(`${srcDir}/*.less`)
		.pipe(less())
		.pipe(gulp.dest(dstDir));
});

gulp.task('default', gulp.series('less', async function() {
	gulp.watch(`${srcDir}/*.less`, series('less'));
}));