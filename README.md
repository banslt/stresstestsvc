# stresstestsvc

App that enables you to perform load simulation of CPU and memory load.

## INSTALL:
```
npm install
npm install -g forever
```
Get wrk2 from https://github.com/giltene/wrk2 

## USAGE:

### To run the service locally: 
```
forever start -c "node --expose-gc --max-old-space-size=8192" mainapp.js
```

### To launch a CPU load:
1. using curl :
```
curl [loadbalancerIP]:3100/work/[CPUtimeLoad]
```
2. using wrk2 :
```
wrk -t[number of threads] -c[number of connections] -d[testduration in seconds]s -R[number of requests per second] http://[loadbalancerIP]:3100/work/[CPUtimeLoad]
```
### To launch a Memory load:
1. using curl :
```
curl [loadbalancerIP]:3100/mem/[load amount (in MB)]
```
2. using wrk :
```
wrk -t[number of threads] -c[number of connections] -d[testduration in seconds]s -R[number of requests per second] http://[loadbalancerIP]:3100/mem/[load amount (in MB)]
```