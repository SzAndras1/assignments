const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017/';
const insert = function (collection, obj) {
    MongoClient.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
        .then((db) => {
            const dbo = db.db('semesterproject');
            return dbo.collection(collection).insertOne(obj, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            }).then((coll) => {
                console.log('1 document inserted');
                //console.log(coll);
            }).catch(err => {
                console.log(`DB Connection Error: ${err.message}`);
            }).finally(() => {
                console.log('Close DB');
                db.close();
            })
        });
}

const findByUsername = function (collection, obj, callback) {
    const query = {username: obj.username};
    MongoClient.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
        .then((db) => {
            const dbo = db.db('semesterproject');
            return dbo.collection(collection).find(query, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            }).toArray().then((coll) => {
                callback(null, coll);
            }).catch(err => {
                callback(err);
                console.log(`DB Connection Error: ${err.message}`);
            }).finally(() => {
                console.log('Close DB');
                db.close();
            })
        });
}

const findOne = function (collection, obj, callback) {
    MongoClient.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
        .then((db) => {
            const dbo = db.db('semesterproject');
            return dbo.collection(collection).findOne(obj, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            }).then((coll) => {
                callback(null, coll);
            }).catch(err => {
                callback(err);
                console.log(`DB Connection Error: ${err.message}`);
            }).finally(() => {
                console.log('Close DB');
                db.close();
            })
        });
}

module.exports = {insert, findByUsername, findOne};