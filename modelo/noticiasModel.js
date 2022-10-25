var pool = require('./bd');

async function getNoticias() {
    var query = 'select * from noticias order by noticias.id DESC';
    var rows = await pool.query(query);
    return rows;
}

// Eliminar Noticias
async function deleteNoticiasById(id) {
    var query = 'delete from noticias where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}

// Agregar Noticias
async function insertNoticias(obj) {
    try {
        var query = "insert into noticias set ? ";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Seleccionar Noticia
async function getNoticiaById(id) {
    var query = 'select * from noticias where id = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];
}

// Modificar Noticia
async function modificarNoticiaById(obj, id) {
    try {
        var query = "update noticias set ? where id=?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

// Buscar Noticia
async function buscarNoticias (busqueda) {
    var query = "select * from noticias where titulo like ? OR subtitulo like ? OR cuerpo like ? ";

    var rows = await pool.query(query, ['%' + busqueda + '%', '%' + busqueda + '%', '%' + busqueda + '%']);

    return rows;
}

module.exports = { getNoticias, deleteNoticiasById, insertNoticias, getNoticiaById, modificarNoticiaById, buscarNoticias }