const clientModule = require('./client')

;(async() => {
  const client = await clientModule.run()

  const collection = client.db('test').collection('new_collection');
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
