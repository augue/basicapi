
const fs = require('fs');

const { pool, s_users, insertUser_query } = require('../model/getPool')
const homefun = (req, res) => {
    res.send("Home Page");
}

const list = (req, res) => {
    res.send("list page");
}

const createUser = async (req, res) => {
    const userDetails = {
        fullname: req.body.fullname,
        contact: req.body.contact,
        username: req.body.username,
        email: req.body.email,
    }
    //res.send(req.body.fullname);
    console.log(req.body.username)
    try {
        if (req.body.username.length <= 4) {
            res.status(200).json({ 'message': "invalid" })
        }
        else {
            const rest = await addUser(userDetails)

            if (rest.errno == 1062) {
                res.status(200).json({ 'message': "duplicate" })
            } else {
                res.status(200).json({ 'message': "sucessfull" })
            }
        }
    } catch (err) {
        res.status(200).json(err)

    }




}

const showUsers = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            res.send("error connecting to database")
            console.log(err);
            return;
        }
        connection.query(s_users, (err, result) => {
            connection.release();
            if (err) throw err;
            res.json(result);
        })
    })
}

function getConnection() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                resolve(connection)
            }
        })
    })
}


function runQuery(connection, sql_query, values) {
    return new Promise((resolve, reject) => {
        connection.query(sql_query, values, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}


const addUser = async (data) => {
    const connection = await getConnection();
    try {
        const result = await runQuery(connection, insertUser_query, [data.username, data.fullname, data.contact, data.email])
        console.log(result)
        return result
    }
    catch (err) {
        return err
    }
}



module.exports = { homefun, list, createUser, showUsers }