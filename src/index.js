import "./styles.css";
import { HashMap } from "./HashMap.js";

const test = new HashMap();
console.log(test);
test.set("apple", "red");
// test.set('banana', 'yellow')
// test.set('carrot', 'orange')
// test.set('dog', 'brown')
// test.set('elephant', 'gray')
// test.set('frog', 'green')
// test.set('grape', 'purple')
// test.set('hat', 'black')
// test.set('ice cream', 'white')
// test.set('jacket', 'blue')
// test.set('kite', 'pink')
// test.set('lion', 'golden')
console.log(test);
let res = test.get("apple");
console.log(res);
