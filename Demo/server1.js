const express = require('express');

const app = express();

app.get('/', (req,res)=>{
    res.sendFile(__dirname+ '/views/index.html')
})
app.get('/about', (req,res)=>{
    res.send('<h1>About Us</h1>')
})

app.get('/contact', (req,res)=>{
    res.send('<h1>Contact Us</h1>')
})

app.listen(5000,()=>console.log('Server started'))