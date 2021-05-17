$(".dropdown").each(function() {
    $(this).on("click", function(e) {
        // 收起其他菜单
        if (isMobile()) {
            $(".menu").find(".dropdown-menu").not($(this).children("div")).slideUp("fast");    
        } else {
            $(".menu-inner").find(".dropdown-menu").not($(this).children("div")).slideUp("fast");    
        }
        e.stopPropagation(); 
        var downmenu = $(this).children("div");
        // 展开菜单
        downmenu.slideToggle("fast");
        // 点击其他地方，隐藏菜单
        if (downmenu.is(":visible")) {
            $(document).one("click", function() {   
                downmenu.slideUp("fast");
            });
        }
    });
});

/* 轮播背景图片 */
$(function () {
	$.backstretch([
		  "https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/ink1-2021-05-17-20-04-31.gif",
          "https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/ink2-2021-05-17-20-27-18.gif",
          "https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/ink3-2021-05-17-20-29-18.gif"
	], { duration: 60000, fade: 1500 });
});
function isMobile(){
    return window.matchMedia("only screen and (max-width: 680px)").matches;
}
