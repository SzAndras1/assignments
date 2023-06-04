const express = require("express");
const validation = require("../public/services/resumeservice");
const {insert, insertMany, deleteObj, updateObj, getEvery, getObject} = require("../public/javascripts/db-operations");
const router = express.Router();
router.use(express.json());
const collection = 'resume'

/** POST: initializes db with test resumés */
router.post('/initializedb', function (req, res) {
    const stringLiteral = 'test';
    const resumeArray = [];
    for (let i = 0; i < 5; i++) {
        const toInsertResume = {
            name: stringLiteral + i,
            email: `${stringLiteral + i}@${stringLiteral}.com`,
            address: stringLiteral + i,
            text: stringLiteral + i
        }
        resumeArray.push(toInsertResume);
    }
    insertMany(collection, resumeArray);

    return res.status(201).json(resumeArray);
});

/** POST: publishes a resumé */
router.post('', function (req, res) {
    let toInsertResume = {
        name: req.body['name'], email: req.body['email'],
        address: req.body['address'], text: req.body['text']
    };
    validation(toInsertResume, function (err, result) {
        if (err)
            return res.status(400).json({error: err.message});
        else {
            insert(collection, toInsertResume);
            console.log('Successful insert!');
            return res.status(201).json(toInsertResume);
        }
    });
});

/** GET: gets every resumé */
router.get('', function (req, res) {
    getEvery(collection, function (err, result) {
        if (err)
            return res.status(400).json({error: err.message});
        else
            return res.status(200).json(result);
    });
});

/** GET: gets specific resumé by its id */
router.get('/:id', function (req, res) {
    getObject(collection, req.params.id, function (err, result) {
        if (err)
            return res.status(400).json({error: err.message});
        else {
            if (result === null) {
                console.log(result);
                return res.status(400).json({error: 'No resumé found'});
            } else {
                return res.status(201).json(result);
            }
        }
    });
});

/** PUT: updates specific resumé */
router.put('', function (req, res) {
    let toUpdateResume = {
        _id: req.body['_id'], name: req.body['name'], email: req.body['email'],
        address: req.body['address'], text: req.body['text']
    };

    updateObj(collection, toUpdateResume);
    return res.status(200).json(toUpdateResume);
});

/** DELETE: deletes specific resumé */
router.delete('', function (req, res) {
    let toDeleteResume = {
        name: req.body['name'], email: req.body['email'],
        address: req.body['address'], text: req.body['text']
    };
    deleteObj(collection, toDeleteResume);
    return res.status(202).json(toDeleteResume);
});

module.exports = router;
