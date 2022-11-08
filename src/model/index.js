const mem = require('../mem')

module.exports = class UserModel {
  constructor(client) {
    this.client = client
    this.collection = client.db('mytest').collection('users');
  }

  // Записи 40000
  // 1 способ. 400мс/3000мс, много выделяется памяти.
  // 2 способ. 370мс/3000мс, утечек памяти нет.
  // 3 способ. 380мс/1300ms
  // 4 способ. 80мс/230ms.

  async getLanguagesCount() {
    // Находим всех пользователей
    const users = await this.collection.find({}).toArray()

    //console.log(this.collection.find({})) // можем вычивать порциями(batch)

    // Группируем
    // Перебираем здесь 40к элементов массив.
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









  async getLanguagesCountForEach() {
    const cursor = await this.collection.find({})
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



  async getLanguageMapReduce() {
    //mapReduce(mapFunction, reduceFunction, outputSchema)

    const count = await this.collection.mapReduce(
      function () {
        // 1 - это ключ,
        // 2 - это значение
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

    mem.show()

    return count[0].value
  }


  async getLanguageAggregation() {
    // Выполняются в memory. 100 Мб. { useDisk: true }
    const res = await this.collection.aggregate([
      {
        $project: {
          _id: 0, // служебное поле, нужно отлючать явно, если надо.
          'skills.languages' : 1 // 1 - включить, 0 - отключить
        }
      },
      {
        $unwind: "$skills.languages"
      }, // wind - крыло, unwind - убрать крылья
      {
        $group: {
          _id: "$skills.languages", // _id уникальный ключ для группировки
          count: { $sum: 1 } // поля суммирования для пользователей count
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
