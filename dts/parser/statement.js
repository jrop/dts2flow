'use strict'

const statements = require('./statements')

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
		return require('./export')(lexer)
	case 'function':
		return require('./function')(lexer)
	case 'import':
		return require('./import')(lexer)
	case 'interface':
		return require('./interface')(lexer)
	case 'namespace':
		return require('./namespace')(lexer)
	case 'module':
		return require('./module')(lexer)
	case 'static':
		lexer.expect('static')
		return { type: 'static' }
	case 'var':
		return require('./var')(lexer)
	default:
		console.error('Unexpected token: ' + t.type + ' at ' + fmtLocation(t))
		return null
	}
}
