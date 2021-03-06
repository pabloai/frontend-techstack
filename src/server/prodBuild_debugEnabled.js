let t = Date.now(),
    uglyTransformer = {
        global: true,
        sourceMap: false,
        mangle: true,
        compress: {
            booleans: true,
            conditionals: true,
            dead_code: true,
            drop_console: true,
            if_return: true,
            join_vars: true,
            sequences: true,
            unused: true
        }
    };

const CMD_EXEC_ERROR = require('./cmd-exec-err'),
    exec = require('child_process').exec,
    fs = require('fs'),
    jetpack = require('fs-jetpack'),
    path = require('path'),
    node_sass = require('node-sass'),
    ap = require('autoprefixer'),
    postcss = require('postcss'),
    VARS = require('../../package').vars,
    chalk = require('chalk'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    server = require('./dev-server'),
    pugWatchFiles = require('./watch-dirs').pugFileArr,
    jsWatchFiles = require('./watch-dirs').jsFileArr,
    sassWatchFiles = require('./watch-dirs').sassFileArr
    SOURCE = path.join(__dirname, '..', VARS.app),
    BUILD = path.join(__dirname, '..', '..', VARS.out),
    MAIN_CSS = path.join(BUILD, VARS.index + '.css'),
    MAIN_JS = path.join(BUILD, VARS.index + '.js'),
    VENDOR_JS = path.join(BUILD, VARS.vendor + '.js');

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

function bundleExternal(cb) {
    const ws = jetpack.createWriteStream(VENDOR_JS);
    ws.on('close', () => {
        console.log(chalk.cyan(`JS saved to ${VENDOR_JS}`));
        cb();
    });
    browserify({require: [
        // 'jquery' - you can use node_modules here
    ]})
        .require('./vendor/jquery-3.2.1.min.js')
        .bundle()
        .pipe(ws);
}

function clone(obj) {
    if (null === obj || 'object' !== typeof obj) return obj;
    let copy = obj.constructor();
    for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function buildJS(input, output) {
    let opts = {debug: true},
        ws = jetpack.createWriteStream(output);

    ws.on('close', () => {
        console.log(chalk.cyan(`JS saved to ${output}`));
    });
    browserify(opts)
        .add(input)
        .require('./src/app/config/prod-env', {expose: 'config'}) // ---> in order to include a minified file and refer to it by name ('expose' is name)
        .require('./build/vendor.js')
        .transform(babelify, {presets: ['env', 'react']})
        .transform(uglyTransformer, 'uglifyify')
        .bundle()
        .pipe(ws);
}

function js() {
    const lintCmd = 'npm run lint:js',
        testCmd = 'npm test';
    exec(lintCmd, (err, stdout, stderr) => {
        if (err) {
            CMD_EXEC_ERROR(err, stdout, stderr);
        } else buildJS(path.join(SOURCE, VARS.js, VARS.index + '.js'), MAIN_JS);
    })
}

function sassCompress(options) {
    node_sass.render(options, (err, index) => {
        if(err) throw chalk.red(err);
        postcss([ ap ]).process(index.css).then((result) => {
            result.warnings().forEach((warn) => {
                console.warn(chalk.yellow(warn.toString()));
            });

            fs.writeFile(path.join(BUILD, VARS.index + '.css'), result.css, (err) => {
                if(err) throw chalk.red(err);
                console.log(chalk.cyan('CSS saved to ' + path.join(BUILD, VARS.index + '.css')));
            })
        });
    });
}

function sass() {
    const cmd = 'npm run lint:style';
    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            CMD_EXEC_ERROR(err, stdout, stderr);
        } else {
            let options = {
                outFile: BUILD,
                outputStyle: 'compressed',
                sourceMapEmbed: true,
                sourceMapContents: false,
                file: path.join(SOURCE, VARS.style, VARS.index + '.scss')
            };
            sassCompress(clone(options));
        }
    });
}

function pug() {
    jetpack.findAsync(path.join(SOURCE, VARS.templates), {
        matching: ['*.pug']
    }).then(data => {
        const cmd = 'pug -s ' + data.join(' ') + ' -o ' + BUILD;
        exec(cmd, CMD_EXEC_ERROR);
        console.log(chalk.cyan('HTML recompiled'));
    });
}

function startup(fn, arr) {
    console.log(chalk.magenta('Setting up directory tree...'));
    if(arr === undefined) {
        arr = [MAIN_CSS, MAIN_JS];
    }
    console.log(arr);
    jetpack.remove(BUILD);
    jetpack.dirAsync(BUILD).then(function() {
        let promArr = [];
        for (let i = 0; i < arr.length; i++) {
            promArr.push(jetpack.fileAsync(arr[i]));
        }
        Promise.all(promArr).then(values => {
            return fn();
        });
    });
}

function refresh(fn) {
    jetpack.dirAsync(BUILD)
        // .then(jetpack.dirAsync(path.join(BUILD), VARS.modules)) // for example if you wanted to refresh a directory
        .then(jetpack.fileAsync(MAIN_CSS))
        .then(jetpack.fileAsync(MAIN_JS))
        .then(() => { return fn(); });
}

function refreshT() {
    t = Date.now();
    return t;
}
