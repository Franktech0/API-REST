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

});


module.exports = router;