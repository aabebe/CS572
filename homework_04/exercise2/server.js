const http = require('http');
const { Observable } = require('rxjs');
const { fork } = require('child_process');
const url = require("url");

Observable.create(() => {
    http.createServer((req, res) => {
        if (req.url === '/?url=path/to/my/file.text') {
            const myURL = req.url;
            console.log(url.parse(myURL));

            const child_process = fork('child.js');
            child_process.send('start');
            child_process.on('message', (data) => {
                res.end(data);
            })
        }
    }).listen(4000, () => console.log(`Listening on port 4000`));
}).subscribe();