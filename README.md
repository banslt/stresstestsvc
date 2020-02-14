# stresstestsvc

App that enables you to perform load simulation of CPU and memory load.

## INSTALL:
```
npm install
npm install -g forever
```

## USAGE:

### To run the service locally: 
```
forever start -c "node --expose-gc --max-old-space-size=8192" mainapp.js
```

### To launch a CPU load:
using curl :
```
curl [loadbalancerIP]:3100/[CPUtimeRest]/[StressTimeDuration]
```
### To launch a Memory load:
using curl :
```
curl [loadbalancerIP]:3100/[MemoryTarget (in GB)]/[AllocationStep (in MB)]/[MinimalStressTimeDuration]
```
