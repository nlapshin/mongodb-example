const clientRunner = require('../client')
const dataSets = require('./data-sets')

;(async () => {
  const client = await clientRunner.run()
  const usersCollection = client.db('mytest').collection('users');
  const companiesCollection = client.db('mytest').collection('companies');

  const users = dataSets.generateUsers(10000)
  await usersCollection.insertMany(users) // вставка данных в виде массив.

  const companiesCount = await companiesCollection.countDocuments()

  if (companiesCount === 0) {
    const companies = dataSets.getCompanies()
    await companiesCollection.insertMany(companies)
  }

  await client.close()
})()

// mongo - переключиться в sh(консоль или терминал) mongo
// mongo --port 27019

// use <db_name> - переключение с одной базы на другую
// или просто выбор.
// db.auth('admin', 'admin') // авторизация. Если все ок
// вернет 1.
// show collections - покажет все коллекции.

// database - database
// collection - аналог таблица SQL
// item, row, instance - запись в коллекция. Кортеж SQL.

// mytest - название базы данных.
// collection - users и companies. Список пользователей и компании.

// db.getCollection('users').countDocuments({}) - количество пользователей.

/*
{
  "_id" : ObjectId("62ed4601842ecf7f8c0bed2b"), // самогенерируемый uuid
  "name" : "Steven Kassulke",
  "email" : "Lionel.Corkery69@gmail.com",
  "phone" : "471-436-2051 x8320",
  "age" : 28,
  "company" : "Yandex",
  "skills" : {
      "english" : "A1",
      "languages" : [ 
          "Haskell"
      ]
  }
}

{ "_id" : ObjectId("62ed4601842ecf7f8c0bed2d"), "name" : "Johnnie Hansen Jr.", "email" : "Kellen.Muller62@gmail.com", "phone" : "828.392.1232 x558", "age" : 84, "company" : "Rambler", "skills" : { "english" : "A2", "languages" : [ "C", "Go" ] } }
{ "_id" : ObjectId("62ed4601842ecf7f8c0bed30"), "name" : "Mr. Gladys Ernser", "email" : "Keshawn_Baumbach79@yahoo.com", "phone" : "1-591-343-2715 x60417", "age" : 13, "company" : "Mail", "skills" : { "english" : "A1", "languages" : [ "C", "Javascript" ] } }
{ "_id" : ObjectId("62ed4601842ecf7f8c0bed3a"), "name" : "Lucas Mertz", "email" : "Kiana.Haag55@yahoo.com", "phone" : "637-593-8942", "age" : 80, "company" : "Yandex", "skills" : { "english" : "C1", "languages" : [ "C++", "C" ] } }
{ "_id" : ObjectId("62ed4601842ecf7f8c0bed3b"), "name" : "Lyle Kertzmann", "email" : "Cathrine_Purdy83@yahoo.com", "phone" : "582.825.7877 x3125", "age" : 13, "company" : "Yandex", "skills" : { "english" : "A2", "languages" : [ "Go", "C" ] } }
{ "_id" : ObjectId("62ed4601842ecf7f8c0bed3c"), "name" : "Ms. Jamie Lang", "email" : "Domenick_Hartmann24@hotmail.com", "phone" : "805.353.4092", "age" : 39, "company" : "Mail", "skills" : { "english" : null, "languages" : [ "C#", "C" ] } }
*/
