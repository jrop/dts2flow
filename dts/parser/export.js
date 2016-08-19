'use strict'

const statement = require('./statement')

module.exports = function (lexer) {
	lexer.expect('export')

	if (lexer.peek().type == '=') {
		lexer.next()
		const exportTarget = lexer.expect('ID').match
		lexer.expect(';')
		return { type: 'export', id: exportTarget }
	} else
		return Object.assign(statement(lexer), { exported: true })
}
