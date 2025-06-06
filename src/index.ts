import type {FlatXoConfig} from 'xo';
import jsdoc from 'eslint-plugin-jsdoc';
import tsdoc from 'eslint-plugin-tsdoc';

const config: FlatXoConfig = [
	{
		prettier: 'compat',
		rules: {
			quotes: ['error', 'single', {avoidEscape: true, allowTemplateLiterals: true}],
			// Bad rule, it's also often prone to breaking TypeScript compilation
			'unicorn/prefer-json-parse-buffer': 'off',
		},
	},
	{
		files: '**/*.{js,cjs,mjs}',
		plugins: {
			jsdoc,
		},
	},
	{
		files: '**/*.{ts,tsx}',
		plugins: {
			tsdoc,
		},
		rules: {
			'default-case': 'off',
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'tsdoc/syntax': 'error',
			// Modern TypeScript versions check for this
			'@typescript-eslint/no-implicit-any-catch': 'off',
			// Enum members should be StrictPascalCase, variables can be UPPER_CASE, variables & functions can be StrictPascalCase for React components
			// Everything else is the same - https://github.com/xojs/eslint-config-xo-typescript/blob/7c1e7d23437d975f7031324ec12250985eb4ae7a/index.js#L281
			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: 'variable',
					format: ['strictCamelCase', 'UPPER_CASE', 'StrictPascalCase'],
					leadingUnderscore: 'allow',
				},
				{
					// `selector: ['variableLike', 'memberLike', 'property', 'method'],`
					// Note: Leaving out `parameter` and `typeProperty` because of the mentioned known issues.
					// Leaving out `variable` in favor of custom rule below
					// Leaving out `enumMember` in favor of custom rule below
					// Allowing StrictPascalCase for React components - see https://github.com/xojs/eslint-config-xo-typescript/issues/48
					selector: ['function', 'classProperty', 'objectLiteralProperty', 'parameterProperty', 'classMethod', 'objectLiteralMethod', 'typeMethod', 'accessor'],
					format: ['strictCamelCase', 'StrictPascalCase'],
					// We allow double underscope because of GraphQL type names and some React names.
					leadingUnderscore: 'allowSingleOrDouble',
					trailingUnderscore: 'allow',
					// Ignore `{'Retry-After': retryAfter}` type properties.
					filter: {
						regex: '[- ]',
						match: false,
					},
				},
				{
					selector: ['typeLike', 'enumMember'],
					format: ['StrictPascalCase'],
				},
				{
					selector: 'variable',
					types: ['boolean'],
					format: ['StrictPascalCase'],
					prefix: ['is', 'was', 'has', 'can', 'should', 'will', 'did'],
				},
				{
					// Interface name should not be prefixed with `I`.
					selector: 'interface',
					filter: /^(?!I)[A-Z]/.source,
					format: ['StrictPascalCase'],
				},
				{
					// Type parameter name should either be `T` or a descriptive name.
					selector: 'typeParameter',
					filter: /^T$|^[A-Z][a-zA-Z]+$/.source,
					format: ['StrictPascalCase'],
				},
				// Allow these in non-camel-case when quoted.
				{
					selector: ['classProperty', 'objectLiteralProperty'],
					format: null,
					modifiers: ['requiresQuotes'],
				},
			],
		},
	},
	{
		files: '**/*.{jsx,tsx}',
		rules: {
			'react/function-component-definition': [
				'error',
				{
					namedComponents: 'arrow-function',
					unnamedComponents: 'arrow-function',
				},
			],
		},
	},
];

export default config;
