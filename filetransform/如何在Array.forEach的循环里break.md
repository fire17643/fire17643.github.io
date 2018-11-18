title: 如何在Array.forEach的循环里break
tags: [js]
---

前段时间团队里讨论了一个问题，如何在forEach里实现break，目前有几种方案

###throw法

抛出一个错误，但是需要注意的是要抛出一个可以与别的错误区别开的错误，这样不会干扰别的代码抛出的错误
```
var BreakException = {};

try {
    [1, 2, 3].forEach(function(v) {
        console.log(v); //只输出1,2
        if (v === 2) throw BreakException;
    });
} catch (e) {
    if (e !== BreakException) throw e;
}
```
此法有点丑陋，加了不少代码

###空跑循环

在外层加一个标识，如果此标识为true，接下来的循环空跑，码如下：
```
var breakFlag = false;

[1, 2, 3].forEach(function(v) {
    if (breakFlag === true) {
        return false;
    }

    if (v === 2) {
        breakFlag = true
    }

    console.log(v) //只输出1,2
})
```
这个在外层加了一个变量，为了不污染外层的环境，我们可以使用forEach的第二个参数context，把标识放在这里
```
[1, 2, 3].forEach(function(v) {
    if (this.breakFlag === true) {
        return false;
    }

    if (v === 2) {
        this.breakFlag = true
    }
    console.log(v) //只输出1,2
}, {});
```
这种方法不可避免的导致了不必要的运行,有点浪费cpu的感觉

###神奇改数组大法

下面出场的这位选手，稍微有点技术含量
```
var array = [1, 2, 3, 4, 5];
array.forEach(function(item, index) {
    if (item === 2) {
        array = array.concat(array.splice(index, array.length - index));
    }
    console.log(item); //只输出1,2
});
```
这种方法相当于改变了array，不知道大伙看出来了没有

###最应该使用的every

前面啰嗦了这么多，真正的主角登场，最推荐的方式呢，就是这种需要break的场景下，直接使用every或者some吧

every: 碰到return false的时候，循环中止
some: 碰到return ture的时候，循环中止
两者的代码分别如下
```
var a = [1, 2, 3, 4, 5]
a.every(function(item, index, arry) {
    console.log(item); //返回1,2
    if (item === 2) {
        return false
    } else {
        return true
    }
})

var a = [1, 2, 3, 4, 5]
a.some(function(item, index, arry) {
    console.log(item); //返回1,2
    if (item === 2) {
        return true
    } else {
        return false
    }
})
```