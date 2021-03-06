'use strict';
const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('./models/users-model.js');
const basicAuth = require('./middleware/basic.js');

const router = express.Router();

router.post('/signup',signUp);
router.post('/signin',basicAuth,signin);

async function signUp(req,res){
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = new Users(req.body);
        const record = await user.save(req.body);
        res.status(200).json(record);
      } catch (e) { res.status(403).send("Error Creating User"); }
}

async function signin(req, res){
    try {
        const user = await Users.findOne({ username: req.user.username })
        const valid = await bcrypt.compare(req.user.password, user.password);
        if (valid) {
          res.status(200).json(user);
        }
        else {
          throw new Error('Invalid User')
        }
      } catch (error) { res.status(403).send("Invalid Login"); }
}

module.exports = router;
