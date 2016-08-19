'use strict'

const type = require('./type')

module.exports = function (lexer) {
	const statements = require('./statements')
	lexer.expect('namespace')

	const id = type(lexer)
	lexer.expect('{')
	const nsStmts = statements(lexer)
	lexer.expect('}')
	return { type: 'namespace', id, statements: nsStmts }
}
