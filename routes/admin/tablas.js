var express = require('express');
var router = express.Router();
var tablasModel = require('./../../modelo/tablasModel');

var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

var clicktabla = true;
var pagtabla = true;

var clickagregar = true;
var clickagregarb = true;
var clickagregarf = true;
var clickagregarh = true;
var clickmodificar = true;

var mostrarbasket = true;
var mostrarfutbol = true;
var mostrarhockey = true;

// Mostrar las Tablas
router.get('/', async function (req, res, next) {
  var persoconocida = Boolean(req.session.nombre);

  var tablas = await tablasModel.getTablaBasket();
  var tablahockey = await tablasModel.getTablaHockey();
  var tablafutbol = await tablasModel.getTablaFutbol();

  tablas = tablas.map(tablas => {
    if (tablas.logos) {
      const imagen = cloudinary.image(tablas.logos, {
        width: 50,
        height: 50,
        crop: 'fill'
      });
      
      return {
        ...tablas,
        imagen
      }
    } else {
      return {
        ...tablas,
        imagen: ''
      }
    }
  });

  tablafutbol = tablafutbol.map(tabla => {
    if (tabla.img_tabla) {
      const imagenf = cloudinary.image(tabla.img_tabla, {
        
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



  res.render('admin/tablas', {
    layout: 'admin/layout',
    persoconocida: persoconocida,
    persona: req.session.nombre,
    clicktabla,
    pagtabla,
    mostrarbasket,
    tablas,
    tablahockey,
    tablafutbol
  });
});

// Eliminar Equipo basket
router.get('/eliminarequipo/:id', async (req, res, next) => {
  var id = req.params.id;

  let equipo = await tablasModel.getEquipoById(id);
  if (equipo.logos) {
    await (destroy(equipo.logos));
  }

  await tablasModel.deleteBasketById(id);

  res.redirect('/admin/tablas')

});

// Agregar Equipo basket
router.get('/agregarbasket', async (req, res, next) => {
  var persoconocida = Boolean(req.session.nombre);

  res.render('admin/agregartablas', {
    layout: 'admin/layout',
    persoconocida: persoconocida,
    persona: req.session.nombre,
    mostrarbasket,
    clicktabla,
    clickagregar,
    clickagregarb
  });
});

router.post('/agregarbasket', async (req, res, next) => {
  try {

    // Agregar imagen
    var logos = '';
    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      logos = (await uploader(imagen.tempFilePath)).public_id;
    }

    console.log(req.body);
    if (req.body.equipo != "" && req.body.puntos != "" && req.body.jugados != "" && req.body.ganados != "" && req.body.perdidos != "" && req.body.ppp != "" && req.body.pcpp != "") {
      await tablasModel.insertBasket({
        ...req.body,
        logos
      });

      res.redirect('/admin/tablas')
    } else {
      res.render('admin/agregartablas', {
        layout: 'admin/layout',
        clicktabla,
        clickagregar,
        clickagregarb,
        mostrarbasket,
        error: true, message: 'Todos los campos son requeridos'
      })
    }
  } catch (error) {
    res.render('admin/agregartablas', {
      layout: 'admin/layout',
      clicktabla,
      clickagregar,
      clickagregarb,
      mostrarbasket,
      error: true, message: 'No se agrego el equipo'
    });
  }
});

// Modificar equipo basket
router.get('/modificarequipo/:id', async (req, res, next) => {
  var persoconocida = Boolean(req.session.nombre);

  var id = req.params.id;
  var equipo = await tablasModel.getEquipoById(id);
  res.render('admin/modificartablas', {
    layout: 'admin/layout',
    persoconocida: persoconocida,
    persona: req.session.nombre,
    clicktabla,
    clickmodificar,
    clickagregarb,
    mostrarbasket,
    equipo
  });
});

router.post('/modificarequipo', async (req, res, next) => {
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
      equipo: req.body.equipo,
      puntos: req.body.puntos,
      jugados: req.body.jugados,
      ganados: req.body.ganados,
      perdidos: req.body.perdidos,
      ppp: req.body.ppp,
      pcpp: req.body.pcpp,
      logos: img_id
    }

    console.log(obj);
    await tablasModel.modificarEquipoById(obj, req.body.id)
    res.redirect('/admin/tablas')
    
  }
  catch (error) {
    res.render('admin/modificartablas', {
      layout: 'admin/layout',
      persoconocida: persoconocida,
      persona: req.session.nombre,
      clicktabla,
      clickmodificar,
      error: true, message: 'No se modifico equipo'
    });
  }
});

// Agregar equipo hockey
router.get('/agregarhockey', async (req, res, next) => {
  var persoconocida = Boolean(req.session.nombre);

  res.render('admin/agregartablas', {
    layout: 'admin/layout',
    persoconocida: persoconocida,
    persona: req.session.nombre,
    mostrarhockey,
    clicktabla,
    clickagregar,
    clickagregarh
  });

  router.post('/agregarhockey', async (req, res, next) => {
    try {

      console.log(req.body);
      if (req.body.equipo != "" && req.body.puntos) {
        await tablasModel.insertHockey({
          ...req.body,
        });

        res.redirect('/admin/tablas')
      } else {
        res.render('admin/agregartablas', {
          layout: 'admin/layout',
          clicktabla,
          clickagregar,
          clickagregarh,
          mostrarhockey,
          error: true, message: 'Todos los campos son requeridos'
        })
      }
    } catch (error) {
      res.render('admin/agregartablas', {
        layout: 'admin/layout',
        clicktabla,
        clickagregar,
        clickagregarh,
        mostrarhockey,
        error: true, message: 'No se agrego el equipo'
      });
    }
  });
});

// Modificar equipo hockey
router.get('/modificarhockey/:id', async (req, res, next) => {
  var persoconocida = Boolean(req.session.nombre);

  var id = req.params.id;
  var equipoh = await tablasModel.getHockeyById(id);
  res.render('admin/modificartablas', {
    layout: 'admin/layout',
    persoconocida: persoconocida,
    persona: req.session.nombre,
    clicktabla,
    clickmodificar,
    clickagregarh,
    mostrarhockey,
    equipoh
  });
});

router.post('/modificarhockey', async (req, res, next) => {
  var persoconocida = Boolean(req.session.nombre);

  try {

    console.log(req.body);
    var obj = {
      id: req.body.id_nuevo,
      equipo: req.body.equipo,
      puntos: req.body.puntos,
    }

    console.log(obj);
    await tablasModel.modificarHockeyById(obj, req.body.id);
    res.redirect('/admin/tablas');
  }
  catch (error) {
    res.render('admin/modificarhockey', {
      layout: 'admin/layout',
      persoconocida: persoconocida,
      persona: req.session.nombre,
      clicktabla,
      clickmodificar,
      clickagregarh,
      error: true, message: 'No se modifico equipo'
    });
  }
});

// Eliminar Equipo hockey
router.get('/eliminarhockey/:id', async (req, res, next) => {
  var id = req.params.id;

  await tablasModel.deleteHockeyById(id);

  res.redirect('/admin/tablas')

});

//  Agregar tabla futbol
router.get('/agregarfutbol', async (req, res, next) => {
  var persoconocida = Boolean(req.session.nombre);

  res.render('admin/agregartablas', {
    layout: 'admin/layout',
    persoconocida: persoconocida,
    persona: req.session.nombre,
    mostrarfutbol,
    clicktabla,
    clickagregar,
    clickagregarf
  });
});

// Agregar imagen tabla futbol
router.post('/agregarfutbol', async (req, res, next) => {
  try {

    var img_tabla = '';
    if (req.files && Object.keys(req.files).length > 0) {
      imagenf = req.files.imagenf;
      img_tabla = (await uploader(imagenf.tempFilePath)).public_id;
      await tablasModel.insertFutbol({ img_tabla });
    }

    console.log(img_tabla);
    res.redirect('/admin/tablas')
  } catch (error) {

    res.render('admin/agregartablas', {
      layout: 'admin/layout',
      persoconocida: persoconocida,
      persona: req.session.nombre,
      mostrarfutbol,
      clicktabla,
      clickagregar,
      clickagregarf
    });
  };
});

// Eliminar tabla futbol
router.get('/eliminarfutbol/:id', async (req, res, next) => {
  var id = req.params.id;

  let tabla = await tablasModel.getFutbolById(id);
  if (tabla.img_tabla) {
    await (destroy(tabla.img_tabla));
  }

  await tablasModel.deleteFutbolById(id);

  res.redirect('/admin/tablas')

});

// Modificar tabla futbol
router.get('/modificarfutbol/:id', async (req, res, next) => {
  var persoconocida = Boolean(req.session.nombre);

  var id = req.params.id;
  var tabla = await tablasModel.getFutbolById(id);
  res.render('admin/modificartablas', {
    layout: 'admin/layout',
    persoconocida: persoconocida,
    persona: req.session.nombre,
    clicktabla,
    clickmodificar,
    clickagregarf,
    mostrarfutbol,
    tabla
  });
});

router.post('/modificarfutbol', async (req, res, next) => {
  var persoconocida = Boolean(req.session.nombre);

  try {
    let img_id = req.body.img_originalfutbol;
    let borrar_img_vieja = false;

    if (req.body.img_delete === "1") {
      img_id = null;
      borrar_img_vieja = true;
    } else {
      if (req.files && Object.keys(req.files).length > 0) {
        imagentabla = req.files.imagentabla;
        img_id = (await uploader(imagentabla.tempFilePath)).public_id;
        borrar_img_vieja = true;
      }
    }
    if (borrar_img_vieja && req.body.img_originalfutbol) {
      await (destroy(req.body.img_originalfutbol));
    }

    console.log(req.body);
    var obj = {
      img_tabla: img_id
    }

    console.log(obj);
    await tablasModel.modificarFutbolById(obj, req.body.id);
    res.redirect('/admin/tablas');
  }
  catch (error) {
    res.render('admin/modificartablas', {
      layout: 'admin/layout',
      persoconocida: persoconocida,
      persona: req.session.nombre,
      clicktabla,
      clickmodificar,
      mostrarfutbol,
      error: true, message: 'No se modifico tabla'
    });
  }
});

module.exports = router;