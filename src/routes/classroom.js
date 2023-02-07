const express = require("express");
const ClassRoomSchema = require("../models/classroom");


const router = express.Router();

router.post('/classrooms' ,(req, res) => {
    
    const classroom = ClassRoomSchema(req.body);

    classroom
        .save()
        .then((data)=> res.json(data))
        .catch((error)=> res.json({mesagge: error}));

//obtener todos los usuarios o listar
});
router.get('/classrooms', (req, res) =>{
    ClassRoomSchema
        .find() //en lugar de guardar buscamos
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}));
});
//obtener un usuario
router.get('/classrooms/:id', (req, res) =>{
    const { id } = req.params;
    ClassRoomSchema
        .findById(id) //buscamos por id
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}));
});
//actulizar usuario
router.put('/classrooms/:id', (req, res) =>{
    const { id } = req.params;
    const { Class, Order, numberOfStudents, active, ListStudents} = req.body;
    ClassRoomSchema
        .updateOne({ _id: id },{ $set: {Class, Order, numberOfStudents, active, ListStudents} }) //buscamos por id
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}));
});

//borrar un usuario
router.delete('/classrooms/:id', (req, res) =>{
    const { id } = req.params;
    ClassRoomSchema
        .remove({ _id: id }) //buscamos por id
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}));
});

module.exports = router;
