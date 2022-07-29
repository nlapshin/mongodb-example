const { MongoClient } = require('mongodb');
const url = "mongodb://admin:admin@localhost:27018";

// <protocol>://<username:password>@<domain>:<port>
//"mongodb://admin:password@localhost:27017";

module.exports = {
  async run() {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })

    console.log("Client started!");

    return client
  }
}
