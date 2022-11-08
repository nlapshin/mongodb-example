const clientModule = require('./client')

// 1. Авторизация
// 2. Репликация
// 3. Шардирование. А - К положили на один сервер,K до Я на другой.


// db.runCommand(
//   {
//     explain: { count: "users", query: { company: 'Mail' } },
//     verbosity: "queryPlanner"
//   }
// )

/*
{
    "namespace" : "mytest.users",
    "indexFilterSet" : false,
    "parsedQuery" : {
        "company" : {
            "$eq" : "Mail"
        }
    },
    "queryHash" : "CC263DCB",
    "planCacheKey" : "CC263DCB",
    "maxIndexedOrSolutionsReached" : false,
    "maxIndexedAndSolutionsReached" : false,
    "maxScansToExplodeReached" : false,
    "winningPlan" : {
        "stage" : "COUNT",
        "inputStage" : {
            "stage" : "COLLSCAN",
            "filter" : {
                "company" : {
                    "$eq" : "Mail"
                }
            },
            "direction" : "forward"
        }
    },
    "rejectedPlans" : []
}
*/

// db.members.createIndex( { groupNumber: 1, lastname: 1, firstname: 1 }, { unique: true } )

;(async() => {
  const client = await clientModule.run()
  const collection = client.db('mytest').collection('users');

  const res = await client.db('mytest').runCommand(
    {
      explain: { count: "users", query: { company: 'Mail' } },
      verbosity: "queryPlanner"
    }
  )

  // const users = await collection.aggregate([
  //   { 
  //     "$lookup": {
  //       "from": "companies", // откуда
  //       "localField": "company", // поле сравнения
  //       "foreignField": "name",
  //       "as": "company" // как назвать новое поле
  //     }
  //   },
  //   {
  //     $unwind: '$company'
  //   }
  // ]).toArray()

  // console.log(users[0])

  /*
  {
    _id: new ObjectId("636a87a2e55391e26ac69157"),
    name: 'Lisa Bradtke',
    email: 'Carmella.Auer@yahoo.com',
    phone: '412-469-8257',
    age: 71,
    company: {
      _id: new ObjectId("636a87a2e55391e26ac6b868"),
      name: 'Mail',
      employees: 9707
    },
    skills: { english: 'B1', languages: [ 'Python', 'C#' ] }
  }
  */

  // const users = await collection.aggregate([
  //     { 
  //       "$group": {
  //         "_id": "$company",
  //         // "names": { $push: '$name' }, // добавляет в массив
  //         "ages": { $addToSet: '$age' }, // добавляет в массив только уникальные
  //         "ageAverage": { $avg: '$age' }
  //       }
  //     }
  //   ]).toArray()

  // console.log(users[0])





  

})()

// Познакомились с MongoDB
// Чем отличается MongoDB от Postgres:
// - документоориентированная.
// - schemaless. Отсуствие схем.
// - имперический подход.

// Декларативный. Что? Что мы хотим сделать.
/* Ищет все записи из таблицы cities, где город Moscow 
SELECT * FROM cities WHERE city = Moscow
*/

// Имперический. Как? Что мы хотим сделать.
/* Ищет все записи из таблицы cities, где город Moscow 
db.collection('cities').find({ city: 'Moscow' })
*/

// Схема в MongoDB.
// 

/*
const userSchema = {
  "type": "object",
  "required": [ "user", "age" ],
  "properties": {
    "user": {
      "type": "string",
      "maxLength": 128
    },
    "age": {
      "type": "number",
      "min": 0,
      "max": 150
    },
    "skills": {
      "type": "number",
      "min": 0,
      "max": 150
    }
  }
}

const user = {
  name: 'Nik', // String, Required
  age: 32, // Number, Required
  skills: ['Javascript', 'Golang'] // Array[String], Optionals
}

const wrongUser = {
  age: '32',
  skills: 'Javascript, Golang'
}

// Не чистый JSON. BSON.
// ObjectId

// db.createCollection("students", {
// 	validator: {
// 		$jsonSchema: {...}
// 	}
// }

// jsonSchema
*/

// ORM - Object-Relational Mapping
// ODM - Object-Document Mapping. Для MongoDB - это Mongoose.

// Схема
// 1. Нативный - через jsonSchema
// 2. Используя ODM - обертки.


// age: 32, age: '32'

// Веб-форма(не преобразовала из string в int) -> backend(в API нет схемы) -> DB(нет схемы)

// Проблематика
// db.collection('cities').find({ city: { $regexp: 'Moscow' } })
// Задача список городов(1000+) и стран(50+) и жителей в каждом городе.
// Нужно получить сколько живет в каждой стране жителей.

/*
{
  city: "Moscow",
  country: 'Russia',
  population: 10000000
}
*/

/*
const cities = db.collection('cities').find({}).toArray()
const groupCities = {}

for (const city)
*/
// Filter - поиск
// Group - не можем(GROUP BY)
// sort, limit, skip - можем

// aggregation framework
// pipeline

/*
const groupCities = db.collection.aggregate([
  {
    $group: {
      _id: '$country',
      sumPopulation: { $sum: '$population' }
    }
  }
])
*/

































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
