'use strict'

//
// <T, U, V<X,Y>>
//
module.exports = function generics(lexer) {
	const type = require('./type')

	const types = [ ]
	if (lexer.peek().type == '<') {
		lexer.expect('<')
		while (true) {
			if (lexer.peek().type == '>')
				break

			types.push(type(lexer))
			if (lexer.peek().type != ',')
				break
			else
				lexer.expect(',')
		}
		lexer.expect('>')
	}
	return types
}
