$(".dropdown").each(function () {
    $(this).on("click", function (e) {
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
            $(document).one("click", function () {
                downmenu.slideUp("fast");
            });
        }
    });
});
function isMobile() {
    return window.matchMedia("only screen and (max-width: 680px)").matches;
}
/* 主题背景图 */
$(".theme-switch").each(function () {
    $(this).on("click", function (e) {
        if (window.localStorage && localStorage.getItem('theme')) {
            // light
            if (localStorage.getItem('theme') === 'dark') {
                $.backstretch([
                    "https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/ink1-2021-05-17-20-04-31.gif"])
            } else {
                //dark
                $.backstretch([
                    "https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/black.jpg"])
            }

        }
    })
});

$(document).ready(function () {
    if ($('#rewardButton')[0]) {
        $("#rewardButton").on("click", function () {
            $('#QR').slideToggle();
        });
    }
    $.backstretch([
        "https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/ink1-2021-05-17-20-04-31.gif"])

    if (window.localStorage && localStorage.getItem('theme')) {
        if (localStorage.getItem('theme') === 'dark') {
            $.backstretch([
                "https://cdn.jsdelivr.net/gh/Gethin1990/PicBed/BlogImg/black.jpg"])
        }

    }
});
