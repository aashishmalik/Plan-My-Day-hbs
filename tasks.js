
const fs = require('fs')
const path = require('path')
let tasks = []
const DATA_FILE = path.join(__dirname, 'tasks.json')


function getTasks() {
    return tasks
}
function loadTask(done) {
    fs.readFile(
        DATA_FILE,
        (err, data) => {
            if (err) {
                console.log(err)
                done()
            }
            if (data) {
                tasks = JSON.parse(data.toString())
                done()
            }
        }
    )
}
function saveTask(done) {

    fs.writeFile(
        DATA_FILE,
        JSON.stringify(tasks),
        (err) => {
            console.log(err)
            done()
        }
    )

}
function addTask(newTask, done) {
    tasks.push(newTask)
    saveTask(done)
}
function modifyTask(taskid, updatedTask, done) {
    tasks[taskid] = Object.assign(tasks[taskid], updatedTask)
    saveTask(done)
}
function getTaskById(taskid) {
    return tasks[taskid]

}
module.exports = {
    loadTask,
    addTask,
    saveTask,
    getTasks,
    getTaskById,
    modifyTask
}