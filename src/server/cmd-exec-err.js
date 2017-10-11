
const chalk = require('chalk');
function cmdExecErr(err, stdout, stderr) {
	if(err) console.error(chalk.red('Command Execution Error: ' + err));
	if(stdout.trim() !== '') console.log(stdout);
	if(stderr.trim() !== '') console.error(chalk.red(stderr));
}
module.exports = cmdExecErr;
