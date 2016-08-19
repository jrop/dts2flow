'use strict'

//
// <T, U, V>
// TODO: nested generics
//
module.exports = function generics(lexer) {
	let id = ''
	if (lexer.peek().type == '<') {
		id += lexer.next().match
		while (true) {
			if (lexer.peek().type == '>')
				break

			id += lexer.expect('ID').match
			if (lexer.peek().type != ',')
				break
			else
				id += lexer.next().match
		}
		id += lexer.expect('>').match
	}
	return id
}
