//var a = undefinedVariable // ReferenceError

// throw new EvalError('error') // EvalError

// decodeURIComponent('%') // URIError

// eval('hoo bar') // SyntaxError

// undefined.not() // TypeError

// [].length = 'Wat?' // RangeError

// Error - это класс.

/*
class ExtendableError extends Error {
  constructor(message, extra) {
    super(message);
    this.name = this.constructor.name;
    this.extra = extra;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else { 
      this.stack = (new Error(message)).stack;
    }
  }
}

class HTTPError extends ExtendableError {}

const error = new Error('error')
const httpError = new HTTPError()

console.log(error instanceof Error) // true
console.log(error instanceof HTTPError) // false
console.log(httpError instanceof Error) // true
console.log(httpError instanceof HTTPError) // true

if (httpError instanceof HTTPError) {
  const message = 'http_error'
} else {
  const message = 'unknown_error'
}
*/

/*
;(async () => {
  await run()
})()

async function run () {
  throw new Error("err"); // uncaught
}

process.on('uncaughtException', (err) => {
  console.log('uncaughtException', err)

  setInterval(run, 1000)
})
*/


/*
main()

async function main() {
  await sub(); // нет await
}

async function sub() {
    console.trace('before sleep');
    await delay(1000);
    console.trace('after sleep');
}

async function getList() {
  return await this.collection.find() // Promise
}

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms);
    });
}
*/
