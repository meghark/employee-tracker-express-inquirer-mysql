import express  from 'express';
import {router} from './routes/apiRoutes/index.js';
const PORT = process.env.PORT||3002; 
import {db} from './db/connection.js';
//start server
const app = express();


//middleware setup
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api', router);
app.use((req, res)=> {
    res.status(404).end();
})

db.connect(err => {
    if(err)
    {
        throw err;
    }
    console.log("Database connected");

    app.listen(PORT, ()=>{
        console.log(`App running on port ${PORT}`);
    });
})

