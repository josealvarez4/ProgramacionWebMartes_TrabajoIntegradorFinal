var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../modelo/usuariosModel');

var pagindex = true;

router.get('/', function (req, res, next) {
    var persoconocida = Boolean(req.session.nombre);
    
    res.render('admin/index', {
        layout: 'admin/layout',
        persoconocida: persoconocida,
        persona: req.session.nombre,
        pagindex
    });
});

//DESTRUIR session
router.get('/logout', function (req, res, next) {
    req.session.persona.destroy();
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});
//FIN DESTRUIR session

router.post('/', async (req, res, next) => {
    try {
        var usuario = req.body.usuario;
        var password = req.body.password;

        console.log(req.body);

        var data = await usuariosModel.getUserAndPassword(usuario, password);

        if (data != undefined) {
            req.session.id_usuario = data.id;
            req.session.nombre = data.usuario;
            res.redirect('/admin/noticias');
        } else {
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true
            })
        }
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;
