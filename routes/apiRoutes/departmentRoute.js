import express  from 'express';
import {db} from '../../db/connection.js';
import {Department} from '../../models/Department.js';
let router = express.Router();

const dep = new Department();

//Get all departments
router.get('/departments', (req, res) =>{
    db.query(dep.getSelect(), (err,results) =>{
        if(err)
        {
            res.send(500).json({
                errorMessage: err
            });
            return;
        }

        res.json({
            message: 'success',
            data: results
        })
    });
});

//get a single department by id
router.get('/departments/:id',(req, res) => {

    const params = [req.params.id];

    db.query(dep.getSelectById(), params, (err, result) => {
        if(err)
        {
            req.send(400).json({errorMessage: err });
        }

        res.json({
            message: 'success',
            data: result
        });
    })

});

//Create a department
router.post('/departments', (req, res) =>{
    const params =[req.body.name];

    db.query(dep.getInsert(), params, (err, result) =>{
        if(err)
        {
            res.send(400).json({
                errorMessage: message
            });
        }

        res.json({
            message: `New department ${req.body.name} created successfully`,
            data: req.body
        });
    });
});

//Delete a department
router.delete( '/departments/:id' ,(req, res) => {
    const params = [req.params.id];
    db.query(dep.getDelete(), params, (err, result) =>{
        if(err)
        {
            res.status(400).json({errorMessage: error});
            return;
        }
        else if(!result.affectedRows )
        {
            res.json({message: "Department record not found for delete"});
        }
        else{
            res.json({
                message: `Department deleted successfully`,
                changes: result.affectedRows,
                id: req.params.body
            });
        };
    });
});

export {router};