import fs from 'fs'

var list1 = []
var list2 = []

async function readData() {
    return new Promise((resolve, reject) => {
        fs.readFile('aco2024-1.csv', 'utf-8', (err, data) => {
            if (err) {
                console.log(err)
                reject(err)
                return
            }
            var lines = data.split('\n')
            for (let i = 0; i < lines.length; i++) {
                var line = lines[i].trim().split(/\s+/)
                list1.push(parseInt(line[0]))
                list2.push(parseInt(line[1]))
            }
            resolve()
        })
    })
}


async function main() {
    await readData()

    list1.sort((a, b) => a - b)
    list2.sort((a, b) => a - b)
    
    var distance = 0
    var qtd = 0
    var sum = 0
    
    for (let i = 0; i < list1.length; i++) {
        distance += Math.abs(list1[i] - list2[i])
        qtd = 0
        for (let j = 0; j < list2.length; j++) {
            if (list1[i] == list2[j]) {
               qtd++ 
            }
        }
        sum += qtd*list1[i]
    }
    
    console.log(distance)
    console.log(sum)

}

main()
