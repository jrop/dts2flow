'use strict'

module.exports = function functionName(lexer) {
	lexer.expect('import')
	lexer.expect('*')
	lexer.expect('as')
	const importAlias = lexer.expect('ID').match
	lexer.expect('from')
	const importFrom = lexer.expect('STRING').groups[1]
	lexer.expect(';')

	return { type: 'import', alias: importAlias, from: importFrom }
}
