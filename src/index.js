const express = require('express')
const bodyParser = require('body-parser')

const mongoClient = require('./client')
const UserModel = require('./model')

run()

async function run() {
  const app = express()
  app.use(bodyParser.json())

  const client = await mongoClient.run()
  const userModel = new UserModel(client)

  app.get('/gateway', async (req, res) => {
    const result = await userModel.getLanguagesCount()

    return res.json(result)
  })

  app.listen(3000, (err) => {
    if (!err) {
      console.log(`Server started by port 3000`)
    }
  })
}
