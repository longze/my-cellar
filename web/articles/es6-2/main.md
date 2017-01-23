# ES6 学习笔记 - Part 2

## Symbol

ES5的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是ES6引入Symbol的原因。

    let s = Symbol();
    
    typeof s
    // "symbol"

Symbol 函数可以接受一个字符串作为参数，表示对Symbol实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。

    var s1 = Symbol('foo');
    var s2 = Symbol('bar');
    
    s1 // Symbol(foo)
    s2 // Symbol(bar)
    
    s1.toString() // "Symbol(foo)"
    s2.toString() // "Symbol(bar)"

注意，Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。

    var s1 = Symbol('foo');
    var s2 = Symbol('foo');
    
    s1 === s2 // false

作为属性名的Symbol。

    var mySymbol = Symbol();
    var a = {
      [mySymbol]: 'Hello!'
    };

消除魔术字符串。魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，该由含义清晰的变量代替。

属性名的遍。Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。另一个新的API，Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
    
    let obj = {
      [Symbol('my_key')]: 1,
      enum: 2,
      nonEnum: 3
    };
    
    Reflect.ownKeys(obj)
    //  ["enum", "nonEnum", Symbol(my_key)]

由于以 Symbol 值作为名称的属性，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。

Symbol.for()，有时，我们希望重新使用同一个Symbol值，Symbol.for方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值。

    var s1 = Symbol.for('foo');
    var s2 = Symbol.for('foo');
    
    s1 === s2 // true

Symbol.keyFor()，返回一个已登记的 Symbol 类型值的key。

    var s1 = Symbol.for("foo");
    Symbol.keyFor(s1) // "foo"
    
    var s2 = Symbol("foo");
    Symbol.keyFor(s2) // undefined

## Set 数据结构

ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。Set本身是一个构造函数，用来生成Set数据结构。

    var s = new Set();
    [2, 3, 5, 4, 5, 2, 2].map(x => s.add(x));
    
    for (let i of s) {
      console.log(i);
    }
    // 2 3 5 4

Set函数可以接受一个数组（或类似数组的对象）作为参数，用来初始化。

    var set = new Set([1, 2, 2]);
    [...set]  // [1, 2]

Set结构的实例有两个属性：

- constructor，构造函数，默认就是Set函数。
- size，返回Set实例的成员总数。

Set 实例的四个方法：

- add(value)：添加某个值，返回Set结构本身。
- delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- has(value)：返回一个布尔值，表示该值是否为Set的成员。
- clear()：清除所有成员，没有返回值。

Array.from方法可以将Set结构转为数组。

    var items = new Set([1, 2, 3, 4, 5]);
    var array = Array.from(items);

这就提供了去除数组重复成员的另一种方法。

    function dedupe(array) {
      return Array.from(new Set(array));
    }
    
    dedupe([1, 1, 2, 3]) // [1, 2, 3]

Set结构的实例有四个遍历方法，可以用于遍历成员。

- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回键值对的遍历器
- forEach()：使用回调函数遍历每个成员

Set结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法，不明白为什么提供那么多方法。

    let set = new Set(['red', 'green', 'blue']);
    
    for (let x of set) {
      console.log(x);
    }
    // red
    // green
    // blue

因此使用Set可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。

    let a = new Set([1, 2, 3]);
    let b = new Set([4, 3, 2]);
    
    // 并集
    let union = new Set([...a, ...b]);
    // Set {1, 2, 3, 4}
    
    // 交集
    let intersect = new Set([...a].filter(x => b.has(x)));
    // set {2, 3}
    
    // 差集
    let difference = new Set([...a].filter(x => !b.has(x)));
    // Set {1}

Set 数据结构不能单独修改某一项，只能整体重置。

## WeakSet 数据结构

WeakSet结构与Set类似，也是不重复的值的集合。但是，它与Set有两个区别：

- 首先，WeakSet的成员只能是对象(包括Function和Array，不包括null、undefined、NaN)，而不能是其他类型的值。
- 其次，WeakSet中的对象都是弱引用，不可遍历。

能用的方法又三个：add，delete，has。主要的应用场景是保存Dom节点和对象，如果节点移除对象销毁，那么WeakSet实例中的元素自动消失，这是弱引用的直观表现。

## Map 数据结构

Object 的键值只能是字符串，Map实例允许键值是对象(包括Object、Function、Array、Class、null、undefined、NaN)。

    var m = new Map([[null, 1]]);
    m.get(null); // 1

这里需要特别注意的是 NaN 被认为是同一个值：

    m.set(1/0, 2);
    m.get(2/0);    // 2

属性 size：返回Map结构的成员总数。

方法 set(key, value)、get(key)、has(key)、delete(key)、clear() 都很直观，遍历方法 keys()、values()、entries() 和回调方法 forEach() 在Map实例数据上有了实际的用途，作用也区分的很清楚。

    for (let item of map.entries()) {
      console.log(item[0], item[1]);
    }
    // "F" "no"
    // "T" "yes"
    
    // 或者
    for (let [key, value] of map.entries()) {
      console.log(key, value);
    }
    
    // 等同于使用map.entries()
    for (let [key, value] of map) {
      console.log(key, value);
    }

forEach方法还可以接受第二个参数，用来绑定this。

    var reporter = {
      report: function(key, value) {
        console.log("Key: %s, Value: %s", key, value);
      }
    };
    
    map.forEach(function(value, key, map) {
      this.report(key, value);
    }, reporter);

## WeakMap 数据结构

WeakMap结构与Map结构基本类似，唯一的区别是它只接受对象作为键名（null除外），不接受其他类型的值作为键名，而且键名所指向的对象，不计入垃圾回收机制。WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。

    var wm = new WeakMap();
    var element = document.querySelector(".element");
    
    wm.set(element, "Original");
    wm.get(element) // "Original"
    
    element.parentNode.removeChild(element);
    element = null;
    wm.get(element) // undefined

上面代码中，变量wm是一个WeakMap实例，我们将一个DOM节点element作为键名，然后销毁这个节点，element对应的键就自动消失了，再引用这个键名就返回undefined。

WeakMap与Map在API上的区别主要是两个，一是没有遍历操作和size属性；二是不支持clear方法。

## Proxy

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

    var obj = new Proxy({}, {
      get: function (target, key, receiver) {
        console.log(`getting ${key}!`);
        return Reflect.get(target, key, receiver);
      },
      set: function (target, key, value, receiver) {
        console.log(`setting ${key}!`);
        return Reflect.set(target, key, value, receiver);
      }
    });
    
    obj.count = 1
    //  setting count!
    ++obj.count
    //  getting count!
    //  setting count!
    //  2

上面代码说明，Proxy 实际上重载（overload）了点运算符，即用自己的定义覆盖了语言的原始定义。生成 Proxy 实例的标准范式是：

    var proxy = new Proxy(target, handler);

所有的不同都在 handler 的写法上，注意，要使得 Proxy 起作用，必须针对 Proxy 实例进行操作，而不是针对目标对象进行操作。另外同一个拦截器函数，可以设置拦截多个操作。

    var handler = {
      get: function(target, name) {
        if (name === 'prototype') {
          return Object.prototype;
        }
        return 'Hello, ' + name;
      },
    
      apply: function(target, thisBinding, args) {
        return args[0];
      },
    
      construct: function(target, args) {
        return {value: args[1]};
      }
    };
    
    var fproxy = new Proxy(function(x, y) {
      return x + y;
    }, handler);
    
    fproxy(1, 2) // 1
    new fproxy(1,2) // {value: 2}
    fproxy.prototype === Object.prototype // true
    fproxy.foo // "Hello, foo"

下面是 Proxy 支持的13个拦截操作：

- get(target, propKey, receiver)
- set(target, propKey, value, receiver)
- has(target, propKey)，拦截 `propKey in proxy` 的操作，返回一个布尔值。
- deleteProperty(target, propKey)
- ownKeys(target)
- getOwnPropertyDescriptor(target, propKey)
- defineProperty(target, propKey, propDesc)
- preventExtensions(target)
- getPrototypeOf(target)
- isExtensible(target)
- setPrototypeOf(target, proto)
- apply(target, object, args)
- construct(target, args)

虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理。

    const target = {
      m: function () {
        console.log(this === proxy);
      }
    };
    const handler = {};
    
    const proxy = new Proxy(target, handler);
    
    target.m() // false
    proxy.m()  // true

上面代码中，getDate方法只能在Date对象实例上面拿到，如果this不是Date对象实例就会报错。这时，this绑定原始对象，就可以解决这个问题。

    const target = new Date('2015-01-01');
    const handler = {
      get(target, prop) {
        if (prop === 'getDate') {
          // 重点在下面
          return target.getDate.bind(target);
        }
        return Reflect.get(target, prop);
      }
    };
    const proxy = new Proxy(target, handler);
    
    proxy.getDate() // 1

## Reflect

设计意图：

- 将 Object 对象的一些明显属于语言内部的方法放到 Reflect 对象上。
- 修改某些Object方法的返回结果，让其变得更合理。
- 让Object操作都变成函数行为。
- 为 Proxy 代理提供方便。

13个静态方法与上面的 Proxy 的静态方法一一对应。