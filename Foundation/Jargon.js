//* Arity
//? The number of arguments a function takes 


//* Higher Order functions
//? A function which takes function as an argument

//* Closure
//? A Closure is a scope which captures local variables of function to access it later even the execution is moved to other block of code
// Example
const addTo = x => y => x + y

const addToFive = addTo(5)
addToFive(3) // 8

//* Currying
//? Converting a function that takes multiple arguments into a function that takes one at a time
// Example

const sum = (a,b) => a + b
const curried = a => b => a + b
curried(2)(4) // 6

const add2 = curried(2) // b => 2 + b
add2(10) // 12

//* Function Composition 
//? The act of putting two functions together to form third func where the output of one is the input of other func
//Example
const compose = (f,g) => (a) => f(g(a)) //Defined
const floorToString = compose((val) => val.toString(), Math.floor) // Usage
floorToString(121.124555) // '121'

//* Continuation
//? The part of code that's yet to be executed is known as a continutation
//Example

const Print = (num) => console.log(`given num is: ${num}`)
const addOneAndContinue = (num, log) => {
    const res = num + 1
    log(res)
}

addOneAndContinue(2, Print) // `given num is: 3`


//* Pure Function 
//? a function who's return value only depends by its input values & does not produce side effects, same input → same output
//Example
const greet = (name) => `Hi ${name}`
greet('Nimish') // 'Hi Nimish'

//* Idempotent
//? A function is idempotent if reapplying it to its result does not produce a different result
//Example
Math.abs(Math.abs(10))

//* Point-Free Style
//? Functions where the definition does not explicitly identify the arguments used.
//Example
const map = (fn) => list => list.map(fn)
const add = a => b => a + b

//Not point-free
const incAll = numbers  => map(add(1))(numbers)

//point free
const incAll2 = map(add(1))

//* Predicate
//? a function which returns True or False for a given Value.
//Example
const predicate = (a) => a > 2

;[1,2,3,4].filter(predicate) // [3,4]


//* Contracts
//? It specifes teh obligations of the behaviour from a function/expression at runtime. It acts as set of rules & generally used to report erros when contract is violated.
//Example
//Defining Contract
const contract = (input) => {
    if(typeof input === 'number') return true
    throw new Error('Contract violated!')
}

// Usage
const addOne = num => contract(num) && num + 1
addOne(2) // 3
addOne('234') // Contract violated!

//* Constant Function
//? A curried function that ignores second argument
//Example
const constant = a => () => a
;[1,2].map(constant(0)) // [0,0]

//* Functor
//? an object implementing map that takes function which is run on the contents of obj.
//Example
const f = x => x +1
const g = x => x + 2

some(1).map(x => f(g(x))) // some(3)
some(1).map(f).map(g)

//* Pointed Functor
//? An obj with an 'of' function that puts any value into it.
//Example
Array.of(1) // [1]


//* Lift
//? Taking value and putting it into an obj like functor
const lift = f => x => x.map(f)
const increment = (x) => x + 1
let res =lift(increment) // [3]
let res2 = res([2])
;[2].map(increment) // [3]


//* Lambda
//? Anonymous function that can be treated as a value
//Example
;(function (a){
    return a + 1
})

;(a) => a + 1
//Often passed as arguments to H.O.F

//* Functional Combinator
//? H.O.F usually curried which returns a new func changed in some way.
//Example
const C = f => a => b => f(b)(a)
const divide = a => b => a /b 
const divideBy = C(divide)
const divBy10 = divideBy(10)

divBy10(30) // 3


//* Monad
//? An obj with 'of' and 'chain' functions, chain is like map except it un-nests the resulting nested object.
//Example
//Implment
Array.prototype.chain = function(f){
    return this.reduce((acc, item) => acc.concat(f(item)), [])
}

//Usage
Array.of('cat,dog', 'fish,bird').chain(a=>a.split(',')) // ['cat', 'dog','fish','bird']
//contrast to map
Array.of('cat,dog', 'fish,bird').map(a => a.split(',')) // [['cat', 'dog'], ['fish', 'bird']]


//* Comonad
//? obj that has extract and extend functions
//Example
const CoIdentity = v => ({
    val:v,
    extract(){
        return this.val
    },
    extend (f){
        return CoIdentity(f(this))
    }
})

// extract, takes value out of functor 
CoIdentity(1).extract() //1
CoIdentity().extend(co => co.extract() + 1) // CoIdentity(2)

//* Kleisi Composition
//? 