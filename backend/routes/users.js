const express = require('express');
const insert = require("../public/javascripts/db-operations");
const registerUser = require("../public/services/userservice");
const router = express.Router();
router.use(express.json());
const collection = 'user'

/** POST register */
router.post('/register', function (req, res, next) {
    let toRegisterUser = {username: req.body['username'], password: req.body['password']};
    registerUser(toRegisterUser, function (err, result) {
        if (err)
            return res.status(400).end(err.message, err.stack);
        else {
            insert(collection, toRegisterUser)
            //toRegisterUser.message = 'Successful registration!'
            return res.status(201).json(toRegisterUser);
        }
    })
});

module.exports = router;
