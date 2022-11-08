// const { ObjectId } = require('mongodb')
const clientModule = require('./client')

;(async() => {
  const client = await clientModule.run()

  // const collection = client.db('mytest').collection('users');

  await client.close()
})()
