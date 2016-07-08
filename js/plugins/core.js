var __ns = function(fullNs) {
    var nsArray = fullNs.split('.');
    var evalStr = '';
    var ns = '';
    for (var i = 0, l = nsArray.length; i < l; i++) {
        i !== 0 && (ns += '.');
        ns += nsArray[i];
        evalStr += '( typeof ' + ns + ' === "undefined" && (' + ns + ' = {}) );';
    }
    evalStr !== '' && eval(evalStr);
}
var __noop = function() {};
var W = W || window;
__ns('H');

// 点击里
var senduserlog = function(btid, eventdes) {
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback",
        url: business_url + "user/log/add",
        data: {
            appId: busiAppId,
            openId: openid,
            eventDesc: encodeURIComponent(eventdes),
            eventId: btid,
            operateType: state,
            isPageLoad: false
        },
        showload: false
    })
}

var onpageload = function() {
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            jsonp: "callback",
            url: business_url + "user/log/add",
            data: {
                appId: busiAppId,
                openId: openid,
                eventDesc: "",
                eventId: "",
                operateType: state,
                isPageLoad: true
            },
            showload: false
        })
    }
    // 从data_collect.js转移过来的_S
var recordUserLog = function(openid, operateDesc, operateDomId) {
    $.ajax({
        type: "get",
        async: true,
        url: report_url + "api/log/report",
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            source: "yaotv",
            siteId: "source_" + serviceNo,
            usrType: "openid",
            usrId: openid,
            operateDesc: encodeURIComponent(operateDesc),
            operateDomId: operateDomId
        }
    });
};
/**
 * 记录用户操作日志
 * 点击流上报
 * @param openid 操作用户的openid
 * @param operateDesc 中文描述做的事情
 * @param operateDomId 操作的元素的id
 */
var recordUserOperate = function(openid, operateDesc, operateDomId) {
    recordUserLog(openid, operateDesc, operateDomId);
};
/**
 * 加载页面记录日志
 * 用来统计pv 和 uv
 * @param openid 操作用户的openid
 * @param operateDesc 进入的某页面名称
 * @param loadingTime 页面加载耗时多少毫秒
 */
var recordUserPage = function(openid, pageDesc) {
    recordUserLog(openid, pageDesc, "");
};
var callbackUserSaveHandler = function(data) {};
var getQueryString = function(name) {
    var currentSearch = decodeURIComponent(location.search.slice(1));
    if (currentSearch != '') {
        var paras = currentSearch.split('&');
        for (var i = 0, l = paras.length, items; i < l; i++) {
            items = paras[i].split('=');
            if (items[0] === name) {
                return items[1];
            }
        }
        return '';
    }
    return '';
};
// 图片延迟
var lazyload = function() {
    return {
        imgLoad: function() {
            // 获取窗口滚动条距离
            var scrollTop = $(window).scrollTop();
            $('img').each(function() {
                // 判断 视口高度+滚动条距离 与 图片元素距离文档原点的高度         
                var x = scrollTop + viewportHeight - $(this).position().top;
                // 如果大于0 即该元素能被浏览者看到，则将暂存于自定义属性loadpic的值赋值给真正的src            
                if (x > 0) {
                    $(this).attr('src', $(this).attr('loadpic'));
                }
            })
        },
        setVal: function() {
            setInterval(this.imgLoad, 100);
        }
    }
}
var getResult = function(url, data, callback, showloading, $target, isAsync) {
    if (showloading) {
        showLoading($target);
    }
    $.ajax({
        type: 'GET',
        async: typeof isAsync === 'undefined' ? false : isAsync,
        url: business_url + url,
        data: data,
        dataType: "jsonp",
        jsonp: callback,
        complete: function() {
            if (showloading) {
                hideLoading($target);
            }
        },
        success: function(data) {}
    });
};

var simpleTpl = function(tpl) {
    tpl = $.isArray(tpl) ? tpl.join('') : (tpl || '');

    return {
        store: tpl,
        _: function() {
            var me = this;
            $.each(arguments, function(index, value) {
                me.store += value;
            });
            return this;
        },
        toString: function() {
            return this.store;
        }
    };
};

var share = function(backUrl) {
    var t = simpleTpl(),
        $share_box = $('#share-box');

    if ($share_box.length == 0) {
        t._('<div class="share-box" id="share-box"></div>');
        $share_box = $(t.toString());
        $share_box.click(function(e) {
            $(this).hide();
        });
        $('body').append($share_box);
    } else {
        $share_box.show();
    }
};

var str2date = function(str) {

    str = str.replace(/-/g, '/');
    return new Date(str);
};

var timestamp = function(str) {
    return Date.parse(str2date(str));
};
var timeGetMD = function(str) {
        var obj = {};
        var date = new Date();
        obj.sampleTime = str2date(str);
        obj.Year = obj.sampleTime.getFullYear() + "年";
        obj.Month = (obj.sampleTime.getMonth() + 1 >= 10) ? ((obj.sampleTime.getMonth() + 1) + "月") : ("0" + (obj.sampleTime.getMonth() + 1) + "月");
        obj.Day = (obj.sampleTime.getDate() >= 10) ? (obj.sampleTime.getDate() + "日") : ("0" + obj.sampleTime.getDate() + "日");
        return obj;
    }
    // yyyy年MM月dd日 hh:mm:ss
