const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpritePlugin = require('svg-sprite-loader/plugin');
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const publicPath = (isProduction ? (process.env.PUBLIC_URL || '') : '') + '/';

const jsSourcePath = path.join(__dirname, './ui/source/js');
const buildPath = path.join(__dirname, './ui/build');
const imgPath = path.join(__dirname, './ui/source/assets/img');
const iconPath = path.join(__dirname, './ui/source/assets/icons');
const sourcePath = path.join(__dirname, './ui/source');


// Common plugins
const plugins = [
    new SpritePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor-[hash].js',
        minChunks(module) {
            const context = module.context;
            return context && context.indexOf('node_modules') >= 0;
        }
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(nodeEnv),
        },
        'PUBLIC_URL': JSON.stringify(publicPath)
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
        template: path.join(sourcePath, 'index.html'),
        path: buildPath,
        filename: 'index.html',
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
        postcss: [
            autoprefixer({
            browsers: [
                'last 3 version',
                'ie >= 10',
            ],
            }),
        ],
        context: sourcePath,
        },
    })
];

// Common rules
const rules = [
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
        'babel-loader',
        ],
    },
    {
        test: /\.svg$/,
        use: [
        {
            loader: 'svg-sprite-loader',
            options: {
            extract: true,
            spriteFilename: 'icons-sprite.svg',
            },
        },
        'svgo-loader',
        ],
        include: iconPath,
    },
    {
        test: /\.(png|gif|jpg|svg)$/,
        include: imgPath,
        use: 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]',
    },
    { 
        test: /\.css$/, 
        loader: "style-loader!css-loader" 
    },
    { 
        test: /\.png$/, 
        loader: "url-loader?limit=100000" 
    },
    { 
        test: /\.jpg$/, 
        loader: "file-loader" 
    },
    {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    },
    {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
    },
    {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'file-loader'
    },
    {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
    }
];

if (isProduction) {
    // Production plugins
    plugins.push(
        new UglifyJsPlugin(),
        new ExtractTextPlugin('style-[hash].css')
    );

    // Production rules
    rules.push(
        {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader!postcss-loader!sass-loader',
        }),
        }
    );
} else {
    // Development plugins
    plugins.push(
        new webpack.HotModuleReplacementPlugin(),
    );

    // Development rules
    rules.push(
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
                'style-loader',
                // Using source maps breaks urls in the CSS loader
                // https://github.com/webpack/css-loader/issues/232
                // This comment solves it, but breaks testing from a local network
                // https://github.com/webpack/css-loader/issues/232#issuecomment-240449998
                // 'css-loader?sourceMap',
                'css-loader',
                'postcss-loader',
                // 'sass-loader?sourceMap',
                'sass-loader',
            ],
        }
    );
}

module.exports = {
    devtool: isProduction ? false : 'source-map',
    context: jsSourcePath,
    entry: {
        js: './index.js',
    },
    output: {
        path: buildPath,
        publicPath: publicPath,
        filename: 'app-[hash].js',
    },
    externals: {
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    },
    module: {
        rules,
    },
    resolve: {
        extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            jsSourcePath,
        ],
        alias: {
            'components' : path.join(jsSourcePath, 'components'),
            'dev'        : path.join(jsSourcePath, 'dev'),
            'libs'       : path.join(jsSourcePath, 'libs'),
            'state': path.join(jsSourcePath, 'state'),
            'views'      : path.join(jsSourcePath, 'views')
        }
    },
    plugins,
    devServer: {
        contentBase: isProduction ? buildPath : sourcePath,
        historyApiFallback: true,
        port: 3000,
        compress: isProduction,
        inline: !isProduction,
        hot: !isProduction,
        host: '0.0.0.0',
        stats: {
            assets: true,
            children: false,
            chunks: false,
            hash: false,
            modules: false,
            publicPath: false,
            timings: true,
            version: false,
            warnings: true,
            colors: {
                green: '\u001b[32m',
            }
        },
    }
};
