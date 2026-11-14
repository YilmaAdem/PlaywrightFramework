//======functions in Java Script===
console.log("==== Funciton with Java Script! ====")

/*function in JavaScript is a reusable block of code that performs a task. You define it once, and 
then you can run it (or “call” it) as many times as you need, often with different inputs.
Below a function name is add(), when you call it with value outside of function block
*/
function add(a, b){

    return a + b
}
//add(7,9) calling the function 
let addition = add(7,9)
console.log(" Adding two numbers :"+addition) //print the output 

// The above can be done with anonymous function(=>) that don't have a name
/*An anonymous function is a function that has no name.
 You create it inline, usually to pass it somewhere or assign it to a variable. */
let sumOftwoNumbers =(c, d)=> c+d
console.log("With annoumous function => : "+sumOftwoNumbers(7,9))

// ===working with strings ====
console.log("=== Working with Strings in JS! ====")
let day = 'Thursday '
//slice , split, trim  string methods
let subDay = day.slice(0,4)
console.log("Only getting btwn Index 0 and 4 - Thur :" +subDay) //printing slice
// retriving one character
console.log("Index of 1 -> h :" +day[1]) //h
console.log("char Length of the  Thursday :"+day.length) //8 including space 
//split Thursday  
let splited =day.split('s')
console.log("Spliting Thursday put it an array :"+splited)
console.log("Array index 0 :" +splited[0]) //first index Thur
console.log("Array index 1 and its char length :" +splited[1].length) //second day and its length
console.log(splited[1].trim().length) // remove white space

//===converting string to numbers  or numbers to string in JS

let date = "25"
let nextdate = "28"
//find the difference using parseIn()
let diff = parseInt(nextdate) - parseInt(date)
console.log(diff)
// to convert to string - toString()
dayOfWeek = 20
console.log("converting to string -'20' :"+dayOfWeek.toString())



