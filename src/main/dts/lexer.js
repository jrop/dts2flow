'use strict'

const perplex = require('perplex')

module.exports = function (s) {
	return perplex(s)
		.token('(', /\(/)
		.token(')', /\)/)
		.token('<', /</)
		.token('>', />/)
		.token('{', /\{/)
		.token('}', /\}/)
		.token('[', /\[/)
		.token(']', /\]/)
		.token('=>', /=>/)
		.token('=', /=/)
		.token('.', /\./)
		.token('*', /\*/)
		.token(':', /:/)
		.token('?', /\?/)
		.token('|', /\|/)
		.token(',', /,/)
		.token(';', /;/)

		.token('as', /as\s+/)
		.token('declare', /declare\s+/)
		.token('export', /export\s+/)
		.token('extends', /extends\s+/)
		.token('from', /from\s+/)
		.token('function', /function\s+/)
		.token('import', /import\s+/)
		.token('interface', /interface\s+/)
		.token('namespace', /namespace\s+/)
		.token('module', /module\s+/)
		.token('static', /static\s+/)
		.token('typeof', /typeof\s+/)
		.token('var', /var/)

		.token('ID', /[A-Za-z_$][A-Za-z0-9_$]*/)
		.token('STRING', /"((?:\\"|[^"\r\n])*)"/)
		.token('REFERENCE_COMMENT', /\/\/\/\s*<reference\s*path=["']([^'"]*)["']\s+\/>[^\r\n]*/)
		// .token('LF', /\r?\n/)
		.token('$SKIP_SINGLE_LINE_COMMENT', /\/\/[^\r\n]*/)
		.token('$SKIP_MULTI_LINE_COMMENT', /\/\*(?:.|[\r\n])*?\*\//)
		.token('$SKIP_WHITESPACE', /\s+/)
}
