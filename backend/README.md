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
4. cmd that worked for me `java -jar -Dc=films -Dtype=application/json  example/exampledocs/post.jar ..\data\merged_with_keywords.json`
    - -Dc states the corename
    - -Dtype states type of file posted
    - note the relative directory used for data

## Get Request
1. http://localhost:8983/solr/films/select?q=* curl or wtv to query

## Edit Index before uploading documents to solr
add relevant fields into solr after creating core, before uploading documents -> run script
add custom field changing the parsers for query and indexing
add copyfield
`curl -X POST -H "Content-type:application/json" --data-binary "{\"add-copy-field\" : {\"source\":\"*\",\"dest\":\"_text_\"}}" http://localhost:8983/solr/films/schema`
`curl -X POST -H "Content-type:application/json" --data-binary "{'add-copy-field' : {'source':'*','dest':'_text_'}}" http://localhost:8983/solr/films/schema`
explanation: add copy field from * to \_text_ which is the default search field
both above works for windows machine but make sure to run it on commmand prompt, not powershell


# TO DO:
python script for posting file (on hold)
Display score tgt with results -> simply add to query the score of the results
Indexing - variable types done
get ngram analyzer -> help with suggestions when 0 results were shown


Extra:
Edit stopwords

# How does Lucene / Solr work?
## Writing to Index
- document and fields go thru analyser to a indexer and gets a directory
## Searching in Index
- translate textual expression into query parser into text fragment and query object
## Analyser
- Analysers handle the job of analysing text into tokens or keywords to be searched or indexed
- Analyser builds tokenstreams which analyse text and represents a policy for extracting index terms from text
reader-tokeniser-tokenfilter-tokenfilter...-token
## Querying
- TermQuery
- TermRangeQuery
- NumericRangeQuery
- PrefixQuery
- EmbeddedQuery -> look at n-gram tokenizer
- PhraseQuery - setslop()
- QueryParser - detect the syntax and type of query to produce appropriate types implicitly

- when performing search, need to specify a field or use the default field
- specify phrases using inverted commas
- wildcard query are okay -> only for single terms not phrase query

## Clue 1:
- need to create own field type
    - able to define filters and tokenizer
    - reference [code/schema](https://lucidworks.com/post/auto-suggest-from-popular-queries-using-edgengrams/)