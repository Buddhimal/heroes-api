const express = require('express');
var sizeof = require('object-sizeof')
const app = express();
const PORT = 5000;

app.use(express.json());

let heroArray = [{id: 1, name: 'Captain America'}, {id: 2, name: 'Iron Man'}, {id: 3, name: 'Black Widow'}]

app.get('/', (req, res) => {
    res.send("Avengers");
});

app.get('/api/heroes', (req, res) => {
    let heroes = ['Captain America', 'Iron Man', 'Black Widow'];
    res.send(heroArray);
});

app.get('/api/heroes/:heroId', (req, res) => {
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

app.post('/api/heroes', (req, res) => {

    if (!req.body.heroName)
        return res.status(400).send("Please add mandotory data");

    let heroId = parseInt(req.params.heroId);
    let newHero = {id: heroArray.length + 1, name: req.body.heroName};

    heroArray.push(newHero);
    res.send(heroArray);
});


app.put('/api/heroes/:heroId', (req, res) => {

    let heroId = parseInt(req.params.heroId);
    // let newHero = {id: heroArray.length + 1, name: req.body.heroName};

    let newHero = {id: heroId, name: req.body.heroName};
    let hero = heroArray.find(h => h.id === heroId);
    let index = heroArray.indexOf(hero);

    heroArray[index] = newHero;

    res.send(heroArray);

});

app.delete('/api/heroes/:heroId', (req, res) => {

    let heroId = parseInt(req.params.heroId);
    let hero = heroArray.find(h => h.id === heroId);

    if (!hero)
        return res.status(400).send("hero not exits");

    let index = heroArray.indexOf(hero);
    heroArray.splice(index, 1);

    res.send(heroArray);
});


app.listen(PORT, function () {
    console.log('Listning on Port :' + PORT);
})