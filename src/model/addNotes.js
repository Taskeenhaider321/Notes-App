const mongoose = require('mongoose');
const validator = require('validator')

const notesSchema = new mongoose.Schema({
    Notes : {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isAlpha(value)) {
              throw new Error("Email is Not Valid!");
            }
          },
    },
    Numbers : {
        type: Number,
        required: true
    }
})

const Note = new mongoose.model('Note',notesSchema)
module.exports = Note