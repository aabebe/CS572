const dns = require('dns');
const hostname = 'www.mum.edu';
dns.resolve4(hostname, (err, data) => {
    console.log(data);
});

// Using a Promise object

const { promisify } = require('util');
const ipString = promisify(dns.resolve4);

ipString(hostname)
    .then(data => console.log(data))
    .catch(err => console.error(err));

// Using Async/Await

async function main() {
    try {
        const result = await ipString(hostname);
        console.log(result);
    } catch (err) {
        console.error(err);
    }
}
main();