const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
	{
		test: /\.jsx?$/,
		exclude: /(node_modules)/,
		loaders: ['react-hot', 'babel?presets[]=stage-1,presets[]=es2015,presets[]=react,plugins[]=transform-class-properties']
	},
	{
		test: /\.json$/,
		loader: 'json-loader'
	},
	{
		test: /\.scss$/,
		loaders: ['style-loader', 'css-loader', 'sass-loader']
	},
	{
		test: /\.css$/,
		loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
	},
	{
		test: /\.(?:png|jpe?g|gif|svg|ttf|eot|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
		loader: 'url?limit=8192'
	}
];