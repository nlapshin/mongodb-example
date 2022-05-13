const clientRunner = require('../client')
const dataSets = require('./data-sets')

;(async () => {
  const client = await clientRunner.run()
  const usersCollection = client.db('mytest').collection('users');

  const sets = dataSets.generate()
  await usersCollection.insertMany(sets)


  await client.close()
})()
