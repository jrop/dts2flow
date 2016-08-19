'use strict'

module.exports = function (lexer) {
	const statement = require('./statement')
	lexer.expect('export')

	if (lexer.peek().type == '=') {
		lexer.next()
		const exportTarget = lexer.expect('ID').match
		lexer.expect(';')
		return { type: 'export', id: exportTarget }
	} else
		return Object.assign(statement(lexer), { exported: true })
}
