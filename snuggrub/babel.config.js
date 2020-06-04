module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
					root: ['./src'],
					alias: {
						dao: './src/api/dao',
						dto: './src/api/dto',
						models: './src/api/models',
						services: './src/api/services',
						utils: './src/utils',
						theme: './src/theme',
						hooks: './src/hooks',
						actions: './src/redux/actions',
						components: './src/components',
					},
				},
			],
		],
	};
};
