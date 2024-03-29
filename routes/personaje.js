var express = require('express');
var router = express.Router();
var Personaje = require('../models/personaje');


router.get('/', async (req, res) => {
    try {
        const personajes = await Personaje.find({}, 'id name gender image url created');
        res.render('personaje', { personajes: personajes });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/todos', async (req, res, next) => {
    try {
        const personajes = await Personaje.find({}, 'id name gender image url created');
        res.render('todos', { personajes: personajes });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const personaje = await Personaje.findOne({id:id}, 'id name gender image url created');
        const fecha = personaje.created.split('T', 1)[0];
        /*const genero = personaje.gender;
        if(genero="Female"){
            genero="Femenino"
        }else if(genero="Male"){
            genero="Masculino"
        }else{
            genero="Unknow"
        }*/
        res.render('personaje', {personaje, fecha:fecha});
    } catch (error) {
        res.status(500).send(error);
    }
});



module.exports = router;