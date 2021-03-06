
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));


let task = ['Искупать собаку', 'Сделать метод DELETE', 'Спасти Мир!'];


let complete = ['Сделать зарядку'];


app.post('/addtask', function (req, res) {
    let newTask = req.body.newtask;
    task.push(newTask);
    res.redirect('/');
});

app.post('/removetask', function (req, res) {
    let completeTask = req.body.check;
    if (typeof completeTask === 'string') {
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === 'object') {
        for (let i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect('/');
});


app.get('/', function (req, res) {
    res.render('index', { task: task, complete: complete });
});


app.listen(3000, function () {
    console.log('OSFY Test App Server is running on port 3000!');
})