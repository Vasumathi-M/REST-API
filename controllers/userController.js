//write all data related logic
const storage = require('node-persist');
const bcrypt = require('bcrypt');

//GET
const getAllUsers = async function (req, res) {
    try {
        const value = await storage.values(); //gives all values
        //res.send('Get All Users')
        res.send(value)
    } catch (error) {
        console.log(error)
    }

}

const getUserById = async (req, res) => {
    const id = req.params.id;
    const userData = await storage.getItem(id);
    if (userData)
        return res.status(200).send({ 'Message': 'User Found', userData })
    else
        return res.status(404).send({ 'Message': 'User Not Found' })
}

//POST
const addUser =  (req, res) => {
    const { id, name, email, country, password } = req.body;
    const hashPassword = bcrypt.hash(password,10)
    storage.setItem(id, { id, name, email, country, password:hashPassword });
    //console.log(req.body); //this is form data coming from user
    res.status(201).send('new User created')
}

//DELETE
const deleteUserById = async (req, res) => {
    const id = req.params.id; // id I am capturing from URL
    const userData = await storage.getItem(id);
    //res.send(`User ${id} is deleted`)
    if (userData) {
        await storage.removeItem(id);
        res.send({ message: 'User deleted successfully' })
    } else {
        res.send({ message: `User with this ID ${id} is not registered with us` })
    }

}

//PUT
const updateUserById = async (req, res) => {
    const id = req.params.id; // id I am capturing from URL
    const userData = await storage.getItem(id);
    if(userData){ 
        const {name,email,country, password}=req.body; //getting data from the BODY
        if(name)    //checking if it is available
            userData.name=name
        if(email)
            userData.email=email
        if(country)
            userData.country=country
        if(password)
            userData.password=await bcrypt.hash(password,10);
        await storage.updateItem(id,userData)
        res.status(200).send({message:'User updated successfully'})
    } else{

        res.send(`User with this ID ${id} is not avaioable to Update`)
    }
    
}


//exporting multiple functions (function names separated by comma)
module.exports = { 
    getAllUsers, 
    getUserById, 
    addUser,
    deleteUserById,
    updateUserById
}