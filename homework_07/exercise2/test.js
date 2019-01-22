const express = require("express");
const crypto = require("crypto");
const aes256 = require("aes256");
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://sysadmin:Admin12345@ds163254.mlab.com:63254/library', { useNewUrlParser: true });

const app = express();

app.set("port", process.env.PORT || 3000);
const port = app.get("port");

app.use(function (req, res, next) {
    console.log("hey");

    function doConnect() {
        client.connect((err) => {
            if (err) {
                throw err
            } else {
                console.log('Successfully connected to MongoDB')
                const db = client.db('library');
                // const collection = db.collection('homework07');
                // client.close;
                req.result = db;
                return next();
            }
        })
    }
    doConnect()
});

app.get("/secret", (req, res) => {
    const db = req.result;
    const collection = db.collection('homework7');
    collection.findOne({}, function (err, doc) {
        console.log(doc);
        const decipher = crypto.createDecipher("aes256", "asaadsaad");
        const decrypted = decipher.update(doc.message, 'hex', 'utf8') + decipher.final('utf8');
        client.close;
        res.send(decrypted);
        // req.result = collection;
        // req.next();
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));