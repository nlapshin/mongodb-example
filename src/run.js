const clientModule = require('./client')

// 1 кит. Авторизация.
// 2 кит. Репликация.
// 3 кит. Шардирования. // А-К, Л-Я
// mongodump - это создать бэкап. mongorestore - восстановить бэкап.

// API Schema - Бизнес-логика - DB Schema.

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

#security: // отвечает за авторизацию

#operationProfiling:

#replication:

#sharding:

## Enterprise-Only Options:

#auditLog:

#snmp:

;(async() => {
  const client = await clientModule.run()

  // client.db('mytest').collection('users') // получил базу данных -> коллекцию
  const collection = client.db('mytest').collection('users');
  const users = await collection.aggregate([
    {
      $lookup: {
        from: "companies", // из какой коллекции.
        localField: "company", // по какому полю сравнивать из коллекции users
        foreignField: "name", // по какому полю сравнивать из коллекции companies
        as: "company", // как новое поле будет называться.
      }
    },
    {
      $unwind: '$company'
    }
  ]).toArray()

  console.log('users count', users.length)
  console.log(users, {
    depth: 10,
  })

  await client.close()
})()

// Найти всех кто в Yandex
// await collection.find({ company: 'Yandex' }).toArray()

/* Регулярное выражение name: /Roob/
const users = await collection.find(
  { name: /Roob/ }, 
  { projection: { name: 1 } }
).toArray()
*/

// Where age > 18 AND company = Yandex
// $or - ИЛИ. $gt - greaterThan. $lt - lowerThan
/*const users = await collection.find({
  $and: [
    { age: { $gt: 18 } },
    { company: 'Yandex' }
  ]
}).toArray()
*/

// Where age > 18 AND company = Yandex OR skills.languages = JAvascript
// $or - ИЛИ. $gt - greaterThan. $lt - lowerThan
/*const users = await collection.find({
  $and: [
    { age: { $gt: 18 } },
    { company: 'Yandex' }
  ]
}).toArray()

/*
{
  "_id" : ObjectId("62e40919b8e2b3740df4dbec"),
  "name" : "Lamar Lakin",
  "email" : "Camron_Erdman@yahoo.com",
  "phone" : "579-315-6040 x83508",
  "age" : 46,
  "company" : "Yandex", // { name: 'Yandex', employyes': 7229 }
  "skills" : {
      "english" : "A2",
      "languages" : [ 
          "C#"
      ]
  }
}

{
    "_id" : ObjectId("62e407394564ab32e5caf744"),
    "name" : "Yandex",
    "employees" : 7229
}
*/

// SQL DB vs MongoDB
// 1. Схема.
// SQL DB - схема объязательна. MongoDb - нет.
// 2. Подход в формированию запросов.
// Декларативный подход. Отвечает на вопрос что? Описываем схему запроса в виде текста.
// Императивный подход. Отвечает на вопрос как получить? Вызываем функции.
// find и findOne - поиск. aggregate - поиск но в декларативном стиле.

// Схема в монгодб
/*
{
  "$id": "https://example.com/person.schema.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Person",
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string",
      "description": "The person's first name."
    },
    "lastName": {
      "type": "string",
      "description": "The person's last name."
    },
    "age": {
      "description": "Age in years which must be equal to or greater than zero.",
      "type": "integer",
      "minimum": 0
    }
  }
} JSONSchema
*/


// CRUD

// Create -> insert -> insertOne, insertMany
// db.getCollection('collection').insert()

// Read -> find -> find, findOne
// db.getCollection('collection').find()

// Update -> update -> updateOne, updateMany
// db.getCollection('collection').update()
// Мы обновляем что-то где-то

// Delete -> delete -> deleteOne, deleteMany
// db.getCollection('collection').delete()

// $gt - селектор greater than
// $lt - селектор less than

/*
db.getCollection("new_collection").find({ 
  $and: [
    { age: { $lt: 26 } },
    { name: "lena" }
  ] 
}).toArray()
*/


// const users = await collection.aggregate([
//   {
//     $lookup: {
//       from: "companies",
//       localField: "company",
//       foreignField: "name",
//       as: "company",
//     }
//   },
//   {
//     $unwind: '$company'
//   }
// ]).toArray()

// const users = await collection.aggregate([
//   { "$lookup": {
//     "from": "companies",
//     "let": { "company": "$company" },
//     "pipeline": [
//       { "$match": {
//         "$expr": { "$eq": [ "$name", "$$company" ] }
//       }},
//       { '$project': { _id: 0, name: 1 } }
//     ],
//     "as": "company"
//   }},
//   {
//     $unwind: '$company'
//   }
// ]).toArray()

// db.runCommand(
//   {
//     explain: { count: "products", query: { quantity: { $gt: 50 } } },
//     verbosity: "queryPlanner"
//   }
// )
