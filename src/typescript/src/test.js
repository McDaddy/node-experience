function a(age) {
    this.age = age;
}

function b(name) {
    console.log(333);
    this.name = name;
}

function xx() { 
    this.constructor = b; 
    console.log(2222);
}
xx.prototype = a.prototype
b.prototype = new xx();

const d = new b();
console.log(d.prototype === xx);