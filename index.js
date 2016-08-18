/* @flow */

const fs = require('fs')
const createLexer = require('./lexer')
const parse = require('./parser')

const s = fs.readFileSync('./sample.d.ts', 'utf-8')
const lexer = createLexer(s)
const ast = parse(lexer)
console.log(require('util').inspect(ast, null, null))

