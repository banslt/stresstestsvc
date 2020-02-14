const child_process = require("child_process");

module.exports = function (sleepDuration) {
    child_process.execSync(`usleep ${sleepDuration*1000}`);   
    return;
}
