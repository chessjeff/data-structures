import linkedList from "./linked-list/methods.js";

const list = linkedList();

list.append('horse')
list.append('dog')
list.append('cat')
list.prepend('weasel')
list.prepend('donkey')

console.log(list.toString());
// donkey, weasel, horse, dog, cat

console.log(list.size());
// 5

console.log(list.head())
// donkey

console.log(list.tail())
// cat

console.log(list.at(2))
// horse

console.log(list.pop())
console.log(list.toString())
// donkey, weasel, horse, dog

console.log(list.contains('weasel'))
// true
console.log(list.contains('frog'))
// false

console.log(list.find('weasel'))
// 1 
console.log(list.find('frog'))
// null

console.log(list.insertAt('frog', 1))
console.log(list.toString())
// donkey, frog, weasel, horse, dog
console.log(list.removeAt(2))
console.log(list.toString())
// donkey, frog, horse, dog