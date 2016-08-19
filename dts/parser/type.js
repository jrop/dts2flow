'use strict'

const generics = require('./generics')

//
// Something.SomethingElse<T, U, V> | boolean[] | any
//
module.exports = function type(lexer) {
	const alternatives = [ ]

	do {
		alternatives.push(oneType(lexer))
		if (lexer.peek().type != '|')
			break
		lexer.expect('|')
	} while (true)

	return { type: 'type', alternatives }
}

//
// TODO: Some.Type<T, U> & { anonymous: any }
// TODO: { anonymous: any }
//
function oneType(lexer) {
	if (lexer.peek().type == 'typeof') {
		lexer.expect('typeof')
		return { type: 'typeof', target: oneType(lexer) }
	}

	let id = lexer.expect('ID').match
	while (true) {
		if (lexer.peek().type != '.')
			break
		id += lexer.expect('.').match
		id += lexer.expect('ID').match
	}

	id += generics(lexer)

	let array = false
	if (lexer.peek().type == '[') {
		array = true
		lexer.expect('[')
		lexer.expect(']')
	}

	return { type: 'type-id', id, array }
}
