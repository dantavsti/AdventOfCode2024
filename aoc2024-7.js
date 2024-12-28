import fs from 'fs'

async function readCSVToArray(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.log(err)
                reject(err)
                return
            }
            const array = data.trim().split('\r\n').map(line => {
                const parts = line.split(/[: ]/);
                parts.splice(1, 1); // Remove the second item
                return [parts[0], parts.slice(1)];
            })
            resolve(array)
        })
    })
}

function generateCombinations(operators, length) {
    if (length === 1) return operators.map(op => [op]);

    const combinations = [];

    const smallerCombinations = generateCombinations(operators, length - 1);

    for (let op of operators) {
        for (let smallerCombination of smallerCombinations) {
            combinations.push([op, ...smallerCombination]);
        }
    }

    return combinations;
}

function checkEquation(result, numbers) {
    let calculatedResult = 0
    let combinations = generateCombinations(["+", "*", "||"], numbers.length)
    
    for (let i=1; i < combinations.length; i++){
        let opResult = 0
        let concatenatedNumbers = ''
        let firstop = true
        for (let j=0; j < numbers.length; j++){
            switch (combinations[i][j]) {
                case "*":
                    opResult *= parseInt(numbers[j])    
                    break;
                case "+":
                    opResult += parseInt(numbers[j])    
                    break;
                case "||":
                    opResult = parseInt(opResult.toString()+numbers[j].toString())
                    break;
                default:
                    break;
            }

        }
        if (opResult === result){return [true]}
    }

    return [false]
}


async function main(){
    const equations = await readCSVToArray('aoc2024-7.csv')
   
    let sumValids = 0

    for (let equation of equations){
        let result = parseInt(equation[0])
        let numbers = equation[1]

        let [isValid] = checkEquation(result, numbers)

        if(isValid){
            sumValids += result
        }
    }

    console.log('sumValid: ', sumValids)
 
}

main()