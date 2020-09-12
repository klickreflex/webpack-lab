const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'scripts/bundle.js',
        // Important make the outputPath config in file-loaders work as expected:
        publicPath: '../',
        path: path.resolve(__dirname, 'dist'),
    },

    plugins: [
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: 'styles/bundle.css',
        }),

        new SVGSpritemapPlugin('./src/svg/**/*.svg', {
            output: {
                filename: 'svg/sprite.svg',
                svgo: true,
            },
            sprite: {
                prefix: 'icon-',
                generate: {
                    title: false,
                },
            },
        }),

        new NunjucksWebpackPlugin({
            templates: [
                {
                    from: "./src/templates/index.njk",
                    to: "index.html"
                },
            ]
        }),
    ],

    module: {
        rules: [
            {
                test: /\.pcss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // options: {
                        //     hmr: process.env.NODE_ENV === 'development',
                        // },
                    },
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[folder]/[name].[ext]',
                    outputPath: 'images',
                },
            },
            {
                test: /\.(woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts'
                },
            },
            {
                test: /\.njk$/,
                loader: "raw-loader",
            },
        ],
    },
};
