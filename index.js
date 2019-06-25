const express = require('express')
const app = express()
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')

const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres', {define: { timestamps: false }})
const port = 4000
app.listen(port, () => `Listening on port ${port}`)

const House = sequelize.define('house', {
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
    size: Sequelize.INTEGER,
    price: Sequelize.INTEGER
  }, {
    tableName: 'houses'
  })


app.post('/houses', function (req, res) {
    res.json({ message: 'Create a new house' })
  })

app.use(bodyParser.json())

app.post('/houses', function (req, res) {
  console.log('Incoming data: ', req.body)
  res.json({ message: 'Create a new house' })
})

app.post('/houses', function (req, res) {
    House
      .create(req.body)
      .then(house => res.status(201).json(house))
      .catch(err => {
        res.status(500).json({
          message: 'Something went wrong',
          error: err
          })
        })
  })

app.get('/houses', function (req, res, next) {
    House.findAll()
      .then(houses => {
        res.json({ houses: houses })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Something went wrong',
          error: err
        })
      })
  })

// app.get('/houses/:id', function (req, res, next) {
//     const id = req.params.id
//     House.findByPk().then(houses => {
//       res.json({ message: `Read house ${id}` })
//     })
//   })

app.put('/houses/:id', function (req, res) {
   const id = req.params.id
   res.json({ message: `Update house ${id}` })
  })

House.create({
    title: 'Multi Million Estate',
    description: 'This was build by a super-duper rich programmer',
    size: 1235,
    price: 98400000
  }).then(house => console.log(`The house is now created. The ID = ${house.id}`)
    
  ) 

// // retrieve a house via findByPk, then...
// house.update({
//     title: 'Super Duper Million Dollar Mainson'
//   }).then(house => console.log(`The house with ID ${house.id} is now updated`, house))





House.sync() // this creates the houses table in your database when your app starts

