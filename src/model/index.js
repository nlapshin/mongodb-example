const mem = require('../mem')

// autocanon - десять соединений, который делают запросы
// к серверу параллельно.
// 1 Способ. Время выполнения: 550 ms/4500 ms. Выделяется много памяти.
// 2 Способ. Время выполнения: 500 ms/4000 ms. Память в норме.
// 3 Способ. Время выполнения: 650 ms/1900 ms. Память в идеальном виде.
// 4 Способ. Время выполнения: 120 ms/300 ms. Память в идеальном виде.

// 1 Прием - это поиск. 2 Прием - это аггрегация данных.

module.exports = class UserModel {
  constructor(client) {
    this.client = client
    this.collection = client.db('mytest').collection('users');
  }

  async getLanguagesCount() {
    const users = await this.collection.find({}).toArray()
    // массив из 60000 записей
    // Проблема может долго работать.
    // Проблемы с память.

    // const cursor = this.collection.find({})
    // cursor.toArray()

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

  // Первый два случая. Ищем в монге. Аггрерируем на сервере.
  // 

  async getLanguageMapReduce() {
    const count = await this.collection.mapReduce(
      function () {
          emit(1, this.skills.languages)
      }, // сбор данных
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
      }, // аггегирует
      { out: { inline: 1 } }
    );

    return count[0].value
  }

  async getLanguageAggregation() {
    const res = await this.collection.aggregate([
      {
        $project: {
          'skills.languages' : 1 // 1 true, 0 false
        }
      }, // убираем все лишнее. skills.languages
      {
        $unwind: "$skills.languages"
      }, // разоворачиваем массив.
      {
        $group: {
          _id: "$skills.languages", // $skills.languages.
          count: { $sum: 1 } // поле count, которая будет с суммой по языкам $sum
        }
      },
    ]).toArray()

    const count = res.reduce((res, item) => {
      res[item._id] = item.count

      return res
    }, {})

    mem.show()

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
