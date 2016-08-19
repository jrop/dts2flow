'use strict'

module.exports = function statements(lexer) {
	const statement = require('./statement')

	const _stmts = [ ]
	let stmt
	while (![ '}', '$EOF' ].includes(lexer.peek().type) && (stmt = statement(lexer)))
		_stmts.push(stmt)
	return _stmts
}
