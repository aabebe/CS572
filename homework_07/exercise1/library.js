const book = {
    "title": 'Mastery',
    "ISBN": '12345abcd',
    "author": [
        {
            "name": 'Robert Green',
            "address": 'California',
            "numPublishedBooked": 4
        }
    ],

    "student": [
        {
            "name": 'andualem',
            "email": 'andualemhailu@gmail.com',
            "ID": '986736',
            "checkoutDate": new Date(),
            "returnDate": new Date(Date.now() + 12096e5) // 14 days from now
        }
    ],
    "available": true
};

module.exports = book;