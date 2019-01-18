const fs = require('fs');
const path = require('path');

const readFrom = () => {
    const read = fs.readFileSync(path.join(__dirname, 'file.txt'), 'utf8');
    return read;
};

process.on('message', () => {
    const data = readFrom();
    process.send(data);
});