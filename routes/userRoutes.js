const express = require('express');

//creating Router using express's in-built function
const router = express.Router();

//using the router
//separate routing for big projects, cannot put everything in app.js
//user related path in userRoutes
//customers in customerRoutes
//using these separate files in app.js as a controller
router.get('/', (req,res)=>{
    res.send('Get All Users')
})

router.post('/', (req,res)=>{
    res.send('new User created')    
})


//can only update / delete a single thing
//cannot delete / update everything at one

// /user/3 means delete user 3
router.delete('/:id', (req,res)=>{
    const id=req.params.id; // id I am capturing from URL
    res.send(`User ${id} is deleted`)  
})

// /user/3 means update user 3
router.put('/:id', (req,res)=>{
    const id=req.params.id; // id I am capturing from URL
    res.send(`User ${id} is updated successfully`)
})

module.exports = router // export the router to use it in app.js