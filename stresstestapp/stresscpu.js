
module.exports = function (timeLoad) {
    let a=0;
    const starttime= Date.now();
    console.log("Start CPU load");
    while(1){
        a+= Math.sqrt(Math.random()*Math.random());
        if((Date.now()-starttime)>timeLoad){
            return;
        }
    }
}