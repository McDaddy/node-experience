let a: never;

a = 1;

let b: number = 0;
b = a;
let c: object;
c = a;

type T1 = number & never;
type T2 = number | never;
type T3 = number & string;
