const client = require('./client')

;(async() => {
  const usersCollection = client.db('mytest').collection('users');

  // const result = await usersCollection.find().toArray()

  // console.log(result)

})()
