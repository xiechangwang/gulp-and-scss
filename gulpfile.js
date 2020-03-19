/*gulp@4.0.0 + gulp-connect实现自动刷新浏览器*/
var gulp=require('gulp');
var concat = require('gulp-concat');	//合并js,css
var rename = require('gulp-rename');	//重命名
var uglify = require('gulp-uglify');	//压缩js
var cleanCSS = require('gulp-clean-css');	//压缩css
var less = require('gulp-less');	//处理less为css
var fileinclude = require('gulp-file-include');	//模板文件嵌入
var connect=require('gulp-connect');	//本地服务
var babel = require('gulp-babel');	//es6
var sass = require('gulp-sass');

sass.compiler=require('node-sass');

/*定义web服务器任务*/
function serve(){
	var options={
		root:'dist/',
		port:1000, /*自定义端口*/
		livereload:true,/*实现自动刷新，从此不再需要手动刷新页面了*/
		};
		connect.server(options);/*启动本地服务，http://localhost:1000*/
};

/* 定义bable */
gulp.task('bable', () =>
    gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('./src/js'))
		.pipe(connect.reload())
);

/* 定义公用模板 */
gulp.task('template',()=>{
    return gulp.src(['./*.html', '!src/componet/*.html'])
			.pipe(fileinclude({
			  prefix: '@@',
			  basepath: '@file'
			}))
			.pipe(gulp.dest('./dist'))/*输出目录*/
		.pipe(connect.reload())
});

/*定义html任务*/
gulp.task('html',()=>{
	return gulp.src(['./*.html','!src/compont/*.html'])
	.pipe(fileinclude({
				prefix:'@@',
				basepath:'@file'
			}))
	.pipe(gulp.dest('./dist'))/*输出目录*/
	.pipe(connect.reload()/*修改后及时更新浏览器*/)
});

/* 定义less任务 */
gulp.task('less',()=>{
	return gulp.src('./src/less/*.less')
			.pipe(less())
			.pipe(gulp.dest('./src/css'))
			.pipe(connect.reload())
});

/* 定义sass任务 */
gulp.task('sass',()=>{
	return gulp.src('./src/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
	    .pipe(gulp.dest('./src/css'))
		.pipe(connect.reload())
	
});
/*定义css任务*/
gulp.task('css',()=>{
	return gulp.src('./src/css/*.css')
	.pipe(concat('build.css'))
	.pipe(gulp.dest('./dist/css'))
	.pipe(cleanCSS({compatibility: 'ie8'}))	//兼容到ie8
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('./dist/css'))/*输出目录*/
	.pipe(connect.reload())
});
/*定义js任务*/
gulp.task('js',()=>{
	return gulp.src('./src/js/*.js')
	.pipe(concat('build.js'))
	.pipe(gulp.dest('./dist/js'))/*输出目录*/
	.pipe(connect.reload())
});
/*watch监听，不需要在cmd中重复执行gulp xxx*/
gulp.task('watch',()=>{
	gulp.watch('./compont/*.html',gulp.series('template'))
	gulp.watch('./src/js/*.js',gulp.series('bable'));/*bable有修改时监听*/
	gulp.watch('./*.html',gulp.series('html'));/*html有修改时监听*/
	gulp.watch('./src/less/*.less',gulp.series('less'));/*less有修改时监听*/
	gulp.watch('./src/sass/*.scss',gulp.series('sass'));/*sass有修改时监听*/
	gulp.watch('./src/css/*.css',gulp.series('css'));/*css有修改时监听*/
	gulp.watch('./src/js/*.js',gulp.series('js'));/*js有修改时监听*/
});
/*导出*/
exports.default=gulp.series('template','bable','html','less','sass','css','js',gulp.parallel('watch',serve));