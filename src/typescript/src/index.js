const test = { a: 2 };
test.b = 123;

test.__proto__.c = 22222;

for (const key in test) {
   console.log("key", key)
   const s= Object.prototype.hasOwnProperty.call(test, key)
   console.log("isOwn", s)
}
