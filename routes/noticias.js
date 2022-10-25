var express = require('express');
var router = express.Router();
var noticiasModel = require('../modelo/noticiasModel');

var cloudinary = require('cloudinary').v2;

var pagnoticias = true;

/* GET users listing. */
router.get('/', async function(req, res, next) {
  var conocido = Boolean(req.session.nombre);

  noticias = await noticiasModel.getNoticias();

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

  res.render('noticias', {
    conocido: conocido,
    nombre: req.session.nombre,
    pagnoticias,
    noticias
  });
});

// Leer Noticia
router.get('/noticia/:id', async (req, res, next) => {
  var conocido = Boolean(req.session.nombre);
  var vernoticia = true;
  
  var id = req.params.id;
  var noticia = await noticiasModel.getNoticiaById(id);

  const imagen = cloudinary.url(noticia.img_id, {
    width: 460,
    crop: 'fill'
  });

  var noticias = await noticiasModel.getNoticias();

  noticias = noticias.splice(0, 5); // Selecciona los primeros 5 elementos del array
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

  res.render('noticias', {
    layout: 'layout',
    conocido: conocido,
    nombre: req.session.nombre,
    pagnoticias,
    vernoticia,
    imagen,
    noticias,
    noticia
  });
});

module.exports = router;