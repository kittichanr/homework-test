const express = require('express')
const bodyparser = require('body-parser')
const app = express()

app.use(bodyparser.json())

const port = 8080

const STATUS = {
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED"
}

let counter = 2
let todoLists = [{
    id: 1,
    title: "todo1",
    description: "description",
    status: STATUS.IN_PROGRESS
}]

app.get('/todo-list', (req, res) => {
    res.json(todoLists)
})

app.get('/todo-list/:id', (req, res) => {
    let id = req.params.id
    const selectedIndex = todoLists.findIndex(todo => todo.id == id)
    if (selectedIndex == -1) {
        res.status(404).json(`NOT FOUND ID: ${id}`)
        return
    }
    res.json(todoLists[selectedIndex])
})

app.post('/todo-list', (req, res) => {
    let todo = req.body
    todo.id = counter
    counter += 1

    if (!todo.title) {
        res.status(400).json(`title is invalid`)
        return
    }
    if (todo.status != STATUS.IN_PROGRESS && todo.status != STATUS.COMPLETED) {
        res.status(400).json(`status should be IN_PROGRESS or COMPLETED`)
        return
    }

    if (!todo.description) {
        todo.description = ""
    }

    todoLists.push(todo)

    res.json({
        message: 'insert ok',
        data: todo
    })
})


app.put('/todo-list/:id', async (req, res) => {
    let id = req.params.id
    let updateTodo = req.body

    const selectedIndex = todoLists.findIndex(todo => todo.id == id)
    if (selectedIndex == -1) {
        res.status(404).json(`NOT FOUND ID: ${id}`)
        return
    }

    todoLists[selectedIndex].title = updateTodo.title || todoLists[selectedIndex].title
    todoLists[selectedIndex].description = updateTodo.description || todoLists[selectedIndex].description

    if (updateTodo.status != STATUS.IN_PROGRESS && updateTodo.status != STATUS.COMPLETED) {
        res.status(400).json(`status should be IN_PROGRESS or COMPLETED`)
        return
    }
    todoLists[selectedIndex].status = updateTodo.status || todoLists[selectedIndex].status
    res.json({
        message: 'update todo complete!',
        data: todoLists[selectedIndex]
    })
})


app.delete('/todo-list/:id', async (req, res) => {
    let id = req.params.id

    const selectedIndex = todoLists.findIndex(todo => todo.id == id)
    if (selectedIndex == -1) {
        res.status(404).json(`NOT FOUND ID: ${id}`)
        return
    }

    todoLists.splice(selectedIndex, 1)

    res.json({
        message: 'delete ok',
        indexDeleted: selectedIndex
    })
})

app.listen(port, () => {
    console.log(`Start listening on port ${port}`)
})