var dateformat = function(date, format) {
    var z = {
        M: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds()
    };
    format = format.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2);
    });
    return format.replace(/(y+)/g, function(v) {
        return date.getFullYear().toString().slice(-v.length)
    });
}

var dateNum = function(num) {
    return num < 10 ? '0' + num : num;
};
//加载的loading
var showLoading = function($container, tips) {
    var t = simpleTpl(),
        spinnerSize = 146,
        width = $(window).width(),
        height = $(window).height(),
        $container = $container || $('body'),
        $spinner = $container ? $container.find('#spinner') : $('body').children('#spinner'),
        tips = tips || '努力加载中...';
    if ($spinner.length > 0) {
        $spinner.remove();
    };
    t._('<div id="spinner" class="spinner">')
        ._('<div class="new-spinner">')
        ._('<div class="new-overlay"></div>')
        ._('<div class="new-spinner-inner">')
        ._('<p class="new-spinner-spinner"></p>')
        ._('<p class="new-spinner-text">' + tips + '</p>')
        ._('</div>')
        ._('</div>')
        ._('</div>')
        ._('</div>');
    $spinner = $(t.toString()).css({
        'top': (height - spinnerSize) / 2,
        'left': (width - spinnerSize) / 2
    });
    $container.append($spinner);
};
//加载的loading
var showNewLoading = function($container, tips) {
    var t = simpleTpl(),
        spinnerSize = 100,
        width = $(window).width(),
        height = $(window).height(),
        $container = $container || $('body'),
        $fond = $container ? $container.find('#fond') : $('body').children('#fond'),
        tips = tips || '努力加载中~~~';
    if ($fond.length > 0) {
        $fond.remove();
    };
    t._(' <div align="center" class="fond" id="fond">')
        ._('<div class="contener_general">')
        ._('<div class="contener_mixte"><div class="ballcolor ball_1">&nbsp;</div></div>')
        ._('<div class="contener_mixte"><div class="ballcolor ball_2">&nbsp;</div></div>')
        ._('<div class="contener_mixte"><div class="ballcolor ball_3">&nbsp;</div></div>')
        ._('<div class="contener_mixte"><div class="ballcolor ball_4">&nbsp;</div></div>')
        ._('</div>')
        ._('<p class="fond-text">' + tips + '</p>')
        ._('</div>')
    $container.append(t.toString());
    $(".fond").css({
        'top': (height - $(".fond").height()) / 2,
        'left': (width - $(".fond").width()) / 2
    });

};
//隐藏loading
var hideLoading = function($container) {
    if ($container) {
        $container.find('.spinner').hide();
    } else {
        $('body').children('.spinner').hide();
    }
    $('.copyright').removeClass('hidden');
};

var imgReady = (function() {
    var list = [],
        intervalId = null,

        // 用来执行队列
        tick = function() {
            var i = 0;
            for (; i < list.length; i++) {
                list[i].end ? list.splice(i--, 1) : list[i]();
            };
            !list.length && stop();
        },

        // 停止所有定时器队列
        stop = function() {
            clearInterval(intervalId);
            intervalId = null;
        };

    return function(url, ready, load, error) {
        var onready, width, height, newWidth, newHeight,
            img = new Image();

        img.src = url;

        // 如果图片被缓存，则直接返回缓存数据
        if (img.complete) {
            ready.call(img);
            load && load.call(img);
            return;
        };

        width = img.width;
        height = img.height;

        // 加载错误后的事件
        img.onerror = function() {
            error && error.call(img);
            onready.end = true;
            img = img.onload = img.onerror = null;
        };

        // 图片尺寸就绪
        onready = function() {
            newWidth = img.width;
            newHeight = img.height;
            if (newWidth !== width || newHeight !== height ||
                // 如果图片已经在其他地方加载可使用面积检测
                newWidth * newHeight > 1024
            ) {
                ready.call(img);
                onready.end = true;
            };
        };
        onready();

        // 完全加载完毕的事件
        img.onload = function() {
            // onload在定时器时间差范围内可能比onready快
            // 这里进行检查并保证onready优先执行
            !onready.end && onready();

            load && load.call(img);

            // IE gif动画会循环执行onload，置空onload即可
            img = img.onload = img.onerror = null;
        };

        // 加入队列中定期执行
        if (!onready.end) {
            list.push(onready);
            // 无论何时只允许出现一个定时器，减少浏览器性能损耗
            if (intervalId === null) intervalId = setInterval(tick, 40);
        };
    };
})();

