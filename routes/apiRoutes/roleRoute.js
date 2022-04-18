const router = require('express').Router();
const db = require('../../db/connection');
const Role = require('../../lib/Role');

const role = new Role();


router.get('/roles', (req, res) => 
{
    db.query(role.getSelect, (err, rows) => {
        if(err)
        {
            res.status(500).json({errorMessage: err});
            return;
        }

        res.json({
            message: 'sucess',
            data: rows
        });
    });

});

router.get('/roles:id', (req, res) => {
    var id = [req.params.id];

    db.query(role.selectById, id, (err, rows)=> {
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

router.post('/roles', (req, res)=> {

    //To Do add validate input
    var params = [req.body.title, 
                  req.body.salary,
                 req.body.department_id];
    
    db.query(role.getInsert(), params, (err, result) =>{
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


router.delete('/roles:id', (req, res) => {
    var params =[req.params.id];

    db.query(role.getDelete(), params, (err, result) => {
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
            }
    })
});   

module.exports= router;