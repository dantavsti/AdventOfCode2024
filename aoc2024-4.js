import fs from 'fs'

var xmasCount = 0
var height = 0
var width = 0
var wordSearch = []

async function readCSVToArray(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.log(err)
                reject(err)
                return
            }
            const array = data.trim().split('\n')
            resolve(array)
        })
    })
}


function gotMatch(row, col, letter) {
    if (row < 0) return false
    if (col < 0) return false

    if (row >= height ) return false
    if (col >= width ) return false

    return wordSearch[row][col] === letter
}

function checkXmasToEast(i, j) {
    if (!gotMatch(i, j+1, "M")) return
    if (!gotMatch(i, j+2, "A")) return
    if (!gotMatch(i, j+3, "S")) return

    xmasCount++
}

function checkXmasToWest(i, j) {    
    if (!gotMatch(i, j-1, "M")) return
    if (!gotMatch(i, j-2, "A")) return
    if (!gotMatch(i, j-3, "S")) return

    xmasCount++
}

function checkXmasToNorth(i, j) {    
    if (!gotMatch(i-1, j, "M")) return
    if (!gotMatch(i-2, j, "A")) return
    if (!gotMatch(i-3, j, "S")) return

    xmasCount++
}

function checkXmasToSouth(i, j) {    
    if (!gotMatch(i+1, j, "M")) return
    if (!gotMatch(i+2, j, "A")) return
    if (!gotMatch(i+3, j, "S")) return

    xmasCount++
}

function checkXmasToNorthEast(i, j) {    
    if (!gotMatch(i-1, j+1, "M")) return
    if (!gotMatch(i-2, j+2, "A")) return
    if (!gotMatch(i-3, j+3, "S")) return

    xmasCount++
}

function checkXmasToNorthWest(i, j) {    
    if (!gotMatch(i-1, j-1, "M")) return
    if (!gotMatch(i-2, j-2, "A")) return
    if (!gotMatch(i-3, j-3, "S")) return

    xmasCount++
}

function checkXmasToSouthEast(i, j) {    
    if (!gotMatch(i+1, j+1, "M")) return
    if (!gotMatch(i+2, j+2, "A")) return
    if (!gotMatch(i+3, j+3, "S")) return

    xmasCount++
}

function checkXmasToSouthWest(i, j) {    
    if (!gotMatch(i+1, j-1, "M")) return
    if (!gotMatch(i+2, j-2, "A")) return
    if (!gotMatch(i+3, j-3, "S")) return

    xmasCount++
}

function checkXmas(i, j) {
    checkXmasToEast(i, j)
    checkXmasToWest(i, j)
    checkXmasToNorth(i, j)
    checkXmasToSouth(i, j)
    checkXmasToNorthEast(i, j)
    checkXmasToNorthWest(i, j)
    checkXmasToSouthEast(i, j)
    checkXmasToSouthWest(i, j)
}


function countInTheRace(wordSearch) {
    let countInTheRace = 0
    for (let i = 0; i < wordSearch.length; i++) {
        for (let j = 0; j < wordSearch.length; j++) {
            if (wordSearch[i][j] === 'X') {
                countInTheRace += checkXmas(i,j)
                
            }
        }
    }
    
    console.log('Count in the race: ', xmasCount)
    return countInTheRace
}

function checkXmasUpToDown(i, j) {
    if (gotMatch(i+1, j+1, "M") && gotMatch(i-1,j-1, "S") ) {
        return true
    }
    if (gotMatch(i+1, j+1, "S") && gotMatch(i-1,j-1, "M") ) {
        return true
    }
    return false

}

function checkXmasDownToUp(i, j) {
    if (gotMatch(i+1, j-1, "M") && gotMatch(i-1,j+1, "S") ) {
        return true
    }
    if (gotMatch(i+1, j-1, "S") && gotMatch(i-1,j+1, "M") ) {
        return true
    }
    return false

}


function countXmas(wordSearch) {
    let countXmas = 0
    for (let i = 0; i < wordSearch.length; i++) {
        for (let j = 0; j < wordSearch.length; j++) {
            if (wordSearch[i][j] === 'A') {
                if (checkXmasUpToDown(i,j) && checkXmasDownToUp(i,j)) {
                    countXmas++
                }
            }
        }
    }
    console.log('Count Xmas: ', countXmas)
}

async function main() {
    wordSearch = await readCSVToArray('aoc2024-4.csv')
    height = wordSearch.length
    width = wordSearch[0].length

    countInTheRace(wordSearch)
    countXmas(wordSearch)

}

main()