const express = require('express');
const {insert, findBy} = require("../public/javascripts/db-operations");
const validation = require("../public/services/userservice");
const {findOne} = require("../public/javascripts/db-operations");
const router = express.Router();
router.use(express.json());
const collection = 'user'

/** POST register */
router.post('/register', function (req, res) {
    let toRegisterUser = {username: req.body['username'], password: req.body['password']};
    validation(toRegisterUser, function (err, result) {
        if (err)
            return res.status(400).json({error: err.message});
        else {
            findBy(collection, toRegisterUser, 'username', (err, result) => {
                if (err) {
                    return res.status(400).json({error: `DB Connection Error: ${err.message}`});
                } else {
                    if (result.length === 0) {
                        insert(collection, toRegisterUser);
                        console.log('Successful registration!');
                        return res.status(201).json(toRegisterUser);
                    } else {
                        return res.status(400).json({error: 'This username already exists.'});
                    }
                }
            });
        }
    })
});

/** Post: login */
router.post('/login', function (req, res) {
    let toLoginUser = {username: req.body['username'], password: req.body['password']};
    validation(toLoginUser, function (err, result) {
        if (err)
            return res.status(400).json({error: err.message});
    });

    findOne(collection, toLoginUser, (err, result) => {
        if (err) {
            return res.status(400).json({error: `DB Connection Error: ${err.message}`});
        } else {
            if (result === null) {
                return res.status(400).json({error: 'Wrong credentials.'});
            } else {
                return res.status(200).json(toLoginUser);
            }
        }
    });
});

module.exports = router;
