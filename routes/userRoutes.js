const express = require('express');
// to use storage
const storage = require('node-persist');
storage.init(); //initialiaze storage


//creating Router using express's in-built function
const router = express.Router();

//using the router
//separate routing for big projects, cannot put everything in app.js
//user related path in userRoutes
//customers in customerRoutes
//using these separate files in app.js as a controller


//get all users
router.get('/', async function (req, res) {
    try {
        const value = await storage.values(); //gives all values
        //res.send('Get All Users')
        res.send(value)
    } catch (error) {
        console.log(error)
    }

})

//get single user by ID
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const userData = await storage.getItem(id);
    if (userData)
        return res.status(200).send({ 'Message': 'User Found', userData })
    else
        return res.status(404).send({ 'Message': 'User Not Found' })
})

//new user
router.post('/', (req, res) => {
    const { id, name, email, country } = req.body;
    storage.setItem(id, { id, name, email, country });
    //console.log(req.body); //this is form data coming from user
    res.status(201).send('new User created')
})


//can only update / delete a single thing
//cannot delete / update everything at one



//delete user by ID
// /user/3 means delete user 3
router.delete('/:id', async (req, res) => {
    const id = req.params.id; // id I am capturing from URL
    const userData = await storage.getItem(id);
    //res.send(`User ${id} is deleted`)
    if (userData) {
        await storage.removeItem(id);
        res.send({ message: 'User deleted successfully' })
    } else {
        res.send({ message: `User with this ID ${id} is not registered with us` })
    }

})

// /user/3 means update user 3
//cannot update ID
router.put('/:id', async (req, res) => {
    const id = req.params.id; // id I am capturing from URL
    const userData = await storage.getItem(id);
    if(userData){
        const {name,email,country}=req.body; //getting data from the BODY
        if(name)
            userData.name=name
        if(email)
            userData.email=email
        if(country)
            userData.country=country
        await storage.updateItem(id,userData)
        res.status(200).send({message:'User updated successfully'})
    } else{

        res.send(`User with this ID ${id} is not avaioable to Update`)
    }
    
})

module.exports = router // export the router to use it in app.js