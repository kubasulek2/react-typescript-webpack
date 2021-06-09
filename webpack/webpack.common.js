const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env) => {
	return {
		entry: path.resolve(__dirname, '..', './src/index.tsx'),
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		module: {
			rules: [
				{
					test: /\.(ts|js)x?$/,
					exclude: /node_modules/,
					include: path.resolve('./src'),
					use: [
						{
							loader: 'babel-loader',
						},
					],
				},
				{
					test: /\.module\.css$/,
					include: path.resolve('./src'),
					use: [
						env === 'prod' ? MiniCssExtractPlugin.loader : 'style-loader',
						{
							loader: 'css-loader',
							options: {
								modules: true,
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									plugins: [
										[
											'postcss-preset-env',
											{
												browsers: 'last 2 versions',
											},
										],
									],
								},
							},
						},
					],
				},
				{
					test: /\.css$/,
					exclude: /\.module\.css$/,
					include: path.resolve('./src'),
					use: [
						env === 'prod' ? MiniCssExtractPlugin.loader : 'style-loader',
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									plugins: [
										[
											'postcss-preset-env',
											{
												browsers: 'last 2 versions',
											},
										],
									],
								},
							},
						},
					],
				},
				{
					test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
					type: 'asset/resource',
					include: path.resolve('./src'),
					generator: {
						filename: 'assets/media/[name].[contenthash:8].[ext]',
					},
				},
				{
					test: /\.(woff(2)?|eot|ttf|otf|)$/,
					include: path.resolve('./src'),
					type: 'asset',
					parser: {
						// until 3kb theese resources will be inlined
						dataUrlCondition: {
							maxSize: 3 * 1024,
						},
					},
					generator: {
						filename: 'assets/fonts/[name].[contenthash:8].[ext]',
					},
				},
				{
					test: /\.svg$/,
					include: path.resolve('./src'),
					type: 'asset/inline',
					generator: {
						filename: 'assets/fonts/[name].[contenthash:8].[ext]',
					},
				},
			],
		},
		output: {
			path: path.resolve(__dirname, '..', './build'),
			filename:
				env === 'prod'
					? 'assets/js/[name].[contenthash:8].js'
					: 'assets/js/[name].js',
		},
		plugins: [
			// pass all the enviromental variables here, load config or something,
			// it will be transformed to variables in javascrpt
			// you can refer them in code via process.env.variableName
			new webpack.DefinePlugin({
				'process.env.name': JSON.stringify('Kuba'),
			}),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, '..', './src/index.html'),
			}),
			new CopyPlugin({
				patterns: [{ from: 'public', to: 'build', noErrorOnMissing: true }],
			}),
			// after build it will open page with grafic bundle size analize
			// new BundleAnalyzerPlugin(),
		],
	};
};
