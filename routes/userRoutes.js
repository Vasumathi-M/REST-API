const express = require('express');
const {getUserById, getAllUsers, addUser, deleteUserById, updateUserById } = require('../controllers/userController');


//creating Router using express's in-built function
const router = express.Router();

//using the router
//separate routing for big projects, cannot put everything in app.js
//user related path in userRoutes
//customers in customerRoutes
//using these separate files in app.js as a controller


//get all users
router.get('/', getAllUsers)

//get single user by ID
router.get("/:id", getUserById)

//new user
router.post('/',addUser)

//can only update / delete a single thing
//cannot delete / update everything at one

//delete user by ID
// /user/3 means delete user 3
router.delete('/:id', deleteUserById)

//update user by ID
// /user/3 means update user 3
//cannot update ID
router.put('/:id', updateUserById)

module.exports = router // export the router to use it in app.js