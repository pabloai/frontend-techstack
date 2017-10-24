
function refresh(fn, fileArr) {
    jetpack.dirAsync(BUILD)
        .then((fileArr) => {
        	for(let i = 0; i < fileArr.length; i++) {
        		jetpack.fileAsync(fileArr[i]);
        	}
        })
        .then(() => { return fn(); });
}

module.exports = refresh;
