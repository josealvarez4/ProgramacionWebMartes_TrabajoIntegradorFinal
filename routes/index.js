var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var noticiasModel = require('../modelo/noticiasModel');
var tablasModel = require('../modelo/tablasModel');

var cloudinary = require('cloudinary').v2;

var paghome= true;

/* GET home page. */
router.get('/', async function (req, res, next) {
  var conocido = Boolean(req.session.nombre);

  var noticias = await noticiasModel.getNoticias();
  var tablas = await tablasModel.getTablaBasket();
  var tablahockey = await tablasModel.getTablaHockey();
  var tablafutbol = await tablasModel.getTablaFutbol();

 tablas = tablas.map(tabla => {
    if (tabla.logos) {
      const logo = cloudinary.url(tabla.logos, {
        width: 50,
        height: 50,
        crop: 'fill'
      });
      return {
        ...tabla,
        logo
      }
    } else {
      return {
        ...tabla,
        logo: ''
      }
    }
  });

  tablafutbol = tablafutbol.map(tabla => {
    if (tabla.img_tabla) {
      const imagenf = cloudinary.image(tabla.img_tabla, {
        crop: 'fill'
      });

      return {
        ...tabla,
        imagenf
      }
    } else {
      return {
        ...tabla,
        imagenf: '/images/noimage.png'
      }
    }
  });

  noticias = noticias.splice(0, 4); // Selecciona los primeros 4 elementos del array

  noticias = noticias.map(noticia => {
    if (noticia.img_id) {
      const imagen = cloudinary.url(noticia.img_id, {
        width: 460,
        crop: 'fill'
      });
      return {
        ...noticia,
        imagen
      }
    } else {
      return {
        ...noticia,
        imagen: '/images/noimage.png'
      }
    }
  });

  res.render('index', {
    noticias,
    tablas,
    tablahockey,
    tablafutbol,
    paghome,
    conocido: conocido,
    nombre: req.session.nombre
  });
});

// INICIO FORMULARIO CONTACTO
router.post('/', async (req, res, next) => {

  var nombre = req.body.nombre;
  var apellido = req.body.apellido
  var email = req.body.email;
  var tel = req.body.tel;
  var mensaje = req.body.mensaje;

  var obj = {
    to: "jlaalvarez.sf@gmail.com",
    subject: 'CONTACTO WEB',
    html: nombre + " " + apellido + " se contacto a través de la web y quiere más informacion a este correo: " + email +
      ".<br>Además hizo este comentario: " + mensaje + ".<br> Su tel es: " + tel
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  var info = await transport.sendMail(obj);

  res.render('index', {
    message: 'Mensaje enviado correctamente'
  });
});
// FIN FORMULARIO CONTACTO

module.exports = router;
