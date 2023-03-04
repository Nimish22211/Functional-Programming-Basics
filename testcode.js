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
let res = CoIdentity(1).extract() //1
// console.log(res)
 let res2 = CoIdentity(1).extend(co => co.extract() + 1).extract() // CoIdentity(2)
console.log(res2)