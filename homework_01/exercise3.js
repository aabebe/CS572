const item = {
    name: 'Biscuits',
    type: 'regular',
    category: 'food',
    price: 200
}

const applyCoupon = function (item) {
    return function (discount) {
        item.price = item.price - ((item.price * discount) / 100);
        return item;
    }
}
console.log(applyCoupon(item)(10).price === 180);