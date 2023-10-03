module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@assets': './assets/index',
          '@app': './src/app/index',
          '@components': './src/components/index',
          '@localization': './src/localization/index',
          '@redux': './src/redux',
          '@routes': './src/routes/index',
          '@screens': './src/screens/index',
          '@services': './src/services/index',
          '@storage': './src/storage/index',
          '@types': './src/types/index',
          '@utils': './src/utils/index',
          '@validations': './src/validations/index',
        },
      },
    ],
  ],
};
