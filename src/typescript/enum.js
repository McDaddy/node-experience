"use strict";
var Work;
(function (Work) {
    Work["A"] = "A";
    Work["B"] = "b";
})(Work || (Work = {}));
const obj = Work.A;
console.log(obj);
