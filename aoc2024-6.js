import fs from 'fs'

async function readCSVToArray(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.log(err)
                reject(err)
                return
            }
            const array = data.trim().split('\r\n').map(line => line.split(''))
            resolve(array)
        })
    })
}


var guardDirection = "^"
const blocker = "#"
const guardDirections = ["^", ">", "v", "<"]
var obstacleOptions = []

function getGuardPosition(mappedArea){
    for (let row = 0; row < mappedArea.length; row++) {
        for (let col = 0; col < mappedArea[row].length; col++) {
            if (mappedArea[row][col] === guardDirection) {
                return [row, col]
            }
        }
    }
}

function runGuardMovement(mappedArea, currentPosition, runMode){
    let guardMoves = 1
    let outsideMappedArea = false
    let isLoop = false
    let loopExecutions = 0
    let guardPath = []

   while (outsideMappedArea === false) {
        loopExecutions++
        let [row, col] = currentPosition;
        switch (guardDirection) {
            case "^":
                row--;
                break;
            case ">":
                col++;
                break;
            case "v":
                row++;
                break;
            case "<":
                col--;
                break;
        }
        
        if (row < 0 || row >= mappedArea.length || col < 0 || col >= mappedArea[0].length) {
            outsideMappedArea = true;
            break;
        }
        
        if (runMode === "check"){
            let loop = guardPath.filter(position => position[0] === row && position[1] === col && position[2] === guardDirection)
            
            if(loop.length > 0){
                isLoop = true
                outsideMappedArea = true
            }            
        }
        
        if (mappedArea[row][col] != blocker){
            guardPath.push([row, col, guardDirection])
        }
            
        if (mappedArea[row][col] === blocker){
            obstacleOptions.push([row, col, guardDirection])
            guardDirection = guardDirections.indexOf(guardDirection) + 1 < guardDirections.length? guardDirections[guardDirections.indexOf(guardDirection) + 1]: guardDirections[0]
        }else{
            currentPosition = [row, col];
            if (mappedArea[row][col]==="."){
                mappedArea[row][col] = "X"
                guardMoves++;
            }          
        }
    }
    
    return [guardMoves, guardPath, isLoop]
}

function checkObstaclesPoints(mappedArea, initialPosition, guardPath) {
    let loopOptions = 0
    let loopObstacles = []
    let moves = 0

    let guardPath2 = guardPath.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t[0] === value[0] && t[1] === value[1]
        ))
    );

    for (let move of guardPath2){
        mappedArea[move[0]][move[1]] = "#"
        guardDirection = "^"
        let [guardMoves, guardPath, isLoop] = runGuardMovement(mappedArea, initialPosition, "check")

        if (isLoop){
            loopObstacles.push([move[0],move[1]])
            loopOptions++
        }

        mappedArea[move[0]][move[1]] = "."
    }

    console.log("Loop Options: ", loopOptions)

}

async function main(){
    const mappedArea = await readCSVToArray('aoc2024-6.csv')

    let [row, col] = getGuardPosition(mappedArea)
    let currentPosition = [row, col]
    
    let [guardMoves, guardPath] = runGuardMovement(mappedArea, currentPosition, "move")
    
    console.log('guard moves: ', guardMoves)
    
    checkObstaclesPoints(mappedArea, currentPosition, guardPath)
 
}

main()