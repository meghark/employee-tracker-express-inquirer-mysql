const router = require('express').Router();
const empRouter = require('./employeeRoute');
const deptRouter = require('./departmentRoute');
const roleRouter = require('./roleRoute');

router.use(empRouter);
router.use(deptRouter);
router.use(roleRouter);

module.exports = router;