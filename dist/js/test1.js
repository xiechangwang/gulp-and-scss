"use strict";

;

(function () {
  function foo() {
    return 123;
  }

  console.log(foo());
  var oUl = document.querySelector('.oUl');
  var navList = [{
    text: '首页'
  }, {
    text: '新闻'
  }, {
    text: '简介'
  }];
  navList.forEach(function (element) {
    oUl.innerHTML += "<li>\n\t\t\t\t\t\t\t<span>".concat(element.text, "</span>\n\t\t\t\t\t\t</li>");
  });
})();