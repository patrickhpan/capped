module.exports = [
	{
		test: /\.jsx?$/,
		exclude: /(node_modules)/,
		loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=react']
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
		test: /\.(png|jpe?g|gif|svg|ttf|woff2?)$/,
		loader: 'url?limit=8192'
	}
];