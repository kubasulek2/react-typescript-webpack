const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
	mode: 'production',
	devtool: 'source-map',
	output: {
		clean: true,
	},
	optimization: {
		usedExports: true,
		splitChunks: {
			chunks: 'all',
			minSize: 3000,
		},
		// Keep the runtime chunk separated to enable long term caching
		// https://twitter.com/wSokra/status/969679223278505985
		// https://github.com/facebook/create-react-app/issues/5358
		runtimeChunk: {
			name: (entrypoint) => `runtime-${entrypoint.name}`,
		},
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: 'assets/css/[name].[contenthash:8].css',
			chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css',
		}),
	],
};
