(function (exports) {
  'use strict';

  // ts 中拥有的类型
  console.log(0 /* USER */);
  // let n:never = MyError();
  // Symbol BigInt   symbol 表示独一无二 元编程会用到 stringToFlag iterator ....
  var s1 = Symbol("123");
  var s2 = Symbol("123");
  console.log(s1 == s2);
  // BigInt
  var num1 = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1);
  var num2 = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(2);
  console.log(Number);

  exports.num1 = num1;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
//# sourceMappingURL=bundle.js.map
