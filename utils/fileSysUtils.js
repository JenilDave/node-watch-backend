const path = require("path");
const fs = require("fs");


exports.imgBasePath = "pics/watches/";

exports.defaultPicFormat = "png"

exports.getFilePath = (relativePath) => path.resolve(relativePath);

exports.readFile = (callback) => fs.readFile(this.getFilePath('./watchdata.json'), callback)

exports.writeFile = async (jsonData) => {
    fs.writeFile(this.getFilePath('./watchdata.json'), JSON.stringify(jsonData), (err, data) => {
        return
    });
}