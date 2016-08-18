/* @flow */

const fs = require('fs')
const createLexer = require('./lexer')

const s = fs.readFileSync('./sample.d.ts', 'utf-8')
const lexer = createLexer(s)
let t
while ((t = lexer.next()).type != '$EOF')
	console.log(t.type, [ 'ID', 'REFERENCE_COMMENT', 'STRING' ].includes(t.type) ? t.match : '')
