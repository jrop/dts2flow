'use strict'

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/asana/asana.d.ts

function fmtLocation(token) {
	const pos = token.position()
	return `${pos.start.line}:${pos.start.column}`
}

function parse(lexer) {
	const file = {
		refs: refs(lexer),
		statements: statements(lexer),
	}
	return file
}

function skiplf(lexer) {
	while (lexer.peek().type == 'LF')
		lexer.next()
}

function refs(lexer) {
	const _refs = [ ]
	skiplf(lexer)
	while (lexer.peek().type == 'REFERENCE_COMMENT') {
		_refs.push(lexer.next().groups[1])
		skiplf(lexer)
	}
	return _refs
}

function statements(lexer) {
	const _stmts = [ ]
	let stmt
	while ((stmt = statement(lexer))) {
		_stmts.push(stmt)
		skiplf(lexer)
	}
	return _stmts
}

function statement(lexer) {
	skiplf(lexer)
	const t = lexer.peek()
	switch (t.type) {
	case 'declare':
		lexer.next()
		return Object.assign(statement(lexer), { declaration: true })

	case 'export':
		lexer.next()

		if (lexer.peek().type == '=') {
			lexer.next()
			const exportTarget = lexer.expect('ID').match
			lexer.expect(';')
			return { type: 'export', id: exportTarget }
		} else
			return Object.assign(statement(lexer), { exported: true })

	case 'function':
		lexer.next()

		const funId = lexer.expect('ID').match
		const params = functionParameterList(lexer)
		lexer.expect(':')
		const funType = type(lexer)
		lexer.expect(';')
		return { type: 'function', id: funId, params, returns: funType }

	case 'import':
		lexer.next()

		lexer.expect('*')
		lexer.expect('as')
		const importAlias = lexer.expect('ID').match
		lexer.expect('from')
		const importFrom = lexer.expect('STRING').groups[1]
		lexer.expect(';')

		return { type: 'import', alias: importAlias, from: importFrom }

	case 'interface':
		lexer.next()

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
		// TODO: interface body
		lexer.expect('}')

		return { type: 'interface', id: iId, extends: iExtends }

	case 'namespace':
		lexer.next()

		const id = type(lexer) // ^TODO: '.' notation...
		lexer.expect('{')
		const nsStmts = statements(lexer)
		lexer.expect('}')
		return { type: 'namespace', id, statements: nsStmts }

	case 'module':
		lexer.next()

		const name = lexer.expect('STRING').groups[1]
		lexer.expect('{')
		const modStmts = statements(lexer)
		lexer.expect('}')
		return { type: 'module', name, statements: modStmts }

	case 'static':
		lexer.next()

		return { type: 'static' }

	case 'var':
		lexer.next()

		const varId = lexer.next().match
		lexer.expect(':')
		const varType = type(lexer)
		lexer.expect(';')

		return { type: 'var', id: varId, returns: varType }
	default:
		console.error('Unexpected token: ' + t.type + ' at ' + fmtLocation(t))
		return null
	}
}

//
// Something.SomethingElse<T, U, V>
// TODO: Some.Type<T, U> & { anonymous: any }
// TODO: { anonymous: any }
//
function type(lexer) {
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

//
// <T, U, V>
// TODO: nested generics
//
function generics(lexer) {
	let id = ''
	if (lexer.peek().type == '<') {
		id += lexer.next().match
		while (true) {
			if (lexer.peek().type == '>')
				break

			id += lexer.expect('ID').match
			if (lexer.peek().type != ',')
				break
			else
				id += lexer.next().match
		}
		id += lexer.expect('>').match
	}
	return id
}

//
// (optional?: any, more: number)
//
function functionParameterList(lexer) {
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

module.exports = parse
