'use strict'

const generics = require('./generics')

//
// Something.SomethingElse<T, U, V>
// TODO: Some.Type<T, U> & { anonymous: any }
// TODO: { anonymous: any }
// TODO: [] suffix
// TODO: alternatives: number|boolean
//
module.exports = function type(lexer) {
	let _typeof = false
	if (lexer.peek().type == 'typeof') {
		_typeof = true
		lexer.next()
	}

	let id = lexer.expect('ID').match
	while (true) {
		if (lexer.peek().type != '.')
			break
		id += lexer.expect('.').match
		id += lexer.expect('ID').match
	}

	id += generics(lexer)
	return _typeof ? { type: 'typeof', target: id } : id
}
