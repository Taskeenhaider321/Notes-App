const express = require('express');
const path = require('path');
const hbs = require('hbs')
const app = express();
require('./db/connectdb')
const Note = require('./model/addNotes');
const url = require('url'); // built-in utility

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, '../public');
const views_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(static_path))
app.set('view engine', 'hbs')
app.set('views', views_path)
hbs.registerPartials(partials_path)

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/show', async (req, res) => {
    try {
        const showNote = await Note.find({})
        res.send(showNote)
    } catch(e) {
        res.status(500).send(e);
    }
})
app.post('/add', async(req, res) => {
    try {
            const addingNotes = new Note ({
                Notes : req.body.note,
                Numbers : req.body.number,
            })
                const added = await addingNotes.save();
                res.status(201).redirect('/')            
    } catch (error) {
        res.status(401).send(error)
    }       
})
app.listen(port, () => {
    console.log(`This is the ${port} active port `);
});