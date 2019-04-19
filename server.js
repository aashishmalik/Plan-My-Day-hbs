const express = require('express')
const app = express()
const path = require('path')
const tasks = require('./tasks') //module exports

app.set('view engine', 'hbs')

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.get('/tasks', (req, res) => {
    res.render('tasks',//file name of hbs
        {
            title: 'ToDos',
            tasks: tasks.getTasks() //send data as object to hbs file
        })
})

app.post('/tasks', (req, res) => {
    if (req.body.name.trim().length > 0) {
        tasks.addTask(req.body, () => {
            res.redirect('/tasks')
        })
    } else {

        res.redirect('/tasks')
    }
})

app.use('/', express.static(
    path.join(__dirname, 'public')
)
)

tasks.loadTask(() => {
    app.listen('5050', () => {
        console.log('running on http://localhost:5050')
    })
})