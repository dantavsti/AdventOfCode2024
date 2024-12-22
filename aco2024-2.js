import fs from 'fs'

async function readCSVToArray(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.log(err)
                reject(err)
                return
            }
            const lines = data.trim().split('\n')
            const array = lines.map(line => line.trim().split(/\s+/).map(Number))
            resolve(array)
        })
    })
}

function isSafe(report){

    const direction = Math.sign(report[1] - report[0])

    for (let j = 0; j < report.length -1 ; j++) {
        let diff = Math.abs(report[j+1] - report[j])    
        let newDirection = Math.sign(report[j+1] - report[j])
        
        if (direction != newDirection) {
            return false
        }
        if ((diff < 1) || (diff > 3)) {
            return false
        }
    }

    return true
}

function toleratedSafe(report){
    for (let j = 0; j < report.length; j++) {
        const newReport = report.slice(0)
        newReport.splice(j, 1)

        if (isSafe(newReport)){
            return true
        }
    }
    return false
}

async function main() {
    const allReports = await readCSVToArray('aco2024-2.csv')
    var countSafe = 0
    
    for (const report of allReports) { if (toleratedSafe(report)) { countSafe += 1 } }
    console.log(countSafe)
}

main()