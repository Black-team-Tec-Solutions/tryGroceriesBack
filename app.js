require("dotenv").config()

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require("mongoose")
const cors = require("cors")

mongoose.connect(process.env.DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then((x)=>{
    console.log(`Connect to Mongo! Database name: "${x.connections[0].name}"`)
}).catch((err)=>{
    console.log("Error connecting to mongo", err)
})

const app = express();

app.use(
        cors({
            origin:["http://localhost:3000","https://www.paginaDeploy.com"],
            credentials:true,
        })
    );

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const dietRouter = require('./routes/diet');

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth',authRouter);
app.use('/api/diet',dietRouter);


app.use('*', (req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"))
})

module.exports = app;
