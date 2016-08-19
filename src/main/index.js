'use strict'

const fs = require('fs')
const { parse, createLexer } = require('./dts')

const s = fs.readFileSync('./sample.d.ts', 'utf-8')
const lexer = createLexer(s)
const ast = parse(lexer)
console.log(require('util').inspect(ast, null, null))

// let t
// while ((t = lexer.next()).type != '$EOF')
// 	console.log(t.type, [ 'ID', 'REFERENCE_COMMENT', 'STRING' ].includes(t.type) ? t.match : '')
