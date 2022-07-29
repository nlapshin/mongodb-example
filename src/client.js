const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";

module.exports = {
  async run() {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })

    console.log("Client started!");

    return client
  }
}
