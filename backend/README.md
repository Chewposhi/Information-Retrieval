# Solr as backend

1. start solr server
2. input data using python script

## Getting started

1. Install Java on local machine
2. Set JAVA_HOME environment variable to directory location of jre
3. Open cmd prompt in administrator mdoe and cd to solr-9.1.1 directory
4. run command `bin\solr.cmd start -p 8983` for windows machine
    - if required, kill process using process id `taskkill /PID <insert-pid> /F`

features
- ranked -> can use solr's inbuilt ranking system
- query preprocessing

