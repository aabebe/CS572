var express = require('express');
var router = express.Router();
const axios = require('axios');
/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const response = await axios('https://randomuser.me/api/?results=10');
    // console.log(getFile.data);
    res.set({
      'Cache-control': 'private, max-age=86400',
      'Last-Modified': new Date(),
      'Link': `<https://randomuser.me/api/?page=1&results=10>; rel="first",` +
        `<https://randomuser.me/api/?page=${response.data.info.page + 1}&results=10&seed=${response.data.info.seed}>; rel="next",` +
        `<https://randomuser.me/api/?page=${response.data.info.page - 1}&results=10&seed=${response.data.info.seed}>; rel="prev"`
    });
    res.json(response.data.results);
  } catch (err) {
    res.send(404).send('File not Found');
  }
});

module.exports = router;
