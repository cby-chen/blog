/* 获取渲染好的目录的高度 */
menuHeight = document.getElementsByClassName("index-menu")[0].offsetHeight;

/* 获取容器高度 */
containHeight = document.getElementsByClassName("joe_aside__item-contain")[0].offsetHeight;
/* 获取容器 title 的高度 */
titleHeight = document.getElementsByClassName("joe_aside__item-title")[0].offsetHeight;
/* 获取整个目录侧边栏对象 */
aside = document.getElementsByClassName("menutree")[0];

// 定义一个函数来修改目录的显示长度，从而使侧边栏能自适应目录的高度，避免出现大片空白部分
function changeMenuHeight(){    
    /* 调整容器高度 */
    aside.style.height = titleHeight + containHeight + "px";
}

// 如果目录的高度小于500px，调用函数将目录修改为实际高度，反之则将侧边栏的高度固定为500px
if(menuHeight < 500){
    changeMenuHeight();
} else {
    aside.style.height = "700px";
}

