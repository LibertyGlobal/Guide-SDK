module.exports = function (config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine'],
    files: [
      'src/common/utils.js',
      'src/common/evaluable.js',
      'src/common/expression.js',
      'src/fields/field.js',
      'src/fields/text-field.js',
      'src/fields/fuzzy-match-field.js',
      'src/fields/multi-value-field.js',
      'src/fields/numeric-field.js',
      'src/common/request-builder.js',
      'src/common/resource.js',
      'src/resources/channel.js',
      'src/resources/video.js',
      'src/resources/broadcast.js',
      'src/guide.js',
      'test/**/*.spec.js'
    ],
    exclude: [],
    preprocessors: {
      'src/**/*.js': 'coverage'
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
