//  阻止ios默认事件
$(document).on("touchmove", function (ev) {
    ev.preventDefault();
});


$(function () {
    var $main = $("#main");
    var $list = $("#list");
    var $li = $list.find(">li");
    var viewHeight = $(window).height();
    $main.css("height", viewHeight);

    // 当前屏幕
    function nowViewWidth() {
        var w = 640 * viewHeight / 960;
        w = w > 640 ? w : 640;
        return w;
    }

    // cover 出的可视区外的图片宽度
    var outerWidth = (640 - nowViewWidth()) / 2;
    showLoading();
    slideCanvas();
    slideImg();
    function slideCanvas() {
        var $c = $("#c1");
        var gc = $c.get(0).getContext("2d");
        var img = new Image();
        var bBtn = true;

        $c.attr("heigh", viewHeight);

        img.src = "img/a.png";
        img.onload = function () {
            gc.drawImage(img, outerWidth, 0, nowViewWidth(), viewHeight);
            gc.fillStyle = "blue";
            gc.lineWidth = 40;
            gc.lineCap = "round";
            gc.globalCompositeOperation = "destination-out";

            $c.on("touchstart", function (ev) {
                var touch = ev.originalEvent.changedTouches[0];
                var x = touch.pageX - $(this).offset().left;
                var y = touch.pageY - $(this).offset().top;

                // gc.arc(x,y,100,0,360*Math.PI/180);
                // gc.fill();
                if (bBtn) {
                    bBtn = false;
                    gc.moveTo(x, y);
                    gc.lineTo(x + 1, y + 1);
                } else {
                    gc.lineTo(x, y);
                }

                gc.stroke();

                $c.on("touchmove.move", function (ev) {
                    var touch = ev.originalEvent.changedTouches[0];
                    var x = touch.pageX - $(this).offset().left;
                    var y = touch.pageY - $(this).offset().top;
                    gc.lineTo(x, y);
                    gc.stroke();
                });
                $c.on("touchend.move", function (ev) {
                    // canvas区域隐含的像素数据
                    var imgData = gc.getImageData(0,0,640,viewHeight);

                    var allPx = imgData.width * imgData.height;

                    var num = 0;
                    // 透明元素的数量
                    for (var i = 0; i < allPx; i++) {
                        if (imgData.data[4 * i + 3] == 0) {
                            num++;
                        }
                    }

                    if (num > allPx / 2) {
                        $c.animate({opacity: 0}, 1000, function () {
                            $(this).remove();
                            cjAnimate[0].inAn();
                            showMusic();
                        });
                    }

                    $c.off("move");
                });

            });
        };
    }

    // 上下触摸滑屏
    function slideImg() {
        var startY = 0;
        var step = 1/4;
        var nowIndex = 0;
        var nextorprevIndex = 0;
        var bBtn = true;

        $li.css("backgroundPosition", outerWidth + "px 0");
        $li.on("touchstart", function (ev) {
            if(bBtn) {
                bBtn = false;
                var touch = ev.originalEvent.changedTouches[0];
                startY = touch.pageY;
                nowIndex = $(this).index();

                $li.on("touchmove.move", function (ev) {
                    var touch = ev.originalEvent.changedTouches[0];
                    // 兄弟节点隐藏
                    $(this).siblings().hide();
                    if(touch.pageY < startY) { // 向上滑动
                        nextorprevIndex = nowIndex == $li.length - 1 ? 0 : nowIndex + 1;
                        $li.eq(nextorprevIndex).css("transform", "translate(0," + (viewHeight + touch.pageY - startY) + "px)");

                    } else { // 向下滑动
                        nextorprevIndex = nowIndex == 0 ? $li.length - 1 : nowIndex - 1;
                        $li.eq(nextorprevIndex).css("transform", "translate(0," + (-viewHeight + touch.pageY - startY) + "px)");
                    }
                    $li.eq(nextorprevIndex).show().addClass("zIndex");
                    $(this).css("transform", "translate(0," + (touch.pageY - startY) * step + "px) scale(" + (1 - Math.abs((touch.pageY - startY))*step/viewHeight ) + ")");
                });
                $li.on("touchend", function (ev) {
                    var touch = ev.originalEvent.changedTouches[0];
                    if(touch.pageY < startY) { // 向上滑动
                        $li.eq(nowIndex).css("transform", "translate(0," + (-viewHeight * step) + "px) scale(" + (1 - step) + ")");
                    } else { // 向下滑动
                        $li.eq(nowIndex).css("transform", "translate(0," + (viewHeight * step) + "px) scale(" + (1 - step) + ")");
                    }
                    $li.eq(nowIndex).css("transition", ".3s");
                    $li.eq(nextorprevIndex).css("transform", "translate(0,0)");
                    $li.eq(nextorprevIndex).css("transition", ".3s");
                    $li.off(".move");
                });
            }
        });
        $li.on("transitionEnd webkitTransitionEnd",function(ev){
            // 如果不是当前场景的li就不执行
            if(!$li.is(ev.target)) {
                return;
            }
            resetFn();
            if(cjAnimate[nowIndex]) {
                cjAnimate[nowIndex].outAn();
            }

            if(cjAnimate[nextorprevIndex]) {
                cjAnimate[nextorprevIndex].inAn();
            }

        });
        function resetFn(){
            $li.css('transform','');
            $li.css('transition','');
            $li.eq(nextorprevIndex).removeClass('zIndex').siblings().hide();
            bBtn = true;
        }
    }
    var cjAnimate = [
        {
            inAn: function () {
                // 延迟实现 transition 效果
                setTimeout(function () {
                    var $liChild = $li.eq(0).find("li");
                    $liChild.css("opacity", 1);
                    $liChild.css("transform", "translate(0, 0)");
                    $liChild.css("transition", "1s");
                }, 100);
            },
            outAn: function () {
                var $liChild = $li.eq(0).find("li");
                $liChild.css("opacity", 0);
                $liChild.css("transition", "");
                $liChild.filter(":odd").css("transform", "translate(-200px, 0)");
                $liChild.filter(":even").css("transform", "translate(300px, 0)");
            }
        },
        {
            inAn: function () {
                // 延迟实现 transition 效果
                setTimeout(function () {
                    var $liChild = $li.eq(1).find("li");
                    $liChild.attr("class", "");
                    $liChild.css("transform", "rotate(720deg");
                    $liChild.css("transition", "1s");
                }, 100);
            },
            outAn: function () {
                var $liChild = $li.eq(1).find("li");
                $liChild.attr("class", "active");
                $liChild.css("transform", "");
                $liChild.css("transition", "");
            }
        },
        {
            inAn: function () {
                // 延迟实现 transition 效果
                setTimeout(function () {
                    var $divChild = $li.eq(2).find("div");
                    $divChild.css("transform", "rotateY(360deg)");
                    $divChild.css("transition", "1s");
                }, 100);
            },
            outAn: function () {
                var $divChild = $li.eq(2).find("div");
                $divChild.css("transform", "");
                $divChild.css("transition", "");
            }
        },
        {
            inAn: function () {
                // 延迟实现 transition 效果
                setTimeout(function () {
                    var $liChild = $li.eq(3).find("li");
                    $liChild.attr("class", "");
                    $liChild.css("transition", "1s");
                }, 100);
            },
            outAn: function () {
                var $liChild = $li.eq(3).find("li");
                $liChild.attr("class", "active");
                $liChild.css("transition", "");
            }
        }
    ]

    // 场景1
    // cjAnimate[0].outAn();
    // cjAnimate[0].inAn();
    //cjAnimate[1].outAn();
    //cjAnimate[1].inAn();
    //cjAnimate[2].outAn();
    //cjAnimate[2].inAn();
    //cjAnimate[3].outAn();
    //cjAnimate[3].inAn();

    // 出场动画准备
    $.each(cjAnimate, function (i, obj) {
        obj.outAn();
    });

    /**
     * 音乐播放
     */
    function showMusic() {
        var $music = $("#music");
        var $a1 = $("#a1");
        var onoff = true;

        $music.on("touchstart", function () {
            if(onoff) {
                $music.attr("class", "active");
                $a1.get(0).play();
            } else {
                $music.attr("class", "");
                $a1.get(0).pause();
            }
            onoff = !onoff;
        });
        $music.trigger("touchstart");

    }

    /**
     * 图片预加载
     */
    function showLoading() {
        var arr = ["arr.png","b.png","c.png","d.png","e.png","f.png","g.png","h.png","i.png","a.png","c1.png","c2.png","c3.png","c4.png","c5.png","c6.png"];
        var num = 0;

        $.each(arr, function (i, imgSrc) {
            var objImg = new Image();
            objImg.src = "img/" + imgSrc;

            objImg.onload = function () {
                num++;
                if (num == arr.length) {
                    $("#loading").animate({opacity: 0}, 1000, function () {
                  $(this).remove();
                    })
                }
            };
            objImg.onerror = function () {
                $("#loading").animate({opacity: 0}, 1000, function () {
                    $(this).remove();
                })
            }
        })
    }
});
