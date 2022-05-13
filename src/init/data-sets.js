const { faker } = require('@faker-js/faker');

module.exports = {
  generate(max = 100) {
    const data = []

    for (let i = 0; i < max; i++) {
      data.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        age: faker.datatype.number(100),
        skills: {
          english: this.generateEnglish(),
          languages: this.generateLanguages()
        }
      })
    }

    return data
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
    const languages = [ 'Javascript', 'Typescript', 'Go', 'Rust', 'Python', 'C', 'C++', 'C#', 'Haskell' ]
    
    return this.generateFromArray(languages)
  },

  generateFromArray(arr) {
    const index = faker.datatype.number(arr.length - 1)

    return arr[index]

  }
}
