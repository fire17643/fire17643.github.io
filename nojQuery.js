function ready(fn) {
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", function() {
            document.removeEventListener("DOMContentLoaded", arguments.callee, false); // 防止多次调用
            fn();
        }, false);
    } else if (document.addEvent) {
        var doc = window.document,
            done = false;
        // only fire once
        var init = function() {
            if (!done) {
                done = true;
                fn();
            }
        };
        // polling for no errors
        (function() {
            try {
                // throws errors until after ondocumentready
                doc.documentElement.doScroll('left'); // 文档加载完成后此方法可用
            } catch (e) {
                setTimeout(arguments.callee, 50);
                return;
            }
            // no errors, fire
            init();
        })();
        // trying to always fire before onload
        doc.onreadystatechange = function() {
            if (doc.readyState == 'complete') {
                doc.onreadystatechange = null;
                init();
            }
        };
    }
}
var arrayify = function(a) {
    return [].slice.call(a);
};
// 浏览器前缀
var pfx = (function() {

    var style = document.createElement('dummy').style,
        prefixes = 'Webkit Moz O ms Khtml'.split(' '),
        memory = {};

    return function(prop) {
        if (typeof memory[prop] === "undefined") {

            var ucProp = prop.charAt(0).toUpperCase() + prop.substr(1),
                props = (prop + ' ' + prefixes.join(ucProp + ' ') + ucProp).split(' ');
            console.log(props)
            memory[prop] = null;
            for (var i in props) {
                if (style[props[i]] !== undefined) {
                    memory[prop] = props[i];
                    break;
                }
            }
        }
        return memory[prop];
    }

})();
pfx("animation"); // WebkitAnimation

/* DOM ready */
document.addEventListener('DOMContentLoaded', function() {

    // your code goes here
}, false);

function r(f) {
    /in/.test(document.readyState) ? setTimeout('r(' + f + ')', 9) : f()
}

// $.data(name,value)

function data(ele, name, value) {
    if (typeof value === "undefined") {
        return ele.dataset[name];
    } else if (typeof value === "string") {
        ele.dataset[name] = value;
    } else if (typeof value === "object") {
        ele.dataset[name] = JSON.stringify(value);
    }
}
var user = {
    name: "zjt",
    age: 10
};
data(document.body, "user", user);
data(document.body, "user");
Element.prototype.data = function(name, value) {
    if (typeof value === "undefined") {
        return this.dataset[name];
    } else if (typeof value === "string") {
        this.dataset[name] = value;
    } else if (typeof value === "object") {
        this.dataset[name] = JSON.stringify(value);
    }
}
document.body.data("nnn", "mynnn");
document.body.data("nnn");
var css = function(el, props) {
    var key, str = "";
    for (key in props) {
        if (props.hasOwnProperty(key)) {
            str += key + ":" + props[key] + ";";
        }
    }
    el.style.cssText = str;
    return el;
}
var byId = function(id) {
    return document.getElementById(id);
}
var $ = function(selector, context) {
    context = context || document;
    return context.querySelector(selector);
};
var $$ = function(selector, context) {
    context = context || document;
    return arrayify(context.querySelectorAll(selector));
};

parent.appendChild(child); // $(parent).append($(child))
parent.insertBefore(child, parent.childNodes[0]); // $(parent).prepend($(child));

function after(el, afterNode) {
    // el.insertAdjacentHTML('afterend', afterNode);
    el.parentNode.insertBefore(afterNode, el.nextSibling);
}
after(referenceNode, e); // $(referenceNode).after($(e));

el.children || el.childNodes // $(el).children();

// $(el).siblings();
Array.prototype.filter.call(el.parentNode.children, function(child) {
    return child !== el;
});

// $(ele).is(":visible")
function isVisible(ele) {
    var rect = ele.getBoundingClientRect();
    return !!(rect.bottom - rect.top); // opacity为0无法判断
};

// $(selector).filter(filterFn);
// IE9+
Array.prototype.filter.call(document.querySelectorAll(selector), filterFn);

// IE9+ $(selector).each(function(i, el){});
var elements = document.querySelectorAll(selector);
arrayify(elements).forEach.call(elements, function(el, i) {});



el.outerHTML = string; // IE8+ $(el).replaceWith(string);


// IE9+
el.nextElementSibling //$(el).next();
el.previousElementSibling //$(el).prev();

el.cloneNode(true); // $(el).clone();

function remove(e) {
    var _parentElement = e.parentNode;
    if (_parentElement) {
        _parentElement.removeChild(e);
    }
}
remove(child);

function empty(e) {
    var t = e.childNodes.length;
    for (var i = 0; i < t; i++) {
        e.removeChild(e.firstChild);
    }
}
empty(parent); // $(parent).empty();



document.body.classList.toggle('test');



// 增加一个 class

