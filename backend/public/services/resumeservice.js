const validation = function (obj, callback) {
    if (obj.name === undefined || obj.email === undefined || obj.address === undefined || obj.text === undefined) {
        return callback(Error('Name or address or text missing.'));
    }

    if (obj.name.length < 3 || obj.email.length < 3 || obj.address.length < 3 || obj.text.length < 4) {
        return callback(Error('Some data s length is less than the required.'));
    }

    // RegExp from https://stackoverflow.com/questions/52456065/how-to-format-and-validate-email-node-js
    const regex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!obj.email.match(regex)) {
        return callback(Error('Wrong email format.'));
    }

    return callback(null, 'Successful');
}

module.exports = validation;