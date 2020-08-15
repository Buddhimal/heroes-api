const express = require('express');
const jwt = require('jsonwebtoken');
const Hero = require('../models/hero');
const router = express.Router();

let heroArray = [{id: 1, name: 'Captain America'}, {id: 2, name: 'Iron Man'}, {id: 3, name: 'Black Widow'}]
let SECRET_KEY = "1234567"

router.get('/', async (req, res) => {
    // let heroes = ['Captain America', 'Iron Man', 'Black Widow'];
    // res.send(heroArray);

    // let heroes = await Hero.find();
    // let heroes = await Hero.find({deceased:true});
    let heroes = await Hero.find({likeCount: {$gt: 0}});
    // let heroes = await Hero.find({ likeCount:{$eq:null} });
    // let heroes = await Hero.find({deceased: true}).select({name:1}); //select only name
    // let heroes = await Hero.find().sort({name:'asc'});
    // let heroes = await Hero.find().skip(10).limit(10); skipp 1st 10 and get next 10 (for pagination)
    res.send(heroes);

});

router.get('/:heroId', async (req, res) => {

    // let heroId = parseInt(req.params.heroId);
    let heroId = req.params.heroId;

    let heroes = await Hero.findById(heroId);
    res.send(heroes);

    // let optionalvalue = req.query.showmore;

    // let heroes = ['Captain America', 'Iron Man', 'Black Widow'];
    // let heroes = {id: 1, name: 'Captain America', id: 2, name: 'Iron Man', id: 3, name: 'Black Widow'};
    // let hero = {id: 1, name: 'Captain America'};
    // let heroes = ['Captain America', 'Iron Man', 'Black Widow'];
    // res.send("Requesting hero :" + heroId);

    // let hero = heroArray.find(h => h.id === heroId);
    //
    // if (!hero)
    //     res.status(404).send("the givent id does not exists on our server");
    //
    // res.send(hero);
});

router.post('/', async (req, res) => {

    const token = req.header("x-jwt-token");

    if (!token) return res.status(401).send("Access denied. No token.");

    try {
        jwt.verify(token, SECRET_KEY);
    } catch (e) {
        res.status(400).send("Invalid token")
    }

    if (!req.body.heroName) {
        return res.status(400).send("Please add mandotory data");
    }

    try {
        let heroToBeAddedToDb = new Hero({
            name: req.body.heroName,
            birthName: req.body.birthName,
            movies: req.body.movies,
            likeCount: req.body.likeCount,
            imgUrl: req.body.imgUrl,
            deceased: req.body.deceased

        });

        heroToBeAddedToDb = await heroToBeAddedToDb.save();
        res.send(heroToBeAddedToDb);
    } catch (e) {
        return res.status(500).send(e.message);
    }

    // let heroId = parseInt(req.params.heroId);
    // let newHero = {id: heroArray.length + 1, name: req.body.heroName};
    //
    // heroArray.push(newHero);
    // res.send(heroArray);
});

// router.put('/:heroId', async (req, res) => {
//
//     let heroId = parseInt(req.params.heroId);
//     // let newHero = {id: heroArray.length + 1, name: req.body.heroName};
//
//     let hero = await Hero.findById(req.params.heroId);
//
//     hero.set({heroName: req.body.heroName});
//     hero = await hero.save();
//
//     // let heroes = await Hero.findByIdAndUpdate(heroId);
//
//     // let newHero = {id: heroId, name: req.body.heroName};
//     // let hero = heroArray.find(h => h.id === heroId);
//     // let index = heroArray.indexOf(hero);
//     //
//     // heroArray[index] = newHero;
//     //
//     res.send(hero);
//
// });

router.put('/:heroId', async (req, res) => {

    let hero = await Hero.findByIdAndUpdate(
        {_id: req.params.heroId},
        {$set: {name: req.body.heroName}},
        {new: true, useFindAndModify: false}
    );
    res.send(hero);

});

// router.delete('/:heroId', (req, res) => {
//
//     let heroId = (req.params.heroId);
//     let hero = heroArray.find(h => h.id === heroId);
//
//     if (!hero)
//         return res.status(400).send("hero not exits :"+heroId);
//
//     let index = heroArray.indexOf(hero);
//     heroArray.splice(index, 1);
//
//     res.send(heroArray);
// });

router.delete('/:heroId', async (req, res) => {
    // let heroId = parseInt(req.params.heroId);
    // let hero = heroesArray.find(h=> h.id === heroId);


    const token = req.header("x-jwt-token");

    if (!token) return res.status(401).send("Access denied. No token.");

    try {
        jwt.verify(token, SECRET_KEY);
    } catch (e) {
        res.status(400).send("Invalid token")
    }

    let decoded = jwt.decode(token, SECRET_KEY);
    if (!decoded.isAdmin) {
        return res.status(403).send("No Permission to Delete");
    }

    let hero = await Hero.findById(req.params.heroId);
    if (!hero) {
        return res.status(404).send("The given Id does not our server ");
    }


    // let deleteHero = heroesArray.indexOf(hero);
    // heroesArray.splice(deleteHero,1);

    hero.deleteOne({_id: req.params.heroId});

    res.send(hero);
})

module.exports = router;