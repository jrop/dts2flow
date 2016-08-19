'use strict'

const assert = require('assert')

describe('parser', function () {
	describe('type', function () {
		const lex = require('../../main/dts/lexer')
		const type = require('../../main/dts/parser/type')

		it('should parse simple types', function () {
			assert.deepEqual(type(lex('T')), {
				type: 'type',
				alternatives: [ { type: 'type-id', id: 'T', generics: [ ], array: false } ],
			})

			assert.deepEqual(type(lex('T.U')), {
				type: 'type',
				alternatives: [ { type: 'type-id', id: 'T.U', generics: [ ], array: false } ],
			})

			assert.deepEqual(type(lex('T.U[]')), {
				type: 'type',
				alternatives: [ { type: 'type-id', id: 'T.U', generics: [ ], array: true } ],
			})
		})

		it('should parse generics', function () {
			assert.deepEqual(type(lex('T<U[], V>')), {
				type: 'type',
				alternatives: [ {
					type: 'type-id',
					id: 'T',
					array: false,
					generics: [ {
						type: 'type',
						alternatives: [ {
							type: 'type-id',
							id: 'U',
							generics: [ ],
							array: true,
						} ],
					}, {
						type: 'type',
						alternatives: [ {
							type: 'type-id',
							id: 'V',
							generics: [ ],
							array: false,
						} ],
					} ],
				} ],
			})

			assert.deepEqual(type(lex('T<>')), {
				type: 'type',
				alternatives: [ {
					type: 'type-id',
					id: 'T',
					generics: [ ],
					array: false,
				} ],
			})
		})

		it('should parse anonymous types', function () {
			assert.deepEqual(type(lex('{ flag: boolean }')), type(lex('{ flag: boolean; }')))
			assert.deepEqual(type(lex('{ flag: boolean }')), {
				type: 'type',
				alternatives: [ {
					type: 'anonymous-type',
					members: [ {
						type: 'property',
						id: 'flag',
						returns: {
							type: 'type',
							alternatives: [ {
								type: 'type-id',
								id: 'boolean',
								generics: [ ],
								array: false,
							} ],
						},
					} ],
				} ],
			})
		})

		it('should parse alternatives', function () {
			assert.deepEqual(type(lex('U|V')), {
				type: 'type',
				alternatives: [ {
					type: 'type-id',
					id: 'U',
					generics: [ ],
					array: false,
				}, {
					type: 'type-id',
					id: 'V',
					generics: [ ],
					array: false,
				} ],
			})
		})

		it('should parse function types', function () {
			assert.deepEqual(type(lex('() => any')), {
				type: 'type',
				alternatives: [ {
					type: 'function-type',
					parameters: [ ],
					returns: {
						type: 'type',
						alternatives: [ {
							type: 'type-id',
							id: 'any',
							generics: [ ],
							array: false,
						} ],
					},
				} ],
			})
		})

		it('should parse typeof', function () {
			assert.deepEqual(type(lex('typeof X')), {
				type: 'type',
				alternatives: [ {
					type: 'typeof',
					target: {
						type: 'type-id',
						id: 'X',
						generics: [ ],
						array: false,
					},
				} ],
			})
		})
	})
})
