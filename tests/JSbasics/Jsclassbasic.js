console.log(" ======= class creation in JS ====== ")
/*A class in JavaScript is a blueprint for creating objects.
Instead of writing out each object by hand, you define a class once 
and then create as many objects from it as you need. Classes were introduced in ES6 (ES2015), 
though they’re built on JavaScript’s existing prototype system */
class Person{

    age =60
    //get function is treated as get method
    get  location () {
      return  "USA"
    }
    /* A constructor is a special method inside a class that runs automatically 
    when you create an object with new. It’s where you set up the object’s starting data. */
    constructor(firstName, lastName ){
        this.firstName =firstName // the class can be side of the method
        this.lastName =lastName // the class can be side of the method
    }
    //let create a function and get full name
    fullName(){
        return "Full Name : "+this.firstName+ " " +this.lastName
    }
    
  
}
// create object of the class person

const person = new Person("Nahum","Yilma") //creating object of a class 
console.log(person.age)
console.log(person.location)
console.log(person.fullName())




