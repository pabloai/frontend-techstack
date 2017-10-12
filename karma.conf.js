// karma.conf.js
function karmaConfig(config) {
  config.set({
    basePath: 'src/app/js/',
    files: ['**/*.js', '!vendor/*.js'],
    frameworks: ['jasmine'],
    browsers: ['Chrome', 'Firefox', 'Safari'],
    autoWatch: false, // enable for hot reload
    // logLevel: 'debug',
    reporters: ['progress', 'coverage'],
    singleRun: false, // enable for continuous integration
    plugins: [
    	'karma-coverage',
    	'karma-istanbul',
    	'karma-jasmine',
    	'karma-chrome-launcher',
    	'karma-firefox-launcher',
    	'karma-safari-launcher'
    ],
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'src/app/js/**/*.js': ['coverage']
    },
    coverageReporter: {
      dir : 'coverage/',
      reporters: [
        // reporters not supporting the `file` property 
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' }
        // reporters supporting the `file` property, use `subdir` to directly 
        // output them in the `dir` directory 
        // { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
        // { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
        // { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
        // { type: 'text', subdir: '.', file: 'text.txt' },
        // { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
      ]
    }
    //...
  });
};

module.exports = karmaConfig
