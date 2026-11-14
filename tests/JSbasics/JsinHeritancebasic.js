/* Inheritance is the pilar of object oriented programming 
**Inheritance lets one class (the child or subclass) reuse and extend the properties
 and methods of another class (the parent or superclass).
 Instead of copying code, the child automatically gets everything the parent has, 
 and can add or change behavior of its own.
--  one class inherit/acquire the properties , methods , consturctor  of another class
*/
console.log("********** Inheritacne **********")
const Person2 = require("./reuseClass")
class animals extends Person2
{
 //location 
 get location() {
    return "Blue Cross"

  }
  constructor(firstName, lastName){
    // calling supper method to call
    super(firstName,lastName)
  }

}
//calling animals class
 let animal = new animals("Helper","Dag" )
 console.log(animal.fullName())
 console.log(animal.location)
