const express = require('express');
const insert = require("../public/javascripts/db-operations");
const router = express.Router();
router.use(express.json());
const collection = 'user'

/** POST register */
router.post('/register', function(req, res, next){
    let toRegisterUser = { username: req.body['username'], password: req.body['password'] };
    if(toRegisterUser.username === undefined || toRegisterUser.password === undefined){
        return res.status(400).end('Username or password missing.');
    }
    if(toRegisterUser.username.length < 3 || toRegisterUser.password.length < 3){
        return res.status(400).end('Username or password length is less than 3 characters.');
    }
    const regex = /^[a-zA-Z0-9]+$/
    if(!toRegisterUser.username.match(regex)){
        return res.status(400).end('Wrong character included.');
    }
    insert(collection, toRegisterUser)
    toRegisterUser.message = 'Successful registration!'
    return res.status(201).json(toRegisterUser);
});

module.exports = router;