var add_param = function(sourceUrl, parameterName, parameterValue, replaceDuplicates) {
    if ((sourceUrl == null) || (sourceUrl.length == 0)) {
        sourceUrl = document.location.href;
    }
    var urlParts = sourceUrl.split("?");
    var newQueryString = "";
    if (urlParts.length > 1) {
        var parameters = urlParts[1].split("&");
        for (var i = 0;
            (i < parameters.length); i++) {
            var parameterParts = parameters[i].split("=");
            if (!(replaceDuplicates && parameterParts[0] == parameterName)) {
                if (newQueryString == "") {
                    newQueryString = "?";
                } else {
                    newQueryString += "&";
                }
                newQueryString += parameterParts[0] + "=" + parameterParts[1];
            }
        }
    }

    if (parameterValue !== null) {
        if (newQueryString == "") {
            newQueryString = "?";
        } else {
            newQueryString += "&";
        }
        newQueryString += parameterName + "=" + parameterValue;
    }
    return urlParts[0] + newQueryString;
}

var delete_param = function(url, paramName) {
    var str = "";
    if (url.indexOf('?') != -1) {
        str = url.substr(url.indexOf('?') + 1);
    } else {
        return url;
    }
    var arr = "";
    var returnurl = "";
    var setparam = "";
    if (str.indexOf('&') != -1) {
        arr = str.split('&');
        for (var i in arr) {
            if (arr[i].split('=')[0] != paramName) {
                returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
            }
        }
        return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
    } else {
        arr = str.split('=');
        if (arr[0] == paramName) {
            return url.substr(0, url.indexOf('?'));
        } else {
            return url;
        }
    }
}

var callbackAddUserOperateLogHandler = function() {

}
var add_yao_prefix = function(url) {
    //return encodeURIComponent(url);
    return 'http://yao.qq.com/tv/entry?redirect_uri=' + encodeURIComponent(url);
};

var is_android = function() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("android") > -1;
};
//小弹出框
var aniTrue = true;
var showTips = function(word, pos, timer) {
    if (aniTrue) {
        aniTrue = false;
        var pos = pos || '2',
            timer = timer || 1500;
        $('body').append('<div class="tips none"></div>');
        $('.tips').css({
            'position': 'fixed',
            'max-width': '80%',
            'top': '60%',
            'left': '50%',
            'z-index': '99999999',
            'color': 'rgb(255, 255, 255)',
            'padding': '20px 10px',
            'border-radius': '5px',
            'margin-left': '-120px',
            'background': 'rgba(0, 0, 0, 0.8)',
            'text-align': 'center'
        });
        $('.tips').html(word);
        var winW = $(window).width(),
            winH = $(window).height();
        $('.tips').removeClass('none').css('opacity', '0');
        var tipsW = $('.tips').width(),
            tipsH = $('.tips').height();
        $('.tips').css({
            'margin-left': -tipsW / 2,
            'top': (winH - tipsH) / (pos - 0.2)
        }).removeClass('none');
        $('.tips').animate({
            'opacity': '1',
            'top': (winH - tipsH) / pos
        }, 300, function() {
            setTimeout(function() {
                $('.tips').animate({
                    'opacity': '0'
                }, 300, function() {
                    $('.tips').addClass('none').css('top', (winH - tipsH) / (pos - 0.2));
                });
            }, timer);
            setTimeout(function() {
                $('.tips').remove();
                aniTrue = true;
            }, timer + 350);
        });
    };
};

var toUrl = function(url) {
    showLoading($("body"), "努力跳转中");
    //urlLoding();
    var delay = Math.ceil(3000 * Math.random() + 500);
    setTimeout(function() {
        window.location.href = url
    }, 200);
};

var openInWeixin = function() {
    return /MicroMessenger/i.test(navigator.userAgent);
};
var urlLoding = function() {
    var t = simpleTpl(),
        spinnerSize = 146,
        width = $(window).width(),
        height = $(window).height(),
        $container = $container || $('body'),
        $spinner = $container ? $container.find('#spinner') : $('body').children('#spinner'),
        $urljump = $container ? $container.find('#urljump') : $('body').children('#urljump');
    if ($spinner.length > 0) {
        $spinner.remove();
    };
    if ($urljump.length > 0) {
        $urljump.remove();
    };
    var srcurl = "";
    if (share_url.indexOf('html/') != -1) {
        srcurl = "../../svg/spinning-circles.svg";
    } else {
        srcurl = "svg/spinning-circles.svg";
    }
    t._('<ul class="urljump"><li>')
        ._('<img src="' + srcurl + '" width="50" alt="">')
        ._('</li></ul>')
    $spinner = $(t.toString()).css({
        'top': (height - spinnerSize) / 2,
        'left': (width - spinnerSize) / 2
    });
    $container.append($spinner);
};
var getUrl = function(openid) {
    var href = window.location.href;
    href = href.replace(/[^\/]*\.html/i, 'index.html');

    href = add_param(href, 'friUid', openid, true);
    href = add_param(href, 'from', 'share', true);
    href = delete_param(href, "openid");
    href = delete_param(href, "headimgurl");
    href = delete_param(href, "nickname");
    href = delete_param(href, "matk");
    return add_yao_prefix(href);
};
