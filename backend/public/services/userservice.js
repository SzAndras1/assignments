const registerUser = function (obj, callback) {
    if (obj.username === undefined || obj.password === undefined) {
        return callback(Error('Username or password missing.'));
    }

    if (obj.username.length < 3 || obj.password.length < 3) {
        return callback(Error('Username or password length is less than 3 characters.'));
    }

    const regex = /^[a-zA-Z0-9]+$/
    if (!obj.username.match(regex)) {
        return callback(Error('Wrong character included.'));
    }

    return callback(null, 'Successful');
}

module.exports = registerUser;


