const express = require("express");
const userSchema = require("../models/user");
const ClassRoomSchema = require("../models/classroom");
const StudentSchema = require("../models/student");

const router = express.Router();

//creacion de usuario
router.post('/users', (req, res)=>{
    const user = userSchema(req.body);
    user
        .save()
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}));
});

//obtener todos los usuarios

router.get('/users', (req, res)=>{//usamos get ya que aqui vamos a obtener
    userSchema
        .find() //en lugar de guardar buscamos
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}));
});

//obtener 1 usuario
router.get('/users/:id', (req, res)=>{
    const {id} = req.params;
    userSchema
        .findById(id)//buscamos por el id
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}));
});

//Actualizar un usuario
router.put('/users/:id', (req, res)=>{
    const {id} = req.params;
    const {name, age, email} = req.body;
    userSchema
        .updateOne({_id: id}, { $set: { name, age, email }})//con $set actualizamos los datos
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}));
});


//Borrar un usuario
router.delete('/users/:id', (req, res)=>{
    const {id} = req.params;
    userSchema
        .remove({_id: id})
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}));
});
module.exports = router;