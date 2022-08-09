const { MongoClient } = require('mongodb');
const url = "mongodb://admin:admin@localhost:27019";
// <protocol>://<username>:<password>@<domain>:<port>/<database>

module.exports = {
  async run() {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })

    console.log("Client started!");

    return client
  }
}
