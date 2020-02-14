const child_process = require("child_process");

module.exports = function (sleepTime, stressTimeDuration) {
    let a=0;
    const starttime= Date.now();
    console.log("Start CPU load");
    while(1){
        a+= Math.sqrt(Math.random()*Math.random());
        child_process.execSync(`usleep ${sleepTime}`);
        if((Date.now()-starttime)/1000>stressTimeDuration){
            return;
        }
    }
}