const { ObjectId } = require('mongodb');
const clientModule = require('./client');

;(async() => {
  const client = await clientModule.run()

  const collection = client.db('mytest').collection('users');
  const users = await collection.aggregate(pipeline()).toArray()

  console.dir(users, { depth: 3 })

  // company: [ { _id: [ObjectId], name: 'Mail', employees: 4340 } ],

  //step 1 -> step 2 -> step 3 -> ...

  await client.close()
})()

db.runCommand(
  {
     explain: { count: "products", query: { quantity: { $gt: 50 } } },
     verbosity: "executionStats"
  }
)

/*
# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# Where and how to store data.
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true
#  engine:
#  wiredTiger:

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1


# how the process runs
processManagement:
  timeZoneInfo: /usr/share/zoneinfo

security:
  authorization: enabled

#operationProfiling:

#replication:

#sharding:

## Enterprise-Only Options:

#auditLog:

#snmp:

*/

/*
function pipeline() {
  return [
    {
      $lookup: {
        from: 'companies',
        localField: 'company',
        foreignField: 'name',
        as: 'company'
      }
    },
    {
      $unwind: '$company'
    },
    { $limit: 1 }
  ]
}
*/

/*
{
  "_id": {
    "$oid": "62ed4601842ecf7f8c0bed2c"
  },
  "name": "Maxine Hyatt",
  "email": "Will_Maggio17@gmail.com",
  "phone": "1-918-875-9430 x151",
  "age": 40,
  "company": { "name": "Mail", "employess": 1000 },
  "skills": {
    "english": "B1",
    "languages": [
      "C#",
      "Haskell"
    ]
  }
}

{
  "_id": {
    "$oid": "62ed4601842ecf7f8c0c143b"
  },
  "name": "Yandex",
  "employees": 569
}
*/







// poolSize: 1
// ack. acknownlegment

// 1. Schemeless
// 2. Императивная язык. collection.find()

// find and findOne - поиск.
// collection.aggregation - поиск + агрегация(подготовка данных)

/*
{
  "_id": {
    "$oid": "62ed4601842ecf7f8c0bed2c"
  },
  "name": "Maxine Hyatt",
  "email": "Will_Maggio17@gmail.com",
  "phone": "1-918-875-9430 x151",
  "age": 40,
  "company": "Mail",
  "skills": {
    "english": "B1",
    "languages": [
      "C#",
      "Haskell"
    ]
  }
}

{
  "C#": 100500,
  "Javascript": 200000,
}
*/

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

const userSchema = {
  "$id": "user",
  "type": "object",
  "required": [ 'name', 'age', 'country' ],
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

ODM - Mongoose

jsonSchema -> TS, TS + JSDoc -> jsonSchema


*/







/* 


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
