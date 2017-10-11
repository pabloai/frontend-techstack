let t = Date.now(),
    uglyTransformer = {
        global: true,
        sourcemap: false,
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
    VARS = require('./dir-vars'),
    chalk = require('chalk'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    SOURCE = path.join(__dirname, '..', VARS.app),
    BUILD = path.join(__dirname, '..', '..', VARS.out),
    MAIN_CSS = path.join(BUILD, VARS.index + '.css'),
    MAIN_JS = path.join(BUILD, VARS.index + '.js');

function bundleExternal(cb) {
    // const ws = jetpack.createWriteStream(VENDOR_JS)
}

function clone(obj) {
    if (null === obj || 'object' !== typeof obj) return obj;
    let copy = obj.constructor();
    for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function buildJS(input, output, env) {
    let opts = {debug: false},
        ws = jetpack.createWriteStream(output);

    ws.on('close', () => {
        console.log(chalk.cyan(`JS saved to ${output}`));
    });

    if(env === 'dev') {
        opts.debug = true;
        browserify(opts)
            .add(input)
            .require('./src/app/config/dev-env', {expose: 'config'}) // ---> in order to include a minified file and refer to it by name ('expose' is name)
            .transform(babelify, {presets: ['es2015', 'react']})
            .bundle()
            .pipe(ws);
    } else {
        browserify(opts)
            .add(input)
            .require('./src/app/config/dev-env', {expose: 'config'}) // ---> in order to include a minified file and refer to it by name ('expose' is name)
            .transform(babelify, {presets: ['es2015', 'react']})
            .transform('uglyTransformer', 'uglifyify')
            .bundle()
            .pipe(ws);
    }
}

function js(env) {
    buildJS(path.join(SOURCE, VARS.js, VARS.index + '.js'), MAIN_JS, env);
}

function sassCompress(options) {
    node_sass.render(options, (err, index) => {
        if(err) throw chalk.red(err);
        postcss([ ap ]).process(index.css).then((result) => {
            result.warnings().forEach((warn) => {
                console.warn(chalk.yellow(warn.toString()));
            });

            fs.writeFile(path.join(BUILD, VARS.index + '.css'), result.css, (err) => {
                if(err) throw chalk.red(err)
                console.log(chalk.cyan('CSS saved to ' + path.join(BUILD, VARS.index + '.css')));
            })
        });
    });
}

function sass(env) {
    let options = {
        outFile: BUILD,
        outputStyle: 'compressed'
    };

    if (env === 'dev') {
        options.sourceMapEmbed = true;
        options.sourceMapContents = false;
    }

    options.file = path.join(SOURCE, VARS.style, VARS.index + '.scss');
    sassCompress(clone(options));
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

function refresh(fn, arr) {
    // jetpack.remove(BUILD);
    jetpack.dirAsync(BUILD).then(() => {
        let promArr = [];
        if(arr === undefined) {
            arr = [MAIN_CSS, MAIN_JS];
        }
        for (let i = 0; i < arr.length; i++) {
            Promise.all(promArr).then(values => {
                return fn();
            });
        }
    })
        .then(jetpack.dirAsync(path.join(BUILD), VARS.modules)) // for example if you wanted to refresh a directory
        .then(jetpack.fileAsync(MAIN_CSS, {content: ''}))
        .then(jetpack.fileAsync(MAIN_JS, {content: ''}))
        .then(() => {
            return fn();
        });
}

function refreshT() {
    t = Date.now();
    return t;
}

module.exports.buildJS = buildJS;
module.exports.js = js;
module.exports.pug = pug;
module.exports.refresh = refresh;
module.exports.refreshT = refreshT;
module.exports.sass = sass;
