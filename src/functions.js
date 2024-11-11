const fs = require("fs")

function getFunctions() {
    const functionPath = __dirname + '/functions/'
    const functionFiles = fs.readdirSync(functionPath)
    const functions = {}

    for (let functionFile of functionFiles) {
        let func = require(functionPath + functionFile)
        let funcName = functionFile.split(".").shift().toLowerCase()

        functions[funcName] = func
    }
    return functions
}

module.exports = getFunctions