// webpack.config.js

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

interface WebpackConfig {
  entry: {
    main: any[];
    styles1: any;
    styles2: any;
    styles3: any;
  };
  output: {
    path: any;
    filename: string;
  };
  module: {
    rules: ({
      test: RegExp;
      use: string[];
      exclude: RegExp;
    } | {
      test: RegExp;
      use: any[];
      exclude?: undefined;
    } | {
      // ... other rule types
    })[];
  };
  resolve: {
    // ... resolve configuration
  };
  plugins: any[];
  devtool?: string; // Add 'devtool' property to the type definition
}

const config: WebpackConfig = {
  entry: {
    main: [
      path.resolve(__dirname, 'src', 'index.ts'),
      path.resolve(__dirname, 'src', 'index.scss')
    ],
    styles1: path.resolve(__dirname, 'src', 'styles/style.scss'),
    styles2: path.resolve(__dirname, 'src', 'styles/educational.scss'),
    styles3: path.resolve(__dirname, 'src', 'styles/hitBottom.scss'),
    // Add more entries for additional SCSS files
  },
  output: {
    path: path.join(__dirname, 'dist'), // bundled file in dist/
    filename: '[name].js'
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