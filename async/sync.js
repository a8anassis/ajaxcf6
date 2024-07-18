let input1 = 10

let result1 = func1(input1)
let result2 = func2(result1)
let result3 = func3(result2)

console.log(result3)


function func1(input1) {
    return input1 + 20
}

function func2(res) {
    return res + 30
}

function func3(res) {
    return res + 40
}