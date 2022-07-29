// (async () => {
// 	throw new Error("err"); // uncaught
// })();

// process.on('uncaughtException', (err) => {
//   console.log('uncaughtException', err)
// })


// async function func1() {
//   return func2()
// }


// async function func2() {
//   return func3()
// }


// async function func3() {
//   throw new Error('test')
// }



main()

function main() {
  sub();
}

async function sub() {
    console.trace('before sleep');
    await delay(1000);
    console.trace('after sleep');
}

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms);
    });
}
