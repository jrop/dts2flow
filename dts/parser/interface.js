'use strict'

const generics = require('./generics')
const type = require('./type')

module.exports = function (lexer) {
	lexer.expect('interface')

	const iId = lexer.expect('ID').match + generics(lexer)
	const iExtends = [ ]
	if (lexer.peek().type == 'extends') {
		lexer.next()
		do {
			iExtends.push(type(lexer))
			if (lexer.peek().type != ',')
				break
			lexer.next() // ','
		} while (true)
	}
	lexer.expect('{')
	// TODO: interface body
	lexer.expect('}')

	return { type: 'interface', id: iId, extends: iExtends }
}
