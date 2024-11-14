const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/read', async (req, res) => {
    let users = await userModel.find()
    res.render("read", {users});
});

app.post('/create', async (req, res) => {
    let{name, email, password, imageurl} = req.body;
    let createdUser = await userModel.create({
     name,
     email,
     password,
     imageurl
    })
    res.redirect('/read');
});

app.get('/delete/:id', async (req, res) => {
    let users = await userModel.findOneAndDelete({_id: req.params.id})
    res.redirect("/read");
});

app.get('/edit/:id',async (req, res) => {
    let user = await userModel.findOne({_id: req.params.id})
    res.render("edit", {user});
});

app.post('/update/:id',async (req, res) => {
    let {imageurl, name, email, password} = req.body;
    let user = await userModel.findOneAndUpdate({_id: req.params.id},{imageurl, name, email, password}, {new:true})
    res.redirect("/read");
});

app.listen(3000);