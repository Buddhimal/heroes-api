const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();


const User = require("../models/user");


router.post("/", async (req, res) => {
    //if email exsists in db send back a 400 error saying that he's already registered.
    //validation check on other parameters.

    try {

        let salt = await bcrypt.genSalt(10)
        let hashPw = await bcrypt.hash(req.body.password, salt);

        let user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPw,
        });

        await user.save();

        return res.send({
            username: user.username,
            email: user.email
        });

    } catch (e) {
        console.log(e.message);
    }
});

module.exports = router;