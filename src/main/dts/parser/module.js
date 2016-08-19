'use strict'

module.exports = function (lexer) {
	const statements = require('./statements')
	lexer.expect('module')

	const name = lexer.expect('STRING').groups[1]
	lexer.expect('{')
	console.log(statements)
	const modStmts = statements(lexer)
	lexer.expect('}')
	return { type: 'module', name, statements: modStmts }
}
