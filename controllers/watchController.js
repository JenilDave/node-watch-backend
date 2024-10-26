const fs = require('fs');
const fsUtils = require('../utils/fileSysUtils')
const { randomUUID } = require('crypto')
const { getMongoConnected, constants } = require('../utils/db');
const watch = require('../models/watch');
const watchCategory = require('../models/watchCategory');
const collection = require('../models/collection');


exports.getAllWatches = (req, res) => {
    watch.findAll({
        limit: 10
    }).then((resolve, rej) => {
        res.status(200).send(resolve)
    }).catch((err) => {
        console.error(err);
        res.status(500).send();
    });
};

exports.getWatchDetail = (req, res) => {
    watch.findOne({
        where: {
            uid: req.params.watchId
        }
    }).then((resolve, rej) => {
        watchCategory.find({
            watch_uid: req.params.watchId
        }
        ).then((catData) => {
            res.status(200).send({ ...resolve?.dataValues, categories: { ...catData } })
        })
    }).catch((err) => {
        console.error(err);
        res.status(500).send();
    });
};

exports.addWatch = (req, res) => {
    const watchId = randomUUID();
    const filename = `${req.body.name}-${watchId}.${fsUtils.defaultPicFormat}`;
    watch.create({
        uid: watchId,
        watch_name: req.body.name,
        color: req.body.color,
        img_path: filename,
        company: req.body.company
    }).then(resolve => {
        const myCat = new watchCategory(
            {
                watch_uid : resolve.id,
                Casual: req.body.categories.includes('Casual'),
                Business: req.body.categories.includes('Business'),
                Occasion: req.body.categories.includes('Occasion'),
            }
        )
        myCat.save()
    }
    ).then(response => {
        const imgStr = req.body.img.replace("data:image/png;base64,", "");
        fs.writeFile(fsUtils.imgBasePath + filename, imgStr, 'base64', (err) => {
            if (err) console.log(err);
            res.redirect('/watches')
        });
    }).catch(err => console.error(err));
};

exports.editWatch = (req, res) => {
    watch.findOne({
        where: {
            uid: req.params.watchId
        }
    }).then(data => {
        console.log(data, req.body);
        data.update(req.body).then(resolve => {
            watchCategory.updateOne(
                resolve.uid,
                {
                    Casual: req.body.categories.includes('Casual'),
                    Business: req.body.categories.includes('Business'),
                    Occasion: req.body.categories.includes('Occasion'),
                }
            )
        }
        ).then(() => {
            res.status(201).send()
        })
    })
};

exports.getWatchImage = (req, res) => {
    watch.findOne({
        where: {
            uid: req.params.watchId
        }
    }).then((resolve, rej) => {
        res.sendFile(fsUtils.getFilePath(fsUtils.imgBasePath + resolve.img_path))
    }).catch((err) => {
        console.error(err);
        res.status(500).send();
    });
}

exports.getWatchCollections = (req, res) => {
    collection.findAll({
        limit: 10
    }).then((resolve, rej) => {
        res.status(200).send(resolve)
    }).catch((err) => {
        console.error(err);
        res.status(500).send();
    });
}