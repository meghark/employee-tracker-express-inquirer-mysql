const express = require('express');
const routes = require('./routes/apiRoutes');
const PORT = process.env.PORT||3002; 
const db = require('./db/connection');
//start server
const app = express();


//middleware setup
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api', routes);
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

