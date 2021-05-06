const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require('./Database/mongoose');

app.use(cors());

/*
CORS- Cross Origin Request Security.
localhost:3000 - backend api
localhost:4200 - frontend
*/

const List = require('./Database/Models/list');
const Task = require('./Database/Models/task');
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next(); 
});

/*
List: Create, Update, ReadOne, ReadAll, Delete
Task: Create, Update, ReadOne, ReadAll, Delete
*/
/*
Get - Get Data
Post - Save
Delete - Delete
put patch - Update
*/


//Lists URL
app.get('/lists', function(req, res) {
    List.find({})
        .then(function(lists) {
            res.send(lists)
        })
        .catch(function(error) {
            console.log(error)
        })
});

app.post('/lists', function(req, res) {
    new List({'title': req.body.title })
        .save()
        .then(function(list) {
            res.send(list)
        })
        .catch(function(error) {
            console.log(error)
        })
});

/* localhost:3000/lists/608efa927ce3d9d687f099da */
app.get('/lists/:listId', function(req, res) {
    List.find({ _id: req.params.listId })
    .then(function(list) {
        res.send(list)
    })
    .catch(function(error) {
        console.log(error)
    })
});

app.patch('/lists/:listId', function(req, res) {
    List.findOneAndUpdate({ '_id': req.params.listId }, { $set: req.body })
    .then(function(list) {
        res.send(list)
    })
    .catch(function(error) {
        console.log(error)
    })
});

app.delete('/lists/:listId', function(req, res) {
    const deleteTasks = function(list) {
    Task.deleteMany ({ _listId: list._id})
        .then(function() {
            list
        })
        .catch(function(error) {
            console.log(error)
        });
    };
    List.findByIdAndDelete(req.params.listId)
    .then(function(list) {
        res.send(deleteTasks(list))
    })
    .catch(function(error) {
        console.log(error)
    })
});


//Tasks URL
/*
http://localhost:3000/lists/:listId:/tasks/:taskId
*/

app.get('/lists/:listId/tasks', function(req, res) {
    Task.find({ _listId: req.params.listId })
    .then(function(tasks) {
        res.send(tasks)
    })
    .catch(function(error) {
        console.log(error)
    }) 
});

app.post('/lists/:listId/tasks', function(req, res) {
    new Task({ 'title': req.body.title, '_listId': req.params.listId })
    .save()
    .then(function(task) {
        res.send(task)
    })
    .catch(function(error) {
        console.log(error)
    }); 
});

app.get('/lists/:listId/tasks/:taskId', function(req, res) {
    Task.findOne({ _listId: req.params.listId, _id: req.params.taskId })
    .then(function(task) {
        res.send(task)
    })
    .catch(function(error) {
        console.log(error)
    }) 
});

app.patch('/lists/:listId/tasks/:taskId', function(req, res) {
    Task.findOneAndUpdate({ _listId: req.params.listId, _id: req.params.taskId }, { $set: req.body })
    .then(function(task) {
        res.send(task)
    })
    .catch(function(error) {
        console.log(error)
    }) 
});

app.delete('/lists/:listId/tasks/:taskId', function(req, res) {
    Task.findOneAndDelete({ _listId: req.params.listId, _id: req.params.taskId })
    .then(function(task) {
        res.send(task)
    })
    .catch(function(error) {
        console.log(error)
    }) 
});



app.listen(3000, function() {
    console.log('Server is Connected on Port 3000')
});