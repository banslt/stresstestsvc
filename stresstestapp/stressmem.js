
function alloc (size) {
    const numbers = size / 8;
    const arr = []
    arr.length = numbers;
    for (let i = 0; i < numbers; i++) {
        arr[i] = i;
    }
    return arr;
};


module.exports = function (loadAmount) {
    // keep allocs referenced to prevent garbage collector action
    const allocations = {};
    allocations.stack=[]
    console.log("Start memory load");
    const field = 'heapUsed';
    const mem = process.memoryUsage();
    console.log(mem);
    const gbStart = mem[field] / 1024 / 1024; // Convert to Mo
    console.log(`Start ${Math.round(gbStart * 1000) / 100} Mo`);

    allocStep = loadAmount*1024*1024;

    while (1) {
        let allocation = alloc(allocStep);
        allocations.stack.push(allocation); // keep allocs referenced to prevent garbage collector action

        // Check how memory is now allocated.
        const mem = process.memoryUsage();
        const mbNow = mem[field] / 1024 / 1024;
        currentLoad=Math.round((mbNow - gbStart) * 1000) / 1000;
        console.log(`Allocated since start ${currentLoad} Mo`);
        allocations.stack=[];
        allocation=0;
        global.gc(); // force garbage collector to immediately free memory
        return;
    }
};
