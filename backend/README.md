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
4. cmd that worked for me `java -jar -Dc=films -Dtype=application/json  example/exampledocs/post.jar ..\data\merged.json`
    - -Dc states the corename
    - -Dtype states type of file posted
    - note the relative directory used for data

## Get Request
1. http://localhost:8983/solr/films/select?q=* curl or wtv to query

## Edit Index before uploading documents to solr
`curl -X POST -H "Content-type:application/json" --data-binary "{\"add-copy-field\" : {\"source\":\"*\",\"dest\":\"_text_\"}}" http://localhost:8983/solr/films/schema`
`curl -X POST -H "Content-type:application/json" --data-binary "{'add-copy-field' : {'source':'*','dest':'_text_'}}" http://localhost:8983/solr/films/schema`
explanation: add copy field from * to \_text_ which is the default search field
both above works for windows machine but make sure to run it on commmand prompt, not powershell


# TO DO:
python script for posting file
Display score tgt with results
Indexing - variable types

Extra:
Edit stopwords