class Animal {
    private name!: string; // 不写public默认也是公开的
    public age!: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
class Cat extends Animal {
    public sex!: string; // 不写public默认也是公开的
    constructor(name: string, age: number, sex: string) {
        super(name, age);
        this.sex = sex;
        console.log(this.age); // 子类访问
    }
}
let p = new Cat('Tom', 18, 'man');
console.log(Object.getPrototypeOf(Cat) === Animal); // 外层访问