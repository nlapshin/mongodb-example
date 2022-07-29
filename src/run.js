const clientModule = require('./client')

;(async() => {
  const client = await clientModule.run()

  const collection = client.db('test').collection('new_collection');
  const users = await collection.find({}).toArray()

  // console.log(users)

  await client.close()
})()

/* 
3 поля. Каждое объязательное.
Поле name - тип string
Поле age - типа integer. 0 - 150.
Поле country - тип string. Допустимые значения RU, US


const user = {
  name: 'Nik',
  age: 32,
  country: 'RU'
}

// Императивный стиль
function validateUser(user) {
  if('name' in user === false) {
    return { error: 'Name is not set' }
  }
  
  if('age' in user === false) {
    return { error: 'Name is not set' }
  }
  
  if('country' in user === false) {
    return { error: 'Name is not set' }
  }

  if (typeof user.name === 'string') {
    return 
  }

  if (typeof user.age === 'number' && !Number.isNaN(user.age)) {

  }

  if (typeof user.country === 'string' && ['RU', 'US'].includes(user.country)) {
    return 
  }

  return Object.keys(user).length === 3
}

// Декларативном стиле

const userSchema = {
  "$id": "user",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "The person's first name."
    },
    "age": {
      "description": "Age in years which must be equal to or greater than zero.",
      "type": "integer",
      "minimum": 0,
      "maximum": 150
    },
    "country": {
      "type": "string",
      "description": "The person's first name.",
      "enums": [
        "US",
        "RU"
      ]
    }
  }
}

const Ajv = require("ajv")
const ajv = new Ajv()

const valid = ajv.validate(userSchema, user)
*/