// jQuery 语法 $(e).addClass('myclass1 myclass2');
function addClass(e, c) {
    var cs = c.split(' ');
    if (this.hasClass(e, className)) return;
    if ("classList" in e) {
        if (cs.length > 1) {
            cs.forEach(function(v) {
                e.classList.add(v);
            })
        } else {
            e.classList.add(c);
        }
        return;
    }
    var t = ' ' + e.className + ' ';
    for (var i = 0; i < cs.length; i++) {
        var current = cs[i];
        if (t.indexOf(' ' + current + ' ') === -1) {
            t += ' ' + current;
        }
        t = t.replace('  ', ' '); // 去掉连续两个空格
    }
    e.className = t.replace(/(^\s*)|(\s*$)/g, ''); // 去掉首尾空白
}
addClass(document.body, 'myclass1 myclass2');

// 移除一个 class  $(e).removeClass('myclass1 myclass2');
function removeClass(e, c) {
    if (!this.hasClass(e, className)) return;
    var cs = c.split(' ');
    if ("classList" in e) {
        if (cs.length > 1) {
            cs.forEach(function(v) {
                e.classList.remove(v);
            })
        } else {
            e.classList.remove(c);
        }
        return;
    }
    var t = ' ' + e.className + ' ';
    for (var i = 0; i < cs.length; i++) {
        var current = cs[i];
        if (t.indexOf(' ' + current + ' ') >= 0) {
            t = t.replace(' ' + current + ' ', ' ');
        }
    }
    e.className = t.replace(/(^\s*)|(\s*$)/g, ''); // 去掉首尾空白
}
removeClass(document.body, 'myclass1 myclass2');

// 检查是否含有某类 $(el).hasClass(className);
function hasClass(el, className) {
    if (el.classList)
        return el.classList.contains(className);
    else
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

function replaceClass(ele, source, target) {
    var source = ' ' + source + ' ';
    var target = ' ' + target + ' ';
    if (ele.nodeType === 1) {
        var className = ' ' + ele.className + ' ';
        // 确保当前元素没有目标className，避免重复
        if (!~className.indexOf(target)) {
            className = className.replace(source, target);
            ele.className = className.trim();
        }
    }
}
replaceClass(document.body, "text", "asdfsfsf");

var append = function(elem, text) {
        if (typeof text === "string") {
            if (elem.insertAdjacentHTML) {
                if (elem.tagName === "TABLE") {
                    var html = elem.outerHTML,
                        ep = elem.parentNode,
                        sl = html.length;
                    text = html.substr(0, sl - 8) + text + html.substr(sl - 8, sl);
                    ep.insertAdjacentHTML("beforeEnd", text);
                    ep.replaceChild(ep.lastChild, elem);
                } else {
                    elem.insertAdjacentHTML("beforeEnd", text);
                }
            } else {
                var rlt = null,
                    rg = doc.createRange(),
                    fm = rg.createContextualFragment(text);
                rlt ? elem.insertBefore(fm, rlt) : elem.appendChild(fm);
            }
        } else if (typeof text === "object") elem.appendChild(text);
    }
    //删除元素 
var remove = function(elem) {
        if (elem.parentNode) elem.parentNode.removeChild(elem);
    }
    //置空元素内容及子节点 
var empty = function(elem) {
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
}

function prop(ele, name, value) {
    var collect = !!value;
    if (!collect) {
        ele.removeAttribute(name);
    } else {
        ele.setAttribute(name, value);
    }
}
// prop(document.body, "name", "sdfsdfs");
prop(document.getElementById("test"), "checked", false);
prop(document.getElementById("test"), "checked", true);

// $(el).toggleClass(className);
function toggleClass(ele, className) {
    if (el.classList) {
        el.classList.toggle(className);
    } else {
        var classes = el.className.split(' ');
        var existingIndex = classes.indexOf(className);

        if (existingIndex >= 0)
            classes.splice(existingIndex, 1);
        else
            classes.push(className);

        el.className = classes.join(' ');
    }
}



el.textContent // IE9+ $(el).text();


// $(el).css(ruleName);
// IE9+
getComputedStyle(el)[ruleName];
/* 获取指定元素ele样式值  */
function getStyle(ele, name) {
    // w3c方法，如果存在的话
    if (window.getComputedStyle) {
        return getComputedStyle(ele)[name];
    } else if (ele && ele.style[name]) // float不行
        return ele.style.name;
    // IE方法
    else if (ele.currentStyle)
        return ele.currentStyle[name];
    else
        return null;
}
getStyle(document.body, "width");


// 设置标签属性
e.setAttribute('target', '_blank'); // $(e).attr('target', '_blank'); // 设置属性
e.removeAttribute('target'); // $(e).removeAttr('target');     // 移除属性

// $(el).offset();
function offset(ele) {
    var rect = el.getBoundingClientRect();
    return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
    }
}
/*
 *
 * 获取元素位置,pageY同下*/
function pageX(elem) {
    return elem.offsetParent ? elem.offsetLeft + pageX(elem.offsetParent) : elem.offsetLeft;
}

/*
 *
 * 获取相对于父元素位置*/
function parentX(elem) {
    return elem.parentNode == elem.offsetParent ? elem.offsetLeft : pageX(elem) - pageX(elem.parentNode)
}

function posX(elem) {
    return parseInt(getStyle(elem, "left"));
}
/*
 * 获取光标的水平位置，垂直位置同*/
