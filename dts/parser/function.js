'use strict'

const type = require('./type')

function func(lexer) {
	lexer.expect('function')
	const funId = lexer.expect('ID').match
	const params = func.parameters(lexer)
	lexer.expect(':')
	const funType = type(lexer)
	lexer.expect(';')
	return { type: 'function', id: funId, params, returns: funType }
}

//
// (optional?: any, ...more: number)
//
function parameters(lexer) {
	const params = [ ]
	lexer.expect('(')

	while (true) {
		if (lexer.peek().type == ')')
			break

		const name = lexer.expect('ID').match
		let optional = false
		if (lexer.peek().type == '?') {
			optional = true
			lexer.next()
		}

		lexer.expect(':')
		const paramType = type(lexer) // ^TODO: '.' notation

		params.push({ name, optional, type: paramType })
	}

	lexer.expect(')')
	return params
}

module.exports = func
module.exports.parameters = parameters
