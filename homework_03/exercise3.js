const http = require('http');
const fs = require('fs');
const path = require('path');

// Using Stream to read the file


http.createServer((req, res) => {
    const readable = fs.createReadStream(path.join(__dirname, 'greet.txt')).pipe(res);
}).listen(3000, () => console.log(`Listening on port 3000`));

// Using Sync readFile to load

// http.createServer((req, res) => {
//     const write = fs.readFileSync(path.join(__dirname, 'greet.txt'), 'utf8')
//     res.end(write);
// }).listen(3000, () => console.log(`listening on port 3000`));

// Using Async readFile to read the file


// http.createServer((req, res) => {
//     const write = fs.readFile(path.join(__dirname, 'greet.txt'), 'utf8', (err, data) => {
//         if (err) throw new Error(err);
//         console.log(`Done`);
//         res.end(write);
//     });

// }).listen(3000, () => console.log(`Listening on port 3000`));