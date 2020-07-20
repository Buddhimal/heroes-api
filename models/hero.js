const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 4,
        maxLength: 20,
        required: true
    },
    birthName: String,
    movies: {
        type:[String],
        enum: ["Infinity War","Endgame","Iron Man 2","First Avenger"]
    },
    likeCount: Number,
    imgUrl: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Favatar-icon-placeholder-1577909%2F&psig=AOvVaw06OtvwubbNuPOVvClv1M6d&ust=1594918039190000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLi1nevaz-oCFQAAAAAdAAAAABAN"
    },
    deceased: Boolean
});

const Hero = mongoose.model("Hero", heroSchema);

module.exports = Hero;