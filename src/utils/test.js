const inspect = require('util').inspect

const obj = '{ "name":"John", "age":31, "city":"New York" }'
const temp = JSON.parse(obj)

console.log(temp.name) 