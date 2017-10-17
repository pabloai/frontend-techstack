
const chalk = require('chalk');
function cmdExecErr(err, stdout, stderr) {
	if(stdout.trim() !== '') console.log(stdout);
	if(stderr.trim() !== '') console.error(chalk.red(stderr));
	if(err) throw chalk.red('Command Execution Error: ' + err);
}
module.exports = cmdExecErr;
