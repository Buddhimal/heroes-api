const express = require('express');
const router = express.Router();

let heroArray = [{id: 1, name: 'Captain America'}, {id: 2, name: 'Iron Man'}, {id: 3, name: 'Black Widow'}]

router.get('/', (req, res) => {
    let heroes = ['Captain America', 'Iron Man', 'Black Widow'];
    res.send(heroArray);
});

router.get('/:heroId', (req, res) => {
    let heroId = parseInt(req.params.heroId);

    let optionalvalue = req.query.showmore;
    // let heroes = ['Captain America', 'Iron Man', 'Black Widow'];
    // let heroes = {id: 1, name: 'Captain America', id: 2, name: 'Iron Man', id: 3, name: 'Black Widow'};
    // let hero = {id: 1, name: 'Captain America'};
    // let heroes = ['Captain America', 'Iron Man', 'Black Widow'];
    // res.send("Requesting hero :" + heroId);

    let hero = heroArray.find(h => h.id === heroId);

    if (!hero)
        res.status(404).send("the givent id does not exists on our server");

    res.send(hero);
});

router.post('/', (req, res) => {

    if (!req.body.heroName)
        return res.status(400).send("Please add mandotory data");

    let heroId = parseInt(req.params.heroId);
    let newHero = {id: heroArray.length + 1, name: req.body.heroName};

    heroArray.push(newHero);
    res.send(heroArray);
});

router.put('/:heroId', (req, res) => {

    let heroId = parseInt(req.params.heroId);
    // let newHero = {id: heroArray.length + 1, name: req.body.heroName};

    let newHero = {id: heroId, name: req.body.heroName};
    let hero = heroArray.find(h => h.id === heroId);
    let index = heroArray.indexOf(hero);

    heroArray[index] = newHero;

    res.send(heroArray);

});

router.delete('/:heroId', (req, res) => {

    let heroId = parseInt(req.params.heroId);
    let hero = heroArray.find(h => h.id === heroId);

    if (!hero)
        return res.status(400).send("hero not exits");

    let index = heroArray.indexOf(hero);
    heroArray.splice(index, 1);

    res.send(heroArray);
});

module.exports = router;