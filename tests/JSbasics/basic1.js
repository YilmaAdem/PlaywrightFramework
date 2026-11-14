console.log("Hello Yilma"); 
/* in JS - console log is used  but in 
 Java we use System.out.println("")
====
* JS Variables - in JS variables are loosly used 
* var , let , const used for variable declaration 
* Const - it is constant and no resign in program once declare 
* var a = 4 ,let a =4,  in jave int a =4 
*/
// Data Types
/*
let a =4
console.log(a);
console.log(typeof(a));

let b = 3.17
console.log(b);
console.log(typeof(b)); //number 

let name ="Nahum"
console.log(typeof(name)); // string

let required = true
console.log(typeof(required)); //boolean 

// ======Conditional operators 

const featureFlag = true;

if (featureFlag)
    {
        console.log("Program 1: Feature is turned on !");
    }
else
    {
        console.log("Program 1:Feature is turned off !");
    }

// Conditional if feature on 
if (!featureFlag)
    {
        console.log("Program 2:Feature is turned on !");
    }
else
    {
    console.log("Program 2:Feature is turned off !");
}
console.log("====== while loop==========")
// Loop  until condition is satified: for , while

let i=2;
while(i<5) 
{
i++
console.log(i);
}

//for loop
console.log("=======For loop=========")
let c = 1;
for(let c = 0;c <4; c++)
    {

    console.log(c);
} 
*/
console.log("=======For loop to complex problem=========")
// Find numbers that divid by 2 and 5 gives number
let k = 1;
for(let l = 0;k<20; k++)
    {
    if(k%2 ==0 && k%5==0)
    {
    console.log(k);
    }
 } 
console.log("=======ARRAY and methods to manuplate =========")

//let use var, push, pop, unshift methods
// push() used  to add numbers at end of index
// unshift() used  to add numbers/or values at first of index
//pop() used to remove the last entered 
var marks = Array(6)
var marks = [10,15,20,25,30,35]
console.log("All values of marks array are :" + marks)
console.log("Index value of 2 is  :" + marks[2]) // get 20 since index 2
console.log("The length of array is :" + marks.length) // 6 
marks.push(100) // add item/number to end of the array
console.log("All values with new entry :" + marks) //10,15,20,25,30,35,100
marks.pop() // removing the last enter 100
marks.unshift(12) // adding 12 infront or index 0
console.log("All value after the last change :" + marks)  //12,10,15,20,25,30,35
// additional js methods - indexof(), includes()
console.log("Index of 35 : " +marks.indexOf(35)) //tells the index of number 35
console.log("Is this number included or exist in the array :" +marks.includes(100)) //boolean 

// ===reduce ,filter, map methods
//reduce() - loops through the array and sum up 
let total = marks.reduce((sum, mark) =>sum+mark, 0) //sum start with 0
//sum - total value of array, mark - current array value and  sum+mark - new value
console.log("Reduce Method - Marks Array sum total : " + total)

//filter()
var scores = [12, 15,18,21]
let evenScores =scores.filter(scores=>scores%4==0) // this looping but much easier for loop
console.log("filter method - Even scores : " +evenScores)

//string sorting and  filltering using sort() and filter() 
let fruits = ["Mango", "Banana", "Apple", "Melon", "Avocado"];

fruits.sort();
console.log("Sorted: " + fruits);

let fruitsA = fruits.filter(fruit => fruit.startsWith("A"));
console.log("Fruits name: " + fruitsA);   // ["Apple", "Avocado"]


let codeLangs = ["Java", "JS", "Python", "C++", "Groovy"]
let NamestartsWithA =codeLangs.filter(codeLang =>codeLang.startsWith("J"))
console.log(" Coding Languages name start with J :" +NamestartsWithA) //Java, Js

//map()

// adding array  , comparing highest and lowest
// creating array
let expense =[30,40,50,100,200]
// sum expense
let sum = expense.reduce((sum,expense)=>sum+expense,0)
console.log("total expense : " + total)

//
const highest = expense.reduce((max, value) => (value > max ? value : max));
const lowest = expense.reduce((min, value) => (value < min ? value : min));
console.log("Highest :"+highest)
console.log("Lowest :"+lowest)


//sorting again 
let studentNames = ["Bob", "Ayele", "Nadu"]
console.log(studentNames.unshift("Nahum"))
console.log(studentNames.pop())
console.log(studentNames.sort())
