const express = require('express');
const Joi = require('joi');


const router = express.Router();

const grades = [
    { id: 1, name: 'Asaad Saad', course: 'CS572', grade: 100 },
    { id: 2, name: 'Andualem Abebe', course: 'CS572', grade: 98 },
    { id: 3, name: 'Atif Mukhtiar', course: 'CS572', grade: 99 }
];

router.get('/', (req, res) => {
    res.send(grades);
});

router.get('/:id', (req, res) => {
    const grade = grades.find(c => c.id === parseInt(req.params.id));
    if (!grade)
        return res.status(404).send(`The grade with the given ID was not found`);
    res.send(grade);
});

router.post('/', (req, res) => {
    const { error } = validateGrade(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const grade = {
        id: req.body.id,
        name: req.body.name,
        course: req.body.course,
        grade: req.body.grade
    };

    grades.push(grade);
    res.send(grade);
});

router.put('/:id', (req, res) => {
    const grade = grades.find(c => c.id === parseInt(req.params.id));
    if (!grade)
        return res.status(404).send(`The grade with the given ID was not found`);

    const { error } = validateGrade(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    grade.id = req.body.id;
    grade.name = req.body.name;
    grade.course = req.body.course;
    grade.grade = req.body.grade;

    res.send(grade);

});

router.delete('/:id', (req, res) => {
    const grade = grades.find(c => c.id === parseInt(req.params.id));
    if (!grade)
        return res.status(404).send(`The grade with the given ID was not found`);
    const index = grades.indexOf(grade);
    grades.splice(index, 1);

    res.send(grade);

})
















function validateGrade(grade) {
    const schema = {
        id: Joi.number().required(),
        name: Joi.string().required(),
        course: Joi.string().required(),
        grade: Joi.number().required()
    };
    return Joi.validate(grade, schema);
}

module.exports = router;