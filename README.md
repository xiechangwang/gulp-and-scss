#安装 gulp 命令行工具
npm install --global gulp-cli

#创建项目目录并进入
npx mkdirp my-project

cd my-project

#在项目目录下创建 package.json 文件
npm init

#安装 gulp，作为开发时依赖项
npm install --save-dev gulp

#检查 gulp 版本
gulp --version || gulp -v

#创建 gulpfile 文件
利用任何文本编辑器在项目大的根目录下创建一个名为 gulpfile.js 的文件
var gulp=require('gulp');

gulp.task('任务名',()=>{
	return gulp.src('导入文件根目录')	
			.pipe(gulp.dest('输出目录'))
});

#多插件安装示例
npm install gulp-concat gulp-rename gulp-less --save-dev

########################################################
#scss
--src下创建sass文件夹
	--创建.scss

#Sass 变量	
#Sass 变量使用 $ 符号
$myColor: red;

body {
  color: $myColor;
}

#Sass 嵌套规则与属性
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: inline-block;
  }
  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}

#Sass @import 导入文件
html,
body,
ul,
ol {
  margin: 0;
  padding: 0;
}
#以上是reset.scss代码

@import "reset";
body {
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  color: red;
}

#Sass @mixin 与 @include
@mixin important-text {
  color: red;
  font-size: 25px;
  font-weight: bold;
  border: 1px solid blue;
}

.danger {
  @include important-text;
}

#可变参数（有时，不能确定一个混入（mixin）或者一个函数（function）使用多少个参数，这时我们就可以使用 ... 来设置可变参数）
@mixin box-shadow($shadows...) {
      -moz-box-shadow: $shadows;
      -webkit-box-shadow: $shadows;
      box-shadow: $shadows;
}

.shadows {
  @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
}

#Sass @extend 与 继承
.button-basic  {
  border: none;
  padding: 15px 30px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.button-report  {
  @extend .button-basic;
}