const req = require('express/lib/request');
const db = require('../../db/connection');
const Employee = require('../../lib/Employee');
const router = require('express').Router();

var emp = new Employee();
router.get('/employee', (req, res) => {
    
    db.query(emp.select(), (err, rows) => {
        if(err)
        {
            res.status(500).json({err: errorMessage});
            return;            
        }
        res.json({
            message: 'success',
            date: rows
        });
    });

});

router.get('/employee:id', (req, res) => {
    var id = [req.params.id];

    db.query(emp.selectById, id, (err, rows)=> {
        if(err)
        {
            res.status(400).json({errorMessage : err});
            return;
        }
        
        res.json({
            message: 'success',
            data: rows
        })
    })
});

router.post('/employee', (req, res)=> {

    //To Do add validate input
    var params = [req.body.first_name, 
                  req.body.last_name,
                 req.body.role_id,
                req.body.manager_id];
    
    db.query(emp.getInsert(), params, (err, result) =>{
        if(err)
        {
            res.status(400). json({errorMessage: err});
            return;
        }

        res.json({
            message :'success',
            data: body
        })

    })
});


router.delete('/employee:id', (req, res) => {
    var params =[req.params.id];

    db.query(emp.getDelete(), params, (err, result) => {
        if(err)
        {
            res.status(400).json({errorMessage : err});
            return;
        }else if(!result.affectedRows)
        {
            res.json({message: "Candidate not found"});
        }
        else{
            res.json({
                message: 'deleted',
                changes : result.affectedRows,
                id: req.params.id
            });
        };   

    });
});

module.exports = router;