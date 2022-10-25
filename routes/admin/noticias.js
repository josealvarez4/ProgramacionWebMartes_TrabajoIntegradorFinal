var express = require('express');
var router = express.Router();
var noticiasModel = require('./../../modelo/noticiasModel');

var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

var pagnoticias = true;
var clicknoticias = true;
var clickagregar = true;
var clickmodificar = true;

// Mostrar las Noticias
router.get('/', async function (req, res, next) {
  var persoconocida = Boolean(req.session.nombre);

  var noticias;

  // Buscador
  if (req.query.q === undefined) {
    noticias = await noticiasModel.getNoticias();
  } else {
    noticias = await noticiasModel.buscarNoticias(req.query.q);
  }

  noticias = noticias.map(noticias => {
    if (noticias.img_id) {
      const imagen = cloudinary.image(noticias.img_id, {
        width: 50,
        height: 50,
        crop: 'fill'
      });
      return {
        ...noticias,
        imagen
      }
    } else {
      return {
        ...noticias,
        imagen: ''
      }
    }
  });

  res.render('admin/noticias', {
    layout: 'admin/layout',
    persoconocida: persoconocida,
    persona: req.session.nombre,
    pagnoticias,
    clicknoticias,
    noticias,
    is_search: req.query.q !== undefined,
    q: req.query.q
  });
});

// Eliminar Noticias
router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;

  let noticia = await noticiasModel.getNoticiaById(id);
  if (noticia.img_id) {
    await (destroy(noticia.img_id));
  }

  await noticiasModel.deleteNoticiasById(id);
  res.redirect('/admin/noticias')

});

// Agregar Noticias
router.get('/agregar', async (req, res, next) => {
  var persoconocida = Boolean(req.session.nombre);

  res.render('admin/agregar', {
    layout: 'admin/layout',
    persoconocida: persoconocida,
    persona: req.session.nombre,
    clicknoticias,
    clickagregar
  });
});

router.post('/agregar', async (req, res, next) => {
  try {

    // Agregar imagen
    var img_id = '';
    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }

    console.log(req.body);
    if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
      await noticiasModel.insertNoticias({
        ...req.body,
        img_id
      });

      res.redirect('/admin/noticias')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        clicknoticias,
        clickagregar,
        error: true, message: 'Todos los campos son requeridos'
      })
    }
  } catch (error) {
    res.render('admin/agregar', {
      layout: 'admin/layout',
      clicknoticias,
      clickagregar,
      error: true, message: 'No se agrego la noticia'
    });
  }
});

// Modificar Noticias
router.get('/modificar/:id', async (req, res, next) => {
  var persoconocida = Boolean(req.session.nombre);

  var id = req.params.id;
  var noticia = await noticiasModel.getNoticiaById(id);
  res.render('admin/modificar', {
    layout: 'admin/layout',
    persoconocida: persoconocida,
    persona: req.session.nombre,
    clicknoticias,
    clickmodificar,
    noticia
  });
});

router.post('/modificar', async (req, res, next) => {
  var persoconocida = Boolean(req.session.nombre);

  try {
    let img_id = req.body.img_original;
    let borrar_img_vieja = false;

    if (req.body.img_delete === "1") {
      img_id = null;
      borrar_img_vieja = true;
    } else {
      if (req.files && Object.keys(req.files).length > 0) {
        imagen = req.files.imagen;
        img_id = (await uploader(imagen.tempFilePath)).public_id;
        borrar_img_vieja = true;
      }
    }
    if (borrar_img_vieja && req.body.img_original) {
      await (destroy(req.body.img_original));
    }

    console.log(req.body);
    var obj = {
      id: req.body.id_nuevo,
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo,
      img_id
    }

    console.log(obj);
    await noticiasModel.modificarNoticiaById(obj, req.body.id);
    res.redirect('/admin/noticias');
  }
  catch (error) {
    res.render('admin/modificar', {
      layout: 'admin/layout',
      persoconocida: persoconocida,
      persona: req.session.nombre,
      clicknoticias,
      clickmodificar,
      error: true, message: 'No se modifico la noticia'
    });
  }
});

module.exports = router;