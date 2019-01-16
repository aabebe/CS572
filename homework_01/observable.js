const { of } = require('rxjs');
const { map, filter } = require('rxjs/operators');
const word = ['house', 'nice'];
const statement = 'This house is very nice';

of(word)
    .pipe(
        map(n => statement.replace(n, '***'))
    )
    .subscribe(data => console.log(data));