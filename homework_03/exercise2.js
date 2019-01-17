const EventEmitter = require('events');
class Gym extends EventEmitter {
    constructor() {
        super();
    }
}
const recCenter = new Gym();
recCenter.on('boom', () => console.log(`Athlete is working out`));
setInterval(() => {
    recCenter.emit('boom');
}, 1000);
