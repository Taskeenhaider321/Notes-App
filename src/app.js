const express = require('express');
const app = express();
require('./db/connectdb')
const Note = require('./model/addNotes');

const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Show Data From MongooDB
app.get('/', async (req, res) => {
    try {
        const showNote = await Note.find({})
        res.send(showNote)     
    } catch(e) {
        res.status(500).send(e);
    }
})

// Add Data into MongooDB
app.post('/add', async (req, res) => {
    const addNotes = new Note(req.body);
    try {
        await addNotes.save()
        res.status(201).send(addNotes)
    } catch(e) {
        res.status(400).send(e)
    }
})

// Show Data in ascending form
app.get('/ascend', async (req, res) => {
    try {
        const ascendNotes = await Note.find({}).sort({
            Numbers : 1
        })
        res.status(201).send(ascendNotes);
    } catch (e) {
        res.status(400).send(e)  
    }
    
})

// Show Data in descending form
app.get('/descend', async (req, res) => {
    try {
        const descendNotes = await Note.find({}).sort({
            Numbers : -1
        })
        res.status(201).send(descendNotes);
    } catch (e) {
        res.status(400).send(e)  
    }
    
})

// Delete Data by Id
app.delete('/notes/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const deleteNote = await Note.findByIdAndDelete(_id)
        if (!deleteNote) {
            res.status(404).send()
        }
        res.send(deleteNote)
    } catch (e) {
        res.status(500).send()
    }
})

// Delete ALl Data
app.delete('/delete/all', async (req, res) => {
    try {
        const showNote = await Note.remove({})
        res.send(showNote)  
    } catch (e) {
        res.status(500).send() 
    }
})

// Update Data By Id
app.patch('/update/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['Notes', 'Numbers']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    const _id = req.params.id
    try {
        const updateNote = await Note.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        if (!updateNote) {
            res.status(404).send()
        }
        res.send(updateNote)
    } catch(e) {
        res.status(400).send(e)
    }
})

app.listen(port, () => {
    console.log(`This is the ${port} active port `);
});
