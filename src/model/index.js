const mem = require('../mem')

module.exports = class UserModel {
  constructor(client) {
    this.client = client
    this.collection = client.db('mytest').collection('users');
  }

  async getLanguagesCount() {
    const users = await this.collection.find({}).toArray()

    const count = users.reduce((res, user) => {
      user.skills.languages.forEach(lang => {
        if (!res[lang]) {
          res[lang] = 0
        }

        res[lang] += 1
      })

      return res
    }, {})

    return count
  }

  async getLanguagesCountForEach() {
    const users = await this.collection.find({})
    const count = {}

    await users.forEach(user => {
      user.skills.languages.forEach(lang => {
        if (!count[lang]) {
          count[lang] = 0
        }

        count[lang] += 1
      })
    })

    return count
  }

  async getLanguageMapReduce() {
    const count = await this.collection.mapReduce(
      function () {
          emit(1, this.skills.languages)
      },
      function (key, values) {
          var result = {};

          values.forEach(list => {
            list.forEach(lang => {
              if (!result[lang]) {
                result[lang] = 0
              }

              result[lang] += 1
            })
          })

          return result;
      },
      { out: { inline: 1 } }
    );

    return count[0].value
  }

  async getLanguageAggregation() {
    const res = await this.collection.aggregate([
      {
        $project: { 
          'skills.languages' : 1 
        }
      },
      {
        $unwind: "$skills.languages"
      },
      {
        $group: {
          _id: "$skills.languages",
          count: { $sum: 1 }
        }
      },
    ]).toArray()

    const count = res.reduce((res, item) => {
      res[item._id] = item.count

      return res
    }, {})

    return count
  }
}















































// const mem = require('../mem')
// let requestId = 1

// const curRequestId = ++requestId
// mem.show()


// console.time(`request - ${curRequestId}`)


// console.timeEnd(`request - ${curRequestId}`)

// mem.show()
