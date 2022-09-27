const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/Notes-App', {
}).then(() => {
    console.log('Connect Successful!');
}).catch((e) => {
    console.log('Unable to Connect!');
})