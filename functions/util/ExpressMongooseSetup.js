require('dotenv/config');
const express = require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const ejs=require('ejs');
const app = express();
app.set('view engine', 'ejs'); 
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

mongoose.connect('mongodb+srv://admin_elec_club:electronicslife@cluster0.tormy.mongodb.net/Elec-Club-Database', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.set('useFindAndModify', false);

module.exports = {app, mongoose};