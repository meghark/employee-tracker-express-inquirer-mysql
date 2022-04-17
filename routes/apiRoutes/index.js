const router = require('express').Router();
const empRouter = require('./employeeRoute');

router.use(empRouter);

module.exports = router;