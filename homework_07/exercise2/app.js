require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const aes256 = require('aes256');

const MongoClient = require('mongodb').MongoClient;



const client = new MongoClient(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`, { useNewUrlParser: true });


const app = express();

app.set('port', process.env.PORT || 3000);
app.set('x-powered-by', false);
const port = app.get('port');

app.use(doConnet);

app.get('/secret', (req, res) => {
    const db = req.result;
    const collection = db.collection('homework7');
    collection.findOne({}, function (err, doc) {
        const decipher = crypto.createDecipher("aes256", "asaadsaad");
        const decrypted = decipher.update(doc.message, 'hex', 'utf8') + decipher.final('utf8');

        client.close();

        res.send(decrypted);
    });
});

function doConnet(req, res, next) {
    client.connect((err) => {
        if (err) {
            throw err;
        } else {
            const db = client.db('library');
            console.log('Connected');
            req.result = db;
            return next();
        }
    });
}

app.listen(port, () => console.log(`Listening on port${port}`));