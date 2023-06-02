const express = require('express');
const {insert} = require("../public/javascripts/db-operations");
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
            return res.status(400).end(err.message, err.stack);
        else {
            insert(collection, toRegisterUser);
            console.log('Successful registration!');
            return res.status(201).json(toRegisterUser);
        }
    })
});

router.post('/login', function (req, res, next) {
    let toLoginUser = {username: req.body['username'], password: req.body['password']};
    validation(toLoginUser,  function (err, result) {
        if (err)
            return res.status(400).end(err.message, err.stack);
        else {
            findOne(collection, toLoginUser, (err_nested, coll) => {
                if (err_nested) {
                    return res.status(400).end(`DB Connection Error: ${err_nested.message}`);
                } else {
                    if(coll === null) {
                        console.log('Successful login!');
                        return res.status(201).json(toLoginUser);
                    } else {
                        return res.status(400).end('Wrong credentials.');
                    }
                }
            });
        }
    })
});

module.exports = router;
