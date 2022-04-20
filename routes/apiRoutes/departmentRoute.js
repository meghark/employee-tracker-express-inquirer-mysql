const router = require('express').Router();
const db= require('../../db/connection');
const Department = require('../../lib/Department');

const dep = new Department();

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
            message: 'success',
            data: req.body
        });
    });
});

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
            res.json({message: "Record not found for delete"});
        }
        else{
            res.json({
                message: 'success',
                changes: result.affectedRows,
                id: req.params.body
            });
        };
    });
});

module.exports = router;