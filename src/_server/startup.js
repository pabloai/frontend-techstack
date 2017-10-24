
function startup(fn, arr) {
    console.log(chalk.magenta('\nSetting up directory tree...'));
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

module.exports = startup;
