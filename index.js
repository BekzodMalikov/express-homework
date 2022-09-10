const express = require('express')
const app = express()
const path = require('path')
const { create } = require('express-handlebars')

const hbs = create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: './views/layouts'
})

app.use(express.static(path.join('views')))
app.use(express.urlencoded({ extended: true }))

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

const users = [
    { name: 'Merry', age: 18, id: 1 },
    { name: 'Harry', age: 30, id: 3 },
    { name: 'Bille', age: 10, id: 2 },
]

// router
app.get('/', function (req, res) {
    res.render('index', {
        title: 'Home page',
        isHome: true
    })
})

app.get('/users', function (req, res) {
    res.render('users', {
        title: 'Users page',
        users,
        isUsers: true
    })
})

app.post('/add/user', function (req, res) {
    req.body.id = Math.floor(Math.random() * 1000)
    req.body.age = +req.body.age
    users.push(req.body)
    res.redirect('/users')
})

app.get('/about', function (req, res) {
    res.render('about', {
        title: 'About page',
        isAbout: true
    })
})

app.listen(3000, function () {
    console.log('Server is running with port 3000');
})