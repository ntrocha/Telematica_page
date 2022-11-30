var express = require('express');
var router = express.Router();
const controller = require('../controllers/controller');
/* GET users listing. */
router.get('/', controller.loging);

module.exports = router;
