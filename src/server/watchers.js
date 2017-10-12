const path = require('path'),
    chokidar = require('chokidar'),
    server = require('./dev-server'),
    pugWatchFiles = require('./watch-dirs').pugFileArr,
    jsWatchFiles = require('./watch-dirs').jsFileArr,
    sassWatchFiles = require('./watch-dirs').sassFileArr,
    build = require('./build'),
    // appBuilder = require('./build-app-dir'),
    chalk = require('chalk'),
    VARS = require('./dir-vars');

require('./static-build'); //build on start

pugWatchFiles().then(data => {
    pug(data);
});
jsWatchFiles().then(data => {
    js(data);
});
sassWatchFiles().then(data => {
 sass(data);
});
server();

function pug(arr) {
    createWatcher(arr, () => {
        build.refresh(() => {
            build.pug();
        });
    });
}

function js(arr) {
    createWatcher(arr, () => {
        build.refresh(() => {
            build.js('dev');
        });
    });
}

function sass(arr) {
    createWatcher(arr, () => {
        build.refresh(() => {
            build.sass('dev');
        });
    });
}

function createWatcher(src, fn) {
    chokidar.watch(src, {
        ignored: [
            path.join(__dirname + 'index-params.js'),
            path.normalize(path.join(__dirname, '..', '..', VARS.out))
        ],
        persistent: true
    })
        .on('add', path => {})
        .on('change', (path, err) => {
            console.log(chalk.cyan(`File ${path} has been changed`));
            if(err) throw chalk.red(err);
            fn();
        })
        .on('error', error => console.log(chalk.red(`Watcher error: ${error}`)))
        .on('raw', (event, path, details) => {
            //console.log('Raw event info:', event, path, details)
        });
}