function getX(e) {
    return e.pageX || e.clientX + document.body.scrollLeft; // IE7/8报错，不支持e.pageX
}
/*
 * 获取鼠标相对于event的Target的X位置*/
function getElementX(e) {
    return (e && e.layerX) || window.event.offsetX;
}
/*
 * 确定滚动条位置*/
function scrollX() {
    return self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
}

/*
 * 获取视口高度*/
function getWindowHeight() {
    return self.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}
// $(el).position();
function position(ele) {
    return {
        left: el.offsetLeft,
        top: el.offsetTop
    }
}

// $(el).trigger('my-event', {some: 'data'});
// IE9+
if (window.CustomEvent) {
    var event = new CustomEvent('my-event', {
        detail: {
            some: 'data'
        }
    });
} else {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('my-event', true, true, {
        some: 'data'
    });
}
el.dispatchEvent(event);

// $(el).trigger('change');
// IE9+
// For a full list of event types: https://developer.mozilla.org/en-US/docs/Web/API/document.createEvent
var event = document.createEvent('HTMLEvents');
event.initEvent('change', true, false);
el.dispatchEvent(event);

// IE9+
fn.bind(context); // $.proxy(fn, context);

// $.extend(true, {}, objA, objB);
// IE8+
function extend(out) {
    out = out || {};
    for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];
        if (!obj)
            continue;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object')
                    deepExtend(out[key], obj[key]);
                else
                    out[key] = obj[key];
            }
        }
    }
    return out;
};
extend({}, {
    a: 1
}, {
    a: 2,
    b: "3"
});

// IE8+
el.offsetHeight // $(el).outerHeight();

/* 数组判断 */
// IE9+
array.indexOf(item) // $.inArray(item, array);

// IE9+
Array.isArray(arr) // $.isArray(arr);


// IE9+
Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, "$1").toLowerCase(); // $.type(obj);


// IE8+
el.offsetParent || el // $(el).offsetParent();

/*
GET ,POST 请求
$.ajax({
  type: 'POST',
  url: '/my/url',
  data: data
});
*/
/*
 * 数据串行化*/
function serialize(a, isPost) {
    var s = [];
    //若传入的是数组，假定是表单元素的数组
    // 串行化表单元素
    if (a.constructor == Object) {
        for (var j in a) {
            s.push(j + "=" + encodeURIComponent(a[j]));
        }
    } else if (a.constructor == Array) {
        for (var i = 0, len = a.length; i < a.length; i++) {
            s.push(a[i].name + "=" + encodeURIComponent(a[i].value));
        }
    }
    if (isPost) {
        return s.join("&");
    } else {
        return "?" + s.join("&");
    }
}

function ajax(type, url, json, callback) {
    var request = new XMLHttpRequest();
    if (type == "GET") {
        var url = url + serialize(json);
        request.open(type, url, true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                var data = JSON.parse(request.responseText);
                callback && callback(data);
            }
        };
        request.send();
    } else if (type == "POST") {
        request.open(type, url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                var data = JSON.parse(request.responseText);
                callback && callback(data);
            } else {
                // We reached our target server, but it returned an error
            }
        };
        request.send(serialize(json, true));
    }
}
ajax("GET", "./", {
    a: 5
});
ajax("POST", "./", {
    a: 5
});


var supports = (function() {
    var div = document.createElement('div'),
        vendors = 'Khtml Ms O Moz Webkit'.split(' '),
        len = vendors.length;
    return function(prop) {
        if (prop in div.style) return true;
        prop = prop.replace(/^[a-z]/, function(val) {
            return val.toUpperCase();
        });
        while (len--) {
            if (vendors[len] + prop in div.style) {
                // browser supports box-shadow. Do what you need.
                // Or use a bang (!) to test if the browser doesn't.
                return true;
            }
        }
        return false;
    };
})();
if (supports('textShadow')) {
    document.documentElement.className += ' textShadow';
}
if (supports('boxSizing')) {
    document.documentElement.className += ' boxSizing';
}

// 为元素添加on方法
Element.prototype.on = Element.prototype.addEventListener;

NodeList.prototype.on = function(event, fn) {
    []['forEach'].call(this, function(el) {
        el.on(event, fn);
    });
    return this;
};

为元素添加trigger方法

Element.prototype.trigger = function(type, data) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(type, true, true);
    event.data = data || {};
    event.eventName = type;
    event.target = this;
    this.dispatchEvent(event);
    return this;
};

NodeList.prototype.trigger = function(event) {
    []['forEach'].call(this, function(el) {
        el['trigger'](event);
    });
    return this;
};

// 最短的判断IE的2种方式
var ie = !-[1, ];
var ie = !+"\v1";

// 一次判断，而不要次次判断
var setAlpha = (function(obj, alpha) {
    var set;
    if (-[1, ]) {
        set = function(obj, alpha) {
            obj.style.opacity = alpha * 0.01;
        }
    } else {
        set = function(obj, alpha) {
            obj.style.filter = "alpha(opacity=" + alpha + ")";
        }
    }
    return set;
})()

// 滚动距离判断
var sTop = document.body.scrollTop + document.documentElement.scrollTop;