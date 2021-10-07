const config = {
	prettier: true,
	overrides: [
		{
			files: '**/*.ts',
			rules: {
				'@typescript-eslint/consistent-type-imports': [
					'error',
					{
						prefer: 'type-imports',
					},
				],
				// Modern TypeScript versions check for this
				'@typescript-eslint/no-implicit-any-catch': 'off',
				// Enum members should be StrictPascalCase, everything else is the same - https://github.com/xojs/eslint-config-xo-typescript/blob/7c1e7d23437d975f7031324ec12250985eb4ae7a/index.js#L281
				'@typescript-eslint/naming-convention': [
					'error',
					{
						// `selector: ['variableLike', 'memberLike', 'property', 'method'],`
						// Note: Leaving out `parameter` and `typeProperty` because of the mentioned known issues.
						// Leaving out `enumMember` in favor of custom rule below
						selector: [
							'variable',
							'function',
							'classProperty',
							'objectLiteralProperty',
							'parameterProperty',
							'classMethod',
							'objectLiteralMethod',
							'typeMethod',
							'accessor',
						],
						format: ['strictCamelCase'],
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
						prefix: ['is', 'has', 'can', 'should', 'will', 'did'],
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
	],
	rules: {
		'import/extensions': ['error', 'always'],
		// XO should not report style violations from Prettier - https://github.com/xojs/xo/issues/512
		'prettier/prettier': 'off',
	},
};

export = config;
