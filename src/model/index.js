const mem = require('../mem')

module.exports = class UserModel {
  constructor(client) {
    this.client = client
    this.collection = client.db('mytest').collection('users');
  }

  // сервер - база данных.
  // поиск в базе. 1
  // выгрузка всех данных на сервер. 2
  // подсчет на сервере. 3

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

    mem.show()

    return count
  }


  // сервер - база данных.
  // поиск в базе. 1
  // выгрузка всех данных на сервер чанками. 2
  // подсчет на сервере. 3

  async getLanguagesCountForEach() {
    const cursor = await this.collection.find({}) // cursor
    const count = {}

    await cursor.forEach(user => {
      user.skills.languages.forEach(lang => {
        if (!count[lang]) {
          count[lang] = 0
        }

        count[lang] += 1
      })
    })

    mem.show()

    return count
  }

















  // collection.mapReduce(mapFunction, reduceFunction, out)

  async getLanguageCountMapReduce() {
    const count = await this.collection.mapReduce(
      function () {
          emit(1, this.skills.languages) // index, data
      },
      function (key, values) {
          var result = {};

          values.forEach(list => {
            if (!list.forEach) {
              return
            }

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



  // Aggegation framework все вычисление на  строну бд


  async getLanguageCountAggregation() {
    const res = await this.collection.aggregate([
      {
        $project: { 
          _id: 0, // 0 - это убрать поле, 1 оставить
          'langs' : '$skills.languages' 
        }
      }, // Выбрать только skills.languages.
      {
        $unwind: "$langs"
      }, // Сделать массив записей плоским
      {
        $group: {
          _id: "$langs", // значение группировки
          count: { $sum: 1 },
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
