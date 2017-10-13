// karma.conf.js
function karmaConfig(config) {
  config.set({
    basePath: 'spec/',
    files: [
        '*.spec.js'
    ],
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    autoWatch: true, // enable for hot reload
    logLevel: 'info',
    reporters: ['progress', 'istanbul'],
    singleRun: false, // enable for continuous integration
    plugins: [
        'karma-phantomjs-launcher',
        // 'karma-chrome-launcher',
        // 'karma-firefox-launcher',
        // 'karma-safari-launcher',`
        'karma-jasmine',
        'karma-istanbul'
    ],
    istanbulReporter: {
      type : 'html',
      dir : 'coverage/',
      includeAllSources: true
    },
    //...
  });
};

module.exports = karmaConfig
