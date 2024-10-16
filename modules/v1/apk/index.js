var express = require('express');
var router = express.Router();

router.use('/auth', require('./Auth/auth.route'));
router.use('/startup', require('./StartUp/startup.route'));


module.exports = router;