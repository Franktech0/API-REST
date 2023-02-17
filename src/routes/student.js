const express = require("express");
const StudentSchema = require("../models/student");

const router = express.Router();


//crear estudiante
router.post('/students' ,(req, res) => {
    
    const student = StudentSchema(req.body);

    student
        .save()
        .then((data)=> res.json(data))
        .catch((error)=> res.json({mesagge: error}));
//obtener todos los usuarios o listar
});
router.get('/students', (req, res) =>{
    StudentSchema
        .find() //en lugar de guardar buscamos
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}));
});
//obtener un usuario
router.get('/students/:id', (req, res) =>{
    const { id } = req.params;
    StudentSchema
        .findById(id) //buscamos por id
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}));
});
//actulizar usuario
router.put('/students/:id', (req, res) =>{
    const { id } = req.params;
    const { name, age, active, Order } = req.body;
    StudentSchema
        .updateOne({ _id: id },{ $set: {name, age, active, Order} }) //buscamos por id
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}));
});

//borrar un usuario
router.delete('/students/:id', (req, res) =>{
    const { id } = req.params;
    StudentSchema
        .remove({ _id: id }) //buscamos por id
        .then((data)=>res.json(data))
        .catch((error)=>res.json({message: error}));
});




module.exports = router;