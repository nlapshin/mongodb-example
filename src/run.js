const clientModule = require('./client')

;(async() => {
  const client = await clientModule.run()

  const collection = client.db('mytest').collection('users');
  const users = await collection.find({}).toArray()

  console.log(users)

  await client.close()
})()

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
