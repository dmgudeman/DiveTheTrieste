// webpack.config.js

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { Configuration as WebpackConfiguration } from 'webpack';
interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
  devtool?: string;
}


const config: Configuration = {
  entry: {
    main: [
      path.resolve(__dirname, 'src', 'index.ts'),
      path.resolve(__dirname, 'src', 'index.scss')
    ],
    styles1: path.resolve(__dirname, 'src', 'styles/style.scss'),
    styles2: path.resolve(__dirname, 'src', 'styles/educational.scss'),
    styles3: path.resolve(__dirname, 'src', 'styles/hitBottom.scss'),
    styles4: path.resolve(__dirname, 'src', 'styles/cockpit.scss')
    
    // Add more entries for additional SCSS files
  },
  output: {
    path: path.join(__dirname, 'dist'), // bundled file in dist/
    filename: '[name].js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/, // applies to js files
        use: ['babel-loader'], // transpiles your js
        exclude: /node_modules/, // don't transpile node modules
      },
      {
        test: /\.s?[ac]ss$/, // applies to css/scss/sass files
        use: [
          MiniCssExtractPlugin.loader, // create bundled css file
          {
            loader: 'css-loader', // resolves @import statements
            options: { url: false } // don't resolve url() statements
          },
          'sass-loader', // compiles sass to css
        ]
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css', // Use [name] placeholder to generate separate CSS files
    })
  ]
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval-source-map';
  }

  return config;
}