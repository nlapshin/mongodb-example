const { faker } = require('@faker-js/faker');

const COMPANIES = [ 'Yandex', 'Mail', 'Rambler' ];
const LANGUAGES = [ 'Javascript', 'Typescript', 'Go', 'Rust', 'Python', 'C', 'C++', 'C#', 'Haskell' ]

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
