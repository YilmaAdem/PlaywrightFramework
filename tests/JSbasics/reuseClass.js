
console.log("******** Resuse this class in other js such file-JSObject******")
/* To reuse this class , the key is you need to export it - module.exports */
module.exports=class Person2{

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