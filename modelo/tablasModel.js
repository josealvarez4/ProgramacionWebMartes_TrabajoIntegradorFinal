var pool = require('./bd');

// TABLA DE BASKET
async function getTablaBasket() {
        var query = 'select * from basket order by basket.id ASC';
        var rows = await pool.query(query);
        return rows;
}

async function deleteBasketById(id) {
    var query = 'delete from basket where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}

async function insertBasket(obj) {
    try {
        var query = "insert into basket set ? ";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getEquipoById(id) {
    var query = 'select * from basket where id = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function modificarEquipoById(obj, id) {
    try {
        var query = "update basket set ? where id=?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

// TABLA DE HOCKEY
async function getTablaHockey() {
    var query = 'select * from hockey order by hockey.id ASC';
    var rows = await pool.query(query);
    return rows;
}

async function insertHockey(obj) {
    try {
        var query = "insert into hockey set ? ";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getHockeyById(id) {
    var query = 'select * from hockey where id = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function modificarHockeyById(obj, id) {
    try {
        var query = "update hockey set ? where id=?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function deleteHockeyById(id) {
    var query = 'delete from hockey where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}

// TABLA DE FUTBOL
async function getTablaFutbol() {
    var query = 'select * from futbol';
    var rows = await pool.query(query);
    return rows;
}

async function insertFutbol(obj) {
    try {
        var query = "insert into futbol set ? ";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getFutbolById(id) {
    var query = 'select * from futbol where id = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function deleteFutbolById(id) {
    var query = 'delete from futbol where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}

async function modificarFutbolById(obj, id) {
    try {
        var query = "update futbol set ? where id=?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = { getTablaBasket, deleteBasketById, insertBasket, getEquipoById, modificarEquipoById,
    getTablaHockey, insertHockey, getHockeyById, modificarHockeyById, deleteHockeyById, 
    getTablaFutbol, insertFutbol, getFutbolById, deleteFutbolById, modificarFutbolById }