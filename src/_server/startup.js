
function startup(fn, arr) {
    /*
     * - remove build
     * - ensure build dir and output files exist
     * - start server
     * - log metadata to console
     */
    console.log(chalk.bgMagenta('\nSetting up directory tree...'));
    if(arr === undefined) {
        arr = [MAIN_CSS, MAIN_JS];
    }
    console.log(chalk.magenta(`Confirmed output files exist. ${arr}`);
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
