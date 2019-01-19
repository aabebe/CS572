var express = require('express');
var router = express.Router();
const axios = require('axios');
/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const getFile = await axios('https://randomuser.me/api/?results=10');
    // console.log(getFile.data);
    res.header('Link:<https://randomuser.me/api/?results=10&page=2>; rel="next"')
    res.set('Cache-Control', 'private, max-age=86400');
    console.log(req.query);
    res.send(getFile.data);
  } catch (err) {
    res.send(404).send('File not Found');
  }
});

module.exports = router;
