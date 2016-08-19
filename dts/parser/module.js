'use strict'

const statements = require('./statements')

module.exports = function (lexer) {
	lexer.expect('module')

	const name = lexer.expect('STRING').groups[1]
	lexer.expect('{')
	const modStmts = statements(lexer)
	lexer.expect('}')
	return { type: 'module', name, statements: modStmts }
}
