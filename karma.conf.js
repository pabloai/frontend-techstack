// karma.conf.js
function karmaConfig(config) {
  config.set({
    basePath: 'spec/',
    files: [
        '../src/app/js/**/*.js',
        '../src/app/js/*.js',
        '*.spec.js'
    ],
    frameworks: ['browserify', 'jasmine'],
    autoWatch: false, // enable for hot reload
    logLevel: 'debug',
    reporters: ['dots', 'progress', 'coverage'],
    singleRun: true, // enable for continuous integration
    plugins: [
        'karma-phantomjs-launcher',
        // 'karma-chrome-launcher',
        // 'karma-firefox-launcher',
        // 'karma-safari-launcher',`
        'karma-browserify',
        'karma-jasmine',
        'karma-istanbul',
        'karma-coverage'
    ],
    preprocessors: {
        '../src/app/js/**/*.js': 'browserify',
        '../src/app/js/*.js': 'browserify',
        '*.spec.js': 'browserify'
    },
    browsers: ['PhantomJS'],
    browserify: {
        debug: true,
        sourceMaps: true,
        configure: function(bundle) {
            bundle.on('prebundle', function() {
                bundle.transform(['babelify', {presets: ['env', 'react']}]);
            });
        }
    },
    coverageReporter: {
        check: {
            each: {
                statements: 100,
                branches: 100,
                functions: 100,
                lines: 100,
            },
            excludes: ['../vendor', '*.spec.js']
        },
        watermarks: {
            statements: [50, 75],
            functions: [50, 75],
            branches: [50, 75],
            lines: [50, 75]
        },
        type: 'lcov',
        dir: '../build/coverage'
    }
    //...
  });
};

module.exports = karmaConfig
