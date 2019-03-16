module.exports = {
    module: {
      rules: [
        {
          test: /\.obj$/i,
          loader: 'raw-loader',
        },
      ],
    },
  };