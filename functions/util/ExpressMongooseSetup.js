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

mongoose.connect('mongodb://localhost:27017/electronics-club-test', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.set('useFindAndModify', false);

module.exports = {app, mongoose};