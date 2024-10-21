const fs = require('fs');
const fsUtils = require('../utils/fileSysUtils')
const { randomUUID } = require('crypto')


exports.getAllWatches = (req, res) => {
    fs.readFile(fsUtils.getFilePath('./watchdata.json'), (err, strJson) => {
        const data = JSON.parse(strJson);
        res.status(200).send(data);
    });
};

exports.getWatchDetail = (req, res) => {
    const watchId = req.params.watchId;
    fsUtils.readFile((err, data) => {
        const watchData = JSON.parse(data).watches;
        console.log(watchData)
        return res.status(200).send(watchData.filter((e) => e.id === watchId)[0])
    })
};

exports.addWatch = (req, res) => {
    // console.log("req_body::", req.body)
    fs.readFile(fsUtils.getFilePath('./watchdata.json'), (err, strJson) => {
        const data = JSON.parse(strJson);
        // console.log("Adding:: ", req.body);
        const watchId = randomUUID();
        const filename = `${req.body.name}-${watchId}.${fsUtils.defaultPicFormat}`;
        data.watches.push({ name: req.body.name, color: req.body.color, img_path: filename, id: watchId })
        fs.writeFile(fsUtils.getFilePath('./watchdata.json'), JSON.stringify(data), (err) => {
            const imgStr = req.body.img.replace("data:image/png;base64,", "");
            if (err) console.log(err);
            fs.writeFile(filename, imgStr, 'base64', (err) => {
                if (err) console.log(err);
                res.status(201).send();
            });
        })
    });
};

exports.editWatch = (req, res) => {
    return res.status(201).send()
};

exports.getWatchImage = (req, res) => {
    const watchId = req.params.watchId;
    fsUtils.readFile((err, data) => {
        const watchData = JSON.parse(data).watches.filter((e) => e.id === watchId)[0];
        console.log('data', watchData)
        console.log(fsUtils.getFilePath("pics/watches/" + watchData.img_path))
        res.sendFile(fsUtils.getFilePath("pics/watches/" + watchData.img_path))
    })
}