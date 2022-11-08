const { faker } = require('@faker-js/faker');

const COMPANIES = [ 'Yandex', 'Mail', 'Rambler' ];
const LANGUAGES = [ 'Javascript', 'Typescript', 'Go', 'Rust', 'Python', 'C', 'C++', 'C#', 'Haskell' ]

// база mytest
// 1 коллекция users. Пользователи
/*
{
	"_id" : ObjectId("636a87a2e55391e26ac69157"),
	"name" : "Lisa Bradtke",
	"email" : "Carmella.Auer@yahoo.com",
	"phone" : "412-469-8257",
	"age" : 71,
	"company" : "Mail",
	"skills" : {
		"english" : "B1",
		"languages" : [
			"Python",
			"C#"
		]
	}
}
Задача. Сделай аггрегарцию какие языки знают наши пользователи
{
  Javascript: 1000,
  Typescript: 500,
}
*/

module.exports = {
  getCompanies() {
    const companies = [];

    for (let i = 0; i < COMPANIES.length; i++) {
      companies.push({
        name: COMPANIES[i],
        employees: faker.datatype.number(10000, 100000),
      })
    }

    return companies
  },

  generateUsers(max = 100) {
    const users = []

    for (let i = 0; i < max; i++) {
      users.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        age: faker.datatype.number(100),
        company: this.generateCompany(),
        skills: {
          english: this.generateEnglish(),
          languages: this.generateLanguages()
        },
      })
    }

    return users
  },

  generateEnglish() {
    const levels = [ 'A1', 'A2', 'B1', 'B2', 'C1', 'C2', undefined ]

    return this.generateFromArray(levels)
  },

  generateLanguages() {
    let languages = []

    for (let i = 0; i < 2; i++) {
      const language = this.generateLanguage()

      if (languages.includes(language) === false) {
        languages.push(language)
      }
    }

    return languages
  },

  generateLanguage() {
    return this.generateFromArray(LANGUAGES)
  },

  generateCompany() {
    return this.generateFromArray(COMPANIES)
  },

  generateFromArray(arr) {
    const index = faker.datatype.number(arr.length - 1)

    return arr[index]
  }
}
