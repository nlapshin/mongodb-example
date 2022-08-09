const { ObjectId } = require('mongodb')
const clientModule = require('./client')

;(async() => {
  const client = await clientModule.run()

  const collection = client.db('mytest').collection('users');
  // const users = await collection.findOne({ 
  //   name: /Mon/i,
  // })
  
  /*
  await collection.updateOne(
    { 
      _id : ObjectId("62ed4601842ecf7f8c0bed2b") 
    }, 
    {
      name: 'Nik Lapshin'
    }
  ) // put обновление. То есть обновление с заменой.
  */

  /*
  await collection.updateOne(
    { 
      _id : ObjectId("62ed4601842ecf7f8c0bed2b") 
    }, 
    {
      $set: { name: 'Nik Lapshin' }
    }
  ) // patch обновление. То есть только то что нам надо.
  */

  /*
  await collection.deleteOne(
    { 
      _id : ObjectId("62ed4601842ecf7f8c0bed2b") 
    }
  )
  */

  // collection.updateOne(query, doc). query - ищет куда обновлять. doc - что обновлять

  // console.dir(users, { depth: 3 })

  await client.close()
})()

// {
//   "_id" : ObjectId("62ed4601842ecf7f8c0bed2b"),
//   "name" : "Steven Kassulke",
//   "email" : "Lionel.Corkery69@gmail.com",
//   "phone" : "471-436-2051 x8320",
//   "age" : 28,
//   "company" : "Yandex",
//   "skills" : {
//       "english" : "A1",
//       "languages" : [ 
//           "Haskell"
//       ]
//   }
// }

// C - Create
// insertOne - вставить объект в коллекцию.
// insertMany - вставить массив объектов в коллекцию.

// R - Read
// find - поиск многих записей.
// findOne - поиск уникальной записи.

// U - Update
// updateOne - обновить объект в коллекцию.
// updateMany - обновить массив объектов в коллекцию.

// D - Delete
// deleteOne - удалить объект в коллекцию.
// deleteMany - удалить массив объектов в коллекцию.

// CreateIndex - индексация
//   await collection.createIndex({
//   age: -1,
//   'skills.languages': -1
// })
//

// dropCollection(<collection_name>) - удалить коллекцию.


// WHERE lang = Javascript AND lang = Typescript
// collection.find({ 
//  $and: [
//    { 'skills.languages': 'Javascript' },
//    { 'skills.languages': 'Typescript' },
//  ]
//}).toArray()

// WHERE lang = Javascript AND lang = Typescript AND age > 18
// $lt(lessThan), $gt(greaterThan) - 
/* collection.find({ 
  $and: [
    { 'age': { $gt: 18 } },
    { 'skills.languages': 'Javascript' },
    { 'skills.languages': 'Typescript' },
  ]
}).toArray()
*/

/*
collection.find({ 
    $or: [
      {
        $and: [
          { 'age': { $gt: 18 } },
          { 'skills.languages': 'Javascript' },
          { 'skills.languages': 'Typescript' },
        ]
      },
      {
        age: 100
      }
    ]
  }).toArray()
*/
// по повторам, есть distinct










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


/*
1. Реляционные базы данных: таблицы + связи.
2. SQL: декларативный стиль. Отвечаем на вопрос Что?

1. MongoDB: schemeless.
2. Императивный стиль. Отвечаем на вопрос Как?
collection.find()

// Фронтенд на JS. Почему бэкенд на JS. Почему база данных на JS.
// А что если JSON на фронтенде. Почему бы не бэкенде и базе данных.
*/
