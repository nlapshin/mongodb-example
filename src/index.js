const express = require('express')
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb');

const mongoClient = require('./client')

run()

async function run() {
  const app = express()
  app.use(bodyParser.json())

  const client = await mongoClient.run()

  const usersCollection = client.db('mytest').collection('users');

  app.get('/users', async (req, res) => {
    const result = await usersCollection.find().toArray()

    return res.json(result)
  })

  app.get('/users/:id', async (req, res) => {
    const result = await usersCollection.findOne({ _id: new ObjectId(req.params.id) })

    return res.json(result)
  })

  app.post('/users', async (req, res) => {
    const result = await usersCollection.insertOne(req.body)

    return res.json(result)
  })

  app.patch('/users/:id', async (req, res) => {
    // _id - это ObjectId
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(req.params.id) }, 
      { $set: req.body },
      { upsert: true }
    )

    return res.json(result)
  })

  app.delete('/users/:id', async (req, res) => {
    const result = await usersCollection.deleteOne({ _id: new ObjectId(req.params.id) })

    return res.json(result)
  })

  app.listen(3000, (err) => {
    if (!err) {
      console.log(`Server started by port 3000`)
    }
  })
}
