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


## Create new core
1. Ensure that getting started is done first
2. run cmd `bin\solr create_core -c <core-name>`

## Post files
1. Ensure core is created
2. run cmd `bin\post -c <core-name> <dir-to-file.xml/csv/json>` (Linux and Mac system)
3. run cmd `java -jar example/exampledocs/post.jar [-h]` h flag is for help (Windows system)
4. cmd that worked for me `java -jar -Dc=films -Dtype=application/json  example/exampledocs/post.jar ..\data\15k_Movie_Info.json`
    - -Dc states the corename
    - -Dtype states type of file posted
    - note the relative directory used for data

## Get Request
1. http://localhost:8983/solr/films/select?q=* curl or wtv to query


# TO DO:
python script for posting file
Display score tgt with results
Indexing - variable types

Extra:
Edit stopwords