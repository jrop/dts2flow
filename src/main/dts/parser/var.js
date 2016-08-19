'use strict'

const type = require('./type')

module.exports = function (lexer) {
	lexer.expect('var')

	const varId = lexer.next().match
	lexer.expect(':')
	const varType = type(lexer)
	lexer.expect(';')
	return { type: 'var', id: varId, returns: varType }
}
