const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/taskmanager', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then( function () {
        console.log('Database Connected')
    })
    .catch(function(error) {
        console.log(error)
    });

module.exports = mongoose;
