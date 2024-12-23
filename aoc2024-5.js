import fs from 'fs'

async function readCSVToArray(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.log(err)
                reject(err)
                return
            }
            const array = data.trim().split('\r\n')
            resolve(array)
        })
    })
}

function splitArrays(data){
    let array1 = []
    let array2 = []
    let foundBlankLine = false

    for (let line of data) {
        if (line === '') {
            foundBlankLine = true
            continue
        }

        if (foundBlankLine) {
            array2.push(line.split(',').map(Number))    
        } else {
            array1.push(line.split('|').map(Number))
        }
    }

    return [array1, array2]

}

function checkPagesOrder(pages, rules, dependencies) {
    let pagesOrder = false
    let isReordered = false
    let orderChanged = false

    while (pagesOrder === false) {
        orderChanged = false
        
        for (let i = 0; i < pages.length - 1; i++) {
            let rule = rules.filter(rule => rule[0] == pages[i+1] && rule[1] == pages[i])
            
            if (rule.length > 0) {
                let temp = pages[i]
                pages[i] = pages[i+1]
                pages[i+1] = temp

                isReordered = true
                orderChanged = true
            }
            
        }
        
        if (!orderChanged){pagesOrder = true}

    }


    return [pages, isReordered];
}

async function main() {
    const pagesToProduce = await readCSVToArray('aoc2024-5.csv')
    let orderedPages = []
    let reorderedPagesList = []

    let [pageOrderingRules, printOrder] = splitArrays(pagesToProduce)

    for (let i = 0; i < printOrder.length; i++) {

        let [pages, isReordered] = checkPagesOrder(printOrder[i], pageOrderingRules)

        orderedPages.push(pages)

        if(isReordered){
            reorderedPagesList.push(pages)
        }

    }
    
    let middlePages = []
    let middlePagesSum = 0
    for (let i = 0; i < reorderedPagesList.length; i++){
        let position = Math.round(reorderedPagesList[i].length / 2) -1
        middlePages.push(reorderedPagesList[i][position])
        middlePagesSum += reorderedPagesList[i][position]
    }

    console.log(middlePagesSum)
}

main()