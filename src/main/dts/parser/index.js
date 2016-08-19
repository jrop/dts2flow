'use strict'

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/asana/asana.d.ts

const statements = require('./statements')

function parse(lexer) {
	const file = {
		refs: refs(lexer),
		statements: statements(lexer),
	}
	lexer.expect('$EOF')
	return file
}

function refs(lexer) {
	const _refs = [ ]
	while (lexer.peek().type == 'REFERENCE_COMMENT')
		_refs.push(lexer.next().groups[1])
	return _refs
}

module.exports = parse
