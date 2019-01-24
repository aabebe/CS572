const express = require('express');
const MongoClient = require('mongodb').MongoClient;


const app = express();
const client = new MongoClient('mongodb://localhost', { useNewUrlParser: true });

app.set('port', process.env.PORT || 3000);
const port = app.get('port');

app.use(express.json());

let db;

app.use((req, res, next) => {
    if (!db) {
        client.connect((err) => {
            if (err) return next(new Error(err));
            db = client.db('homework9');
            req.db = db;
            return next();
        });
    } else {
        req.db = db;
        return next();
    }
})

app.get('/zips', (req, res, next) => {
    req.db.collection('zipcodes').find({}).limit(10).toArray((err, data) => {
        if (err) return next(new Error(err));
        res.send(data);
    });
})
app.get('/question1', async (req, res, next) => {
    try {
        const result = await req.db.collection('zipcodes').aggregate([
            { $match: { 'state': 'IA' } },
            { $group: { '_id': '$state', 'zipcodes': { $addToSet: '$_id' } } },
            { $project: { '_id': 0, 'state': '$_id', 'zipcodes': 1 } }
        ]).toArray();
        res.send(result);
    } catch (err) {
        return next(new Error(err));
    }

})
app.get('/question2', (req, res, next) => {
    req, db.collection('zipcodes').aggregate([
        { $match: { 'pop': { $gt: 1000 } } },
        //optionals
        { $group: { _id: "$state", zip_codes: { $addToSet: "$_id" } } },
        { $project: { _id: 0, state: "$_id", zip_codes: 1 } }
    ]).toArray((err, data) => {
        if (err) return next(new Error(err));
        res.send(data);
    })
})
app.get('/question3', (req, res, next) => {
    req, db.collection('zipcodes').aggregate([
        { $group: { '_id': { 'state': '$state', 'city': '$city' }, 'zip': { $sum: 1 } } },
        { $match: { 'zip': { $gt: 1 } } },
        { $sort: { 'state': 1, 'city': 1 } }
    ]).toArray((err, data) => {
        if (err) throw err;
        res.send(data);
    })
})
app.get('/question4', (req, res, next) => {
    req.db.collection('zipcodes').aggregate([
        { $group: { '_id': { 'state': "$state", 'city': "$city" }, 'populations': { $sum: "$pop" } } },
        { $sort: { 'populations': 1 } },
        { $group: { '_id': "$_id.state", 'city': { $first: "$_id.city" }, 'populations': { $first: "$populations" } } },
        { $project: { '_id': 0, 'state': "$_id", 'city': 1, 'populations': 1 } },
        { $sort: { 'state': 1 } },
        { $skip: 1 }
    ]).toArray((err, data) => {
        if (err) throw err;
        res.send(data);
    })
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).send('Error has occurred');
})

app.listen(port, () => console.log(`Listening on port ${port}`));