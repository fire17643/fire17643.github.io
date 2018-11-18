Function.prototype.toString.call({
	name: 'F',
	body: 'print("Javascript is hard")'
});
//  TypeError: String.prototype.toString is not generic
// Function.prototype.toString不是一个通用方法,
//这意味着,该方法被调用时,其this,如果不是一个函数对象,则要抛出TypeError异常.

new String({
	toString: function() {
		return this;
	},
	valueOf: function() {
		return this;
	}
});
// TypeError: Cannot convert object to primitive value
/*
是需要对expression 解释执行，并对其结果进行 内部ToString运算. 
其调用栈为 ToString(value) -> ToPrimitive(value, hint string)
ToPrimitive(value) 这里,因参数为非原始类型(是个对象),
又因hint string,所以会优先调用目标对象的toString方法,
如果结果仍然不是一个原始类型,则再次去调用其valueOf方法,
如果返回结果仍然不是一个原始类型则抛出TypeError异常.因为题中.参数是个对象,
且valueOf,和toString都被重写,且都不返回一个原始类型.so ...异常是必然的.
*/

var o = {
        x: 8,
        valueOf: function(){
            return this.x + 2;
        },
        toString: function(){
            return this.x;
        }
    };
console.log(String(o));//"8"
console.log(Number(o)); //10
console.log(o+1);//11，运算相关
alert(o);//"8"，显现相关
/*
对象转为数字
对象转换为数字过程大概是这样

如果对象有valueOf方法，并且方法返回基本类型，则把值转换为数字返回
如果对象具有toString方法，且方法返回基本类型，则转换为数字返回
否则就报错
上面情况只是针对强制转换，也就是我们显示的调用String或者Number构造函数的时候的处理，在平常使用中，在”显示“相关操作中会优先调用toString方法，而在运算相关操作中会优先调用valueOf方法。

*/

typeof(new Date() + new Date());
// string

typeof(void null);
// undefined

function F() {}
F.prototype = new Function;
Object.prototype.toString.call(new F());
// [object Object]

[].length = -2;
// RangeError: Invalid array lengthmessage: "Invalid array length"
/*
简单来说js的数组要求length 的范围在0 - 2的32次方-1 之间.
那么对于 [].length = xxx 这本质是以'length'为参数,调用数组对象自身的 [PUT]方法,
 并把xxx作为value. 这是个过程中会调用
ToUint32(xxx) 然后再去与 ToNumber(xxx) 的结果做对比.如果不相等.
则抛出RangeError. 内部运算 ToUint32 是不会返回负数的.
所以与ToNumber的结果一定不同. so ...
*/
var D = Math.pow(2, 33);
(D | D) == D;
// false


'_string_'.replace(/^/, "$'");
// _string__string_

eval('typeof F; function F() {}');
// function

null > 0 //false  null 尝试转型为number , 则为0 . 所以结果为 false, 
null >= 0 //true  null 尝试转为number ,则为0 , 结果为 true. 
null == 0 //false null在设计上，在此处不尝试转型. 所以 结果为false

var a = 1;　　
var fn = eval;

　　
eval('typeof a'); //number

　　
(eval)('typeof a'); //number

　　
(1, eval)('typeof a'); //undefined

　　
fn('typeof a'); //undefined


function f(a) {
	arguments[0] = 10;
	alert(a);
}
f();

function f(a, b, c) {
	for (var i = arguments.length; i--; [].shift.call(arguments));
	console.log(arguments);
	console.log([a, b, c]);
}
f(1, 2, 5);



function f(a,b,c){ 
      [].shift.call(arguments); 
	  [].shift.call(arguments);
      console.log(arguments); 
      console.log([a,b,c]) ;
} 
f(1,2,5);

var obj={a:1};
var i=0;
for (var o in obj){
	obj.b=2;
	obj.c=2;
	i++;
}
alert(i);// 1 // ie8 3
obj // Object {a: 1, b: 2, c: 2}

var a = [];var obj = {a:3,t:"afd"}
for (a[a.length] in obj);
a// ["a", "t"]

var obj = {
	toString: function() {
		return "Test"
	},
	valueOf:function(){
		return "value"
	}
	a:22
}
typeof obj


!NaN // true
 Number("") // 0


 var sparse = [ , , 'c' ];
 var dense  = [ undefined, undefined, 'c' ];

 0 in sparse //false
 0 in dense // true

 for(var i=0; i<sparse.length; i++) console.log(sparse[i]);
// undefined undefined c
 for(var i=0; i<dense.length; i++) console.log(dense[i]);
// undefined undefined c

sparse.map(function (x,i) { return i }); // [undefined × 2, 2]
dense.map(function (x,i) { return i }); // [ 0, 1, 2 ]

 sparse.forEach(function (x) { console.log(x) }); // c

 sparse.filter(function () { return true }) // [ 'c' ]
 dense.filter(function () { return true }) // [ undefined, undefined, 'c' ]

 var obj = { toString: function () { return 9} };
Number(obj) // 9

isNaN(obj) // false

// 复制数组
var a = ["a", 3, "b"];
var b = Array.apply(null,a);
// 扁平化数组
Array.prototype.concat.apply([], [["a"], ["b"]]) // ["a","b"]
[[], [["a",3], ["b"]]].toString().split(",") // ["","a","b"] // 可扁平化多阶层

{} === {} // error

var a = [];
a["sdfs"] = 5434;
a // []
a.sdfs // 5434


// 稀疏数组
var a = new Array(3);

> a.forEach(function (x, i) { console.log(i+". "+x) });

> a.map(function (x, i) { return i })
[ , ,  ]

// 密集数组
var a = Array.apply(null, Array(3)); // [ undefined, undefined, undefined ]


// 生成递增数组的2种方式
Array.apply(null, Array(3)).map(Function.prototype.call.bind(Number))

var a=Array.apply(null, Array(1000));
var b = a.map(function (x, i) { return i })


{} + [] // 0 //{}被解析成代码块，同+[]
{} + {} // NaN 忽略第一个{}，同+{}
[] + [] // ""
[] + {} // "[object Object]"
({} + {}) // "[object Object][object Object]"
{} + "" // 0
"" + {} // "[object Object]"

{} == "" // true
"" == {} // false
!{} // false

"" == [] // true
![] // false
!"" // true

null>=0 // false
null <= 0 //false
null == 0 // false
+null // 0

if (!("aa" in window)) {  
    alert('oh my god');
    var aa = 1;  
}  
alert("aa" in window);
alert(aa);

typeof [1,2,3];// "object"
typeof /abc/g  // "object"

// 打印出1-10000之间的所有对称数(如121,1331,2442)。
var re = [];
for(var i=1;i<10000;i++){
    if(/^(\d+)\d*(\1)$/.test(i+'')){
        re.push(i);
    }
}
console.log(re);

// JS获取两个字符串数组的差集
var dirs = ["a", "b", "c", "d", "e"];
var ignores = ["c", "e"], iglen = ignores.length;
for (var ig = 0; ig < iglen; ig++) {
	var sReg = new RegExp("^" + ignores[ig] + ",|," + ignores[ig] + "(?=,)|," + ignores[ig] + "$", "g");
	dirs = dirs.join(",").replace(sReg, "").split(",");
}
// dirs = ["a", "b", "d"]

// 在浏览器Console中打印二维码，主要是为了方便移动开发，不用手动输入长长的url链接
console.log("%c  ","background-image:url('http://www.liantu.com/api.php?bg=ffffff&fg=000000&gc=000000&el=L&text=" + encodeURIComponent(location.href) + "');background-size:contain;font-size:2500%;")

function fn1(){
   var a = b = 5;
};
fn1();
console.log(b)

var name = "jack";
function fn1(){
    name = "peter";
    return;
    function name(){
        console.log(name);
    }
}
fn1();       
console.log(name)   // jack


var v1 = [1,2,3];
var v2 = {};
var v3 = {a:123};
function fn1(v1, v2, v3){
    v1 = [1];
    v2 = [2];
    v3 = {a:3};
}

fn1(v1, v2, v3);
console.log(v1);     // [1,2,3]
console.log(v2);     // [object Object]
console.log(v3.a);   // 123


var result = [10] + 1;
console.log(result);

// 数值|0 ,相当于对数值进行Math.floor() ,记住它不能取代Math.floor()的作用，只针对正数位运算
3.75 | 0 // 3

var obj = {10: 1};
obj[10] = 2;
obj[[1, 0]] = 3;
console.log(obj["10"] , obj[10] , obj[[1, 0]]);
//对象的键总为字符串,因此obj[10]相当于obj["10"],obj[[1,0]]相当于obj["1,0"]
// 5 2 2 3

var $ = {"":String};
var result = !!$[([])]();
console.log(result);
// false
//转换过程如下
//!!$[([])]() -->  !!$[""]() --> !!String() --> !!"" --> false

var a = {key: 1};
var b = {key: 1};
var result = (a == b);
console.log(result);
//false
//两个对象总是不等的,两个值的引用不是来自于同一个对象

(function(o) {
    alert(o);
    return arguments.callee;
})('water')('down');


var a = 1;
(function(){
   alert(a);
})();

var a = 1
(function(){
   alert(a);
}());

汉字转unicode编码
var code = {
    en: function (str) {
        return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
    }
    , de: function (str) {
        return unescape(str.replace(/\\u/gi, '%u'));
    }
};

var myArray = yourArray = [1, 2, 3];
myArray = []; // `yourArray` is still [1, 2, 3]
              // `yourArray` 仍然是 [1, 2, 3]
              // The right way, keeping reference
// 正确的方法是保持引用
myArray.length = 0; // `yourArray` and `myArray` both []
                    // `yourArray` 和 `myArray`（以及其它所有对这个数组的引用）都变成 [] 了

a:1 // 1
x:y:z:1,2,3; // 3
/*
相当于
x:
 y:
  z:1,2,3
  */
{a:1}+2;//2
2 + {a:1} // 2[object Object]
{foo:[1,2,3]}; // [1,2,3]
{foo:[1,2,3]}[0]; // [0]

1000..toString.length; //1
.0.toString.length // 1
.1.toString.length // 1
.3.toString.length // 3

++'52'.split('')[0]
// 6

Number.prototype.x = function(){ console.log(this);return this === 123; };(123).x();

RegExp.prototype.toString = function() {return this.source};/3/-/2/; // 1
/3/.source // 3

'foo' == new Function("return String('foo')")();// true
'foo' == new function(){ return String('foo'); };// false

new function(){ return String('foo'); } + ""; // "[object Object]"
new function(){ return new String('foo'); } + ""; // foo
/*由于String("foo")是字符串，而new String("foo")是对象。
因此，前者返回的是匿名函数对象——显然不等于"foo"；
后者就是new String("foo")对象，加上"foo" == new String("foo")，于是，结果为true.*/

var x=1;
if(function f(){return 2;}){
    x+=typeof f;
}
// 1undefined
/*等同于 
if(ff = function f(){return 2;}){
    x+=typeof f;
}
var gg = function f(){console.log(f);return 2;}
gg()
在上面例子中g变成了函数的局部变量，变量指向函数本身，
所以我们调用f的时候会把其本身打印出来。
但是g只作为函数的局部变量存在，我们在外部调用g的时候就会报错了。
*/


function Test(){
    return new Date();
}
var test=new Test();
console.log(test instanceof Test);//false
console.log(test);//Sat Jan 18 2014 14:57:08 GMT+0800 (CST)

function Test1(){
    return Date();
}
var test1=new Test1();
console.log(test1 instanceof Test1);//true
console.log(test1); //Test1


.1.valueOf.length //0
.1.valueOf.length //0

.8.toString.length // 1
.8.toString().length //3


var s='test';//创建字符串类型变量
s.len=4;//创建包装对象new String(s)，为包装对象添加属性len
//引用完毕，销毁包装对象
console.log(s.len);//创建包装对象，查找其len属性，没有找到，返回undefined


var a= a || null; //null
        var b=c ||null; //null
        var c= typeof d; //undefined
var e = f || null; // f not defined

// 字符全出现次数
"HabHcdHefgH".match(/H/g).length

(function() {
    var oldAlert = window.alert,
        count = 0;
    window.alert = function(a) {
        count++;
        oldAlert(a + "\n You've called alert " + count + " times now. Stop, it's evil!");
    };
})();
alert("Hello World");

// 不声明第三个变量的值交换
var a=1,b=2;a=[b,b=a][0];


if(conditoin) alert(1),alert(2),console.log(3);


var x= 0;
var f=function(){
    x=1;
};
f();
alert(x); 
function f(){
    x = 2;
}
f();
alert(x);


function f1(){
　　　　var n=999;
　　　　nAdd=function(){
　　　　    n+=1
　　　　};
　　　　function f2(){
　　　　　　alert(n);
　　　　}
　　　　return f2;
　　}
　　var result1=f1();
    var result2=f1();
　　result1(); // 999
    result2();//999
　　nAdd();
  　result1(); // 是999而不是1000，这是为何呢？
    result2();//1000

if (!("a" in window)) {
  var a = 1;
 }
alert(a);

function a() {
     alert(this);
 }
 a.call(null);// [object window]

 function f(a) {
  "use strict";
  a = 42;
  return [a, arguments[0]];
}
var pair = f(17);
console.log(pair[0] === 42);
console.log(pair[1] === 17);


var a = '﻿{"a":1}';
try {
    JSON.parse(a);
} catch(e) {
    alert(e.message);
}

parseInt(0.0000001);// 1
"1325239449538" | 0; // -1905444926

var a = {n:1};
a.x = a = {n:2};
console.log(a);//Object {n: 2}
console.log(a.x);//undefined

// 先执行a.x = a ,然后 a = {n:2}改变了a的指向

[,,,].join(", ") // , ,

function foo() { } 
var oldName = foo.name; 
foo.name = "bar"; 
[oldName, foo.name]
// 返回结果还是['foo','foo']，因为ECMA规定了foo.name这个值是可读不可写的。

function foo(){
  console.log(this.a);
}
var a = 2;x                                      
var o = {
  a: 3,
  foo: foo
};
var p = {
  a: 4
};
(p.foo = o.foo)();
p.foo(),o.foo()