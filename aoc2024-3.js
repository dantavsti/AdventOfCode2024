import fs from 'fs'

var mulFunctions = []
let totalSum = 0

async function readCSVToArray(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.log(err)
                reject(err)
                return
            }
            
            resolve(data)
        })
    })
}

function isValidParam(param) { 
    if (param < 1 || param > 999) {
        return false
    }

    return true
}

function isValidFunction(funcStr) {
    var funcParams = funcStr.substring(4,funcStr.length-1)
    var params = funcParams.split(/[,)]/)

    if (!isNaN(Number(params[0])) && !isNaN(Number(params[1]))) { 

        if(isValidParam(Number(params[0])) && isValidParam(Number(params[1]))) {
            totalSum += params[0]*params[1]
            return true
        }

    }

    return false
}

async function main() {
    const corruptedMemory = await readCSVToArray('aoc2024-3.csv')
    let isFunctionOn = true
    
    for (let i = 0; i< corruptedMemory.length; i++) {

        const funcId = corruptedMemory.substring(i,i+4)

        if (corruptedMemory.substring(i, i+4) === "do()"){
            isFunctionOn = true
            continue
        }
 

        if (corruptedMemory.substring(i, i+7) === "don't()"){
            isFunctionOn = false
            continue
        }
       if (funcId === "mul(" && isFunctionOn){
            mulFunctions.push(funcId)
            isValidFunction(corruptedMemory.substring(i,corruptedMemory.length))
        }
            
    }

    console.log(totalSum)
}

main()