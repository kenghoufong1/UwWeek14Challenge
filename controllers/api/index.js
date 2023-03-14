const router = require('express').Router();
const userblogroutes = require('./userblog-routes.js');
const userroutes = require('./user-routes');

router.use('/user', userroutes);
router.use('/userblog', userblogroutes);

module.exports = router;