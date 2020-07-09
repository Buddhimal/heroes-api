const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    name: String,
    birthName: String,
    movies: String,
    likeCount: Number,
    imgUrl: String,
    deceased: Boolean
});

const Hero = mongoose.model("Hero", heroSchema);

module.exports = Hero;