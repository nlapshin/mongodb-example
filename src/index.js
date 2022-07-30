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

  // gateway
  // Получить key-value по языкам программирования.
  /*
  {
    "Typescript": 12708,
    "Rust": 12656,
    "C": 12530,
    "Python": 12366,
    "Javascript": 12523,
    "C#": 12686,
    "Haskell": 12704,
    "C++": 12555,
    "Go": 12622
  }

  {
    "_id" : ObjectId("62e40919b8e2b3740df4dbec"),
    "name" : "Lamar Lakin",
    "email" : "Camron_Erdman@yahoo.com",
    "phone" : "579-315-6040 x83508",
    "age" : 46,
    "company" : "Yandex",
    "skills" : {
        "english" : "A2",
        "languages" : [ 
            "C#"
        ]
    }
  }

  1. Цикл(forEach, reduce)
  2. for (skills.languages)
  3. object[skills.languages[i]]++
  */

  app.get('/gateway', async (req, res) => {
    const result = await userModel.getLanguageAggregation()

    return res.json(result)
  })

  app.listen(3000, (err) => {
    if (!err) {
      console.log(`Server started by port 3000`)
    }
  })
}
