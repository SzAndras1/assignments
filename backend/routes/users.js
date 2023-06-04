const express = require('express');
const {insert, findByUsername} = require("../public/javascripts/db-operations");
const validation = require("../public/services/userservice");
const {findOne} = require("../public/javascripts/db-operations");
const router = express.Router();
router.use(express.json());
const collection = 'user'

/** POST register */
router.post('/register', function (req, res, next) {
    let toRegisterUser = {username: req.body['username'], password: req.body['password']};
    validation(toRegisterUser, function (err, result) {
        if (err)
            return res.status(400).end(err.stack);
        else {
            findByUsername(collection, toRegisterUser, (err, result) => {
                if (err) {
                    return res.status(400).end(`DB Connection Error: ${err.message}`);
                } else {
                    if (result.length === 0) {
                        insert(collection, toRegisterUser);
                        console.log('Successful registration!');
                        return res.status(201).json(toRegisterUser);
                    } else {
                        return res.status(400).end('This username already exists.');
                    }
                }
            });
        }
    })
});

router.post('/login', function (req, res, next) {
    let toLoginUser = {username: req.body['username'], password: req.body['password']};
    validation(toLoginUser, function (err, result) {
        if (err)
            return res.status(400).end(err.stack);
    });

    findOne(collection, toLoginUser, (err, result) => {
        if (err) {
            return res.status(400).end(`DB Connection Error: ${err.message}`);
        } else {
            if (result === null) {
                return res.status(201).json(toLoginUser);
            } else {
                return res.status(400).end('Wrong credentials.');
            }
        }
    });
});

module.exports = router;
