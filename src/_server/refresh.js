
const VARS = require('../../package.json').vars,
	BUILD = path.join(__dirname, '..', '..', VARS.out),
    MAIN_CSS = path.join(BUILD, VARS.index + '.css'),
    MAIN_JS = path.join(BUILD, VARS.index + '.js');

function refresh(fn, fileArr) {
    jetpack.dirAsync(BUILD)
        .then((fileArr) => {
            if (fileArr === undefined) {
                fileArr = [MAIN_CSS, MAIN_JS];
            }
            for(let i = 0; i < fileArr.length; i++) {
                jetpack.fileAsync(fileArr[i]);
            }
        })
        .then(() => { return fn(); });
}

module.exports = refresh;
