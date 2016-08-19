'use strict'

const func = require('./function')
const generics = require('./generics')

//
// Something.SomethingElse<T, U, V> | boolean[] | any
//
function type(lexer) {
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
//
function oneType(lexer) {
	if (lexer.peek().type == 'typeof') {
		lexer.expect('typeof')
		return { type: 'typeof', target: oneType(lexer) }
	} else if (lexer.peek().type == '(') {
		const parameters = func.parameters(lexer)
		lexer.expect('=>')
		const returns = type(lexer)
		return { type: 'function-type', parameters, returns }
	} else if (lexer.peek().type == '{') {
		return anonymousType(lexer)
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

function anonymousType(lexer) {
	const _interface = require('./interface')
	lexer.expect('{')
	const members = _interface.members(lexer)
	lexer.expect('}')
	return { type: 'anonymous-type', members }
}

module.exports = type
