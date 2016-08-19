'use strict'

const type = require('./type')
const statements = require('./statements')

module.exports = function (lexer) {
	lexer.expect('namespace')

	const id = type(lexer) // ^TODO: '.' notation...
	lexer.expect('{')
	const nsStmts = statements(lexer)
	lexer.expect('}')
	return { type: 'namespace', id, statements: nsStmts }
}
