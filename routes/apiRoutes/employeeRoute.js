import express  from 'express';
import {db} from '../../db/connection.js';
import {Employee} from '../../lib/Employee.js';
let router = express.Router();

var emp = new Employee();

//API route to get all employees or employees by query params.
router.get('/employees', (req, res) => {
    
    let selectQuery='';
    let params;

    //Api calls for a single manager, department etc.
    if(req.query.manager)
    {
        selectQuery = emp.getEmployeeByManager();
        if (typeof req.query.manager == 'string')
        {
            params =[req.query.manager]
        }
        else 
        {
            params = req.query.manager;
        }

    }
    else if(req.query.department)
    {
        selectQuery = emp.getEmployeesByDepartment();
        if (typeof req.query.department == 'string')
        {
            params =[req.query.department]
        }
        else 
        {
            params = req.query.department;
        }
    };

    if(params)
    {   console.log(params);
        db.query(selectQuery,params,(err, rows) => {
            if(err)
            {
                res.status(500).json({errorMessage: err});
                return;            
            }
            res.json({
                message: 'success',
                data: rows
            });
        });
    }
    else{
            selectQuery = emp.getSelect();
            db.query(selectQuery, (err, rows) => {
                if(err)
                {
                    res.status(500).json({errorMessage: err});
                    return;            
                }
                res.json({
                    message: 'success',
                    data: rows
                });
            });
    }   

});

//get all employees who are managers
router.get('/manager', (req, res) => {    
    db.query(emp.getManagers(), (err, rows) => {
        if(err)
        {
            res.status(500).json({err: errorMessage});
            return;            
        }
        res.json({
            message: 'success',
            data: rows
        });
    })
});

//Get a specific employee by id
router.get('/employees/:id', (req, res) => {
    var id = [req.params.id];
    db.query(emp.getSelectById(), id, (err, rows)=> {
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

router.post('/employees', (req, res)=> {

    //console.log(req);
    //To Do add validate input
    const params = [req.body.first_name, 
                  req.body.last_name,
                 req.body.role_id,
                req.body.manager_id];
    
    console.log(params);
    db.query(emp.getInsert(), params, (err, result) =>{
        if(err)
        {
            res.status(400). json({errorMessage: err});
            return;
        }

        res.json({
            message :'success',
            data: req.body
        })

    })
});

router.put('/employees/:id', (req, res) => {
    let query ='';
    let params = '';

    if(req.body.role_id)
    {
        query = emp.getUpdate();
        params = [req.body.role_id,req.params.id];

    }else if(req.body.manager_id)
    {
        query = emp.getUpdateByManager();
        params = [req.body.manager_id,req.params.id];
    }

    console.log(query);
    console.log(params);
    
    db.query(query, params, (err, result)=> {
        if(err)
        {
            res.status(400).json({errorMessage: err});
            return;
        }else if(!result.affectedRows)
        {
            res.json({
                message: "Candidate not found"
            });
        }
        else {
            res.json({
                message: 'Success',
                changes : result.affectedRows,
                data: req.body
            });
        };
    });
});

router.delete('/employees/:id', (req, res) => {
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

export {router};