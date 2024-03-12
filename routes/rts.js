const express = require('express');
const routerManager = express.Router();
const {homefun,list,createUser,showUsers} = require('../controllers/ctl')
routerManager.get('/',homefun)
routerManager.get('/list',list)
routerManager.post('/register',createUser)
routerManager.get('/showUsers',showUsers)
module.exports={routerManager}

