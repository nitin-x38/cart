// ----------Array Push ----------------

const animals = ['pigs', 'goats', 'sheep'];

const count = animals.push('cows');
console.log(count);
console.log(animals);

animals.push('chickens', 'cats', 'dogs');
console.log(animals);

// ----------Array Pop-------------------
const plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

console.log(plants.pop());
console.log(plants);

plants.pop();
console.log(plants);

// ----------Array Concate -------------------
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);

//-----------Array Splice----------------------
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
console.log(months);

months.splice(4, 1, 'May');
console.log(months);

//-----------Array Slice----------------------------
const animal = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animal.slice(2));

console.log(animal.slice(2, 4));

console.log(animal.slice(1, 5));