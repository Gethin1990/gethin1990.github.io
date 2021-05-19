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
function isMobile(){
    return window.matchMedia("only screen and (max-width: 680px)").matches;
}
/* 轮播背景图片 */
$(function () {
	$.backstretch([
		  "https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/ink1-2021-05-17-20-04-31.gif",
          "https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/ink2-2021-05-17-20-27-18.gif",
          "https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/ink3-2021-05-17-20-29-18.gif"
	], { duration: 60000, fade: 1500 });
});
/* 站点运行时间 */
function runtime() {
	window.setTimeout("runtime()", 1000);
	/* 请修改这里的起始时间 */
    let startTime = new Date('05/05/2021 15:00:00');
    let endTime = new Date();
    let usedTime = endTime - startTime;
    let days = Math.floor(usedTime / (24 * 3600 * 1000));
    let leavel = usedTime % (24 * 3600 * 1000);
    let hours = Math.floor(leavel / (3600 * 1000));
    let leavel2 = leavel % (3600 * 1000);
    let minutes = Math.floor(leavel2 / (60 * 1000));
    let leavel3 = leavel2 % (60 * 1000);
    let seconds = Math.floor(leavel3 / (1000));
    let runbox = document.getElementById('run-time');
    runbox.innerHTML = '本站已运行<i class="far fa-clock fa-fw"></i> '
        + ((days < 10) ? '0' : '') + days + ' 天 '
        + ((hours < 10) ? '0' : '') + hours + ' 时 '
        + ((minutes < 10) ? '0' : '') + minutes + ' 分 '
        + ((seconds < 10) ? '0' : '') + seconds + ' 秒 ';
}
runtime();
