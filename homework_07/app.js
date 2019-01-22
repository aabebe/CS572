const MongoClient = require('mongodb').MongoClient;
const book = require('./library');

const client = new MongoClient('mongodb://sysadmin:Admin12345@ds163254.mlab.com:63254/library', { uri_decode_auth: true });

function dbConn() {
    client.connect(async (err) => {
        if (err) {
            throw err
        } else {
            console.log("Connected");
            const db = client.db('library');
            const collection = db.collection('books');
            const result = await collection.insertOne(book);
            console.log(result);
            client.close;
        }
    });
}
dbConn();

