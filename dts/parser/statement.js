'use strict'

const _export = require('./export')
const _function = require('./function')
const _import = require('./import')
const _interface = require('./interface')
const _namespace = require('./namespace')
const _module = require('./module')
const _var = require('./var')

function fmtLocation(token) {
	const pos = token.position()
	return `${pos.start.line}:${pos.start.column}`
}

module.exports = function statement(lexer) {
	const t = lexer.peek()
	switch (t.type) {
	case 'declare':
		lexer.expect('declare')
		return Object.assign(statement(lexer), { declaration: true })
	case 'export':
		return _export(lexer)
	case 'function':
		return _function(lexer)
	case 'import':
		return _import(lexer)
	case 'interface':
		return _interface(lexer)
	case 'namespace':
		return _namespace(lexer)
	case 'module':
		return _module(lexer)
	case 'static':
		lexer.expect('static')
		return { type: 'static' }
	case 'var':
		return _var(lexer)
	default:
		console.error('Unexpected token: ' + t.type + ' at ' + fmtLocation(t))
		return null
	}
}
