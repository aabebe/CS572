const { Observable } = require('rxjs');
const os = require('os');
// console.log(os.totalmem() / 1024 / 1024 / 1024);
// console.log(os.cpus().length);


Observable.create(function checkSum() {
    console.log(`Checking your system..........`);
    const memorySize = os.totalmem() / 1024 / 1024 / 1024;
    const numCore = os.cpus().length;
    if (memorySize < 4) {
        console.log(`This app needs atleast 4 GB of RAM`);
    }
    else if (numCore < 2) {
        console.log(`Processor isnot supported`);
    }
    else {
        console.log(`System is checked successfully`);
    }

}).subscribe()

