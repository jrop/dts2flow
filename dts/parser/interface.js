'use strict'

const func = require('./function')
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
	const mbrs = members(lexer)
	lexer.expect('}')

	return { type: 'interface', id: iId, extends: iExtends, members: mbrs }
}

function members(lexer) {
	const _mbrs = [ ]
	while (lexer.peek().type != '}')
		_mbrs.push(member(lexer))
	return _mbrs
}

function member(lexer) {
	const nxt = lexer.peek()
	if (nxt.type == '(') {
		//
		// self-invocation
		//

		const parameters = func.parameters(lexer)
		lexer.expect(':')
		const returns = type(lexer)
		lexer.expect(';')

		return { type: 'call', parameters, returns }
	} else {
		//
		// property or method
		//

		const id = lexer.expect('ID').match
		if ([ '(', '<' ].includes(lexer.peek().type)) {
			// method definition
			const _generics = generics(lexer)
			const parameters = func.parameters(lexer)
			lexer.expect(':')
			const returns = type(lexer)
			lexer.expect(';')

			return { type: 'method', id, generics: _generics, parameters, returns }
		} else {
			// property definition
			lexer.expect(':')
			const returns = type(lexer)
			lexer.expect(';')

			return { type: 'property', id, returns }
		}
	}
}
