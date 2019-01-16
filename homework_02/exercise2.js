Array.prototype.even = function () {

    setTimeout(() => {
        console.log(this.filter(n => n % 2 === 0));
    }, 1000);
};

Array.prototype.odd = function () {
    setTimeout(() => {
        console.log(this.filter(c => c % 2 === 1));
    }, 1000);
};

console.log('start');
[1, 2, 3, 4, 5, 6, 7, 8].even();
[1, 2, 3, 4, 5, 6, 7, 8].odd();
console.log('end');