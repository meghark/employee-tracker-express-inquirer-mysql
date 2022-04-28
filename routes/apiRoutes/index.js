import express  from 'express';
import {router  as empRouter }  from './employeeRoute.js';
import {router as deptRouter}  from './departmentRoute.js';
import {router as roleRouter}  from './roleRoute.js';
let router = express.Router();

router.use(empRouter);
router.use(deptRouter);
router.use(roleRouter);

export {router};