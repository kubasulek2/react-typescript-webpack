const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	// this is a way to pass own enviromental variables
	// cant ommit stringify, otherwise runtime will look for variable named "Kuba"
	plugins: [
		new webpack.DefinePlugin({
			'process.env.name': JSON.stringify('Kuba')
		}),
		new ReactRefreshWebpackPlugin(),
		new ForkTsCheckerWebpackPlugin()
	],
	devServer: {
		hot: true,
		open: true,
		port: 5000
	}
};