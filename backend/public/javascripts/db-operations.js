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
// Ordered option prevents additional documents from being inserted if one fails
const insertMany = function (collection, array) {
    MongoClient.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
        .then((db) => {
            const dbo = db.db('semesterproject');
            return dbo.collection(collection).insertMany(array, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                ordered: true
            }).then((coll) => {
                console.log(`${array.length} documents inserted`);
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

// I needed to get the name to have a comparison data to update the object
const updateObj = function (collection, obj) {
    const query = {};
    const newValues = {$set: {}};
    let i = 0;
    for (const [key, value] of Object.entries(obj)) {
        if (i === 0) {
            query[key] = value;
        } else {
            newValues["$set"][key] = value;
        }
        i++;
    }
    console.log(newValues)
    MongoClient.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
        .then((db) => {
            const dbo = db.db('semesterproject');
            return dbo.collection(collection).updateOne(query, newValues, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            }).then((coll) => {
                //console.log('1 document updated');
                console.log(coll);
            }).catch(err => {
                console.log(`DB Connection Error: ${err.message}`);
            }).finally(() => {
                console.log('Close DB');
                db.close();
            })
        });
}

const deleteObj = function (collection, obj) {
    MongoClient.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
        .then((db) => {
            const dbo = db.db('semesterproject');
            return dbo.collection(collection).deleteOne(obj, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            }).then((coll) => {
                console.log('1 document deleted');
                //console.log(coll);
            }).catch(err => {
                console.log(`DB Connection Error: ${err.message}`);
            }).finally(() => {
                console.log('Close DB');
                db.close();
            })
        });
}

module.exports = {insert, insertMany, findByUsername, findOne, updateObj, deleteObj};