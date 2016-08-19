'use strict'

module.exports = function statements(lexer) {
	const _stmts = [ ]
	let stmt
	while ((stmt = require('./statement')(lexer)))
		_stmts.push(stmt)
	return _stmts
}
