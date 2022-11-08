const express = require('express')
const bodyParser = require('body-parser')

const mongoClient = require('./client')
const UserModel = require('./model')

// 1 способ. 800 ms / 5000 / memory issues
// 2 способ. 750 ms / 4800 ms / memory 90 MB 
// 3 способ. 750 ms / 2300 ms
// 4 способ. 140 ms / 350 ms

run()

async function run() {
  const app = express()
  app.use(bodyParser.json())

  const client = await mongoClient.run()
  const userModel = new UserModel(client)

  app.get('/gateway', async (req, res) => {
    const result = await userModel.getLanguageCountAggregation()

    return res.json(result)
  })

  app.listen(3000, (err) => {
    if (!err) {
      console.log(`Server started by port 3000`)
    }
  })
}


// Коллекция с программистами
/*
{
  "Javascript": 100,
  "Typescript": 150,
  "C": 40
}
*/


// 1. Получить всех пользователей
// 2. Пройтись по ним циклом(reduce)
// 3. Посчитать количество языков.
