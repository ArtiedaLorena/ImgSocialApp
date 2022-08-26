const express = require ("express");
const config = require("./server/config")

//Database
require('./database')


const app = config(express());





//Starting server
app.listen((app.get('port')), ()=>{
    console.log('Server is running on port', app.get('port'))
})

