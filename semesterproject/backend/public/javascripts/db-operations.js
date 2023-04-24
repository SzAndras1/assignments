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

module.exports = insert;