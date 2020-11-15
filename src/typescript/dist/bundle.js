(function () {
    'use strict';

    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var Animal = /** @class */ (function () {
        function Animal(name, age) {
            this.name = name;
            this.age = age;
        }
        return Animal;
    }());
    var Cat = /** @class */ (function (_super) {
        __extends(Cat, _super);
        function Cat(name, age, sex) {
            var _this = _super.call(this, name, age) || this;
            _this.sex = sex;
            console.log(_this.age); // 子类访问
            return _this;
        }
        return Cat;
    }(Animal));
    var p = new Cat('Tom', 18, 'man');
    console.log(Object.getPrototypeOf(Cat) === Animal); // 外层访问

}());
//# sourceMappingURL=bundle.js.map
