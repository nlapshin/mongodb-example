const clientRunner = require('../client')
const dataSets = require('./data-sets')

;(async () => {
  const client = await clientRunner.run()
  const usersCollection = client.db('mytest').collection('users');
  const companiesCollection = client.db('mytest').collection('companies');

  const users = dataSets.generateUsers(10000)
  await usersCollection.insertMany(users)

  const companiesCount = await companiesCollection.countDocuments()

  if (companiesCount === 0) {
    const companies = dataSets.getCompanies()
    await companiesCollection.insertMany(companies)
  }

  await client.close()
})()
