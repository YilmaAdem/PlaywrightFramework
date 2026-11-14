const Person2 = require("./reuseClass"); //importing with require key word 

// ===== Object in JS ======
console.log("==== Objects and properties in JS ===")
console.log("Objects is a collection of properties or an object is a collection of key-value pairs")

// objects and key values
const person = {
  name: "Alex",
  age: 28,
  isStudent: false,
  //has a function greet
  greet: function() {
    return "Hello, my name is " + this.name;
  }
};

console.log(person.name);   // "Alex"
console.log(person.age);    // 28
console.log(person.greet()); // "Hello, my name is Alex". Greet is a function 

console.log("==========person object lists using for loop===============")
//iteriation with loop
for (let key in person){
    
    console.log("Lists : "+person[key]) // name ,age , isStudent  ..need to printed out 

}

//object is also have function inside the object- refer above 
console.log(" ********************************** ")
console.log("===== Reuse person2 class here =====")
//create object 
let person2 = new Person2("Betty", "Asress")
//let man = new person2("Nathanael", "Yilma")
console.log(person2.age)
console.log(person2.location)
console.log(person2.fullName())

