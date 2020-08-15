const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');


const User = require("../models/user")

let SECRET_KEY="1234567"

router.post("/", async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        if (!user) return res.status(400).send("User Not Exists");


        let isValid = bcrypt.compare(req.body.password, user.password);
        if (!isValid)
            return res.status(400).send("invalied Password")
        let token = jwt.sign({id: user._id, email: user.email,isAdmin:user.isAdmin}, SECRET_KEY
        //     ,{
        //     expiresIn: "10000" //10 seconds
        // }
        );

        return res.send({token: token});

    } catch (e) {

    }
});

module.exports = router;