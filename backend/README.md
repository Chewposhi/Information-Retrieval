# Solr as backend

## Getting started

1. Install Java on local machine
   1. run `java -version` on cmd prompt - if error message appears, it likely means that java is not installed
   2. if the java command is not found, download and install the latest version from [Oracle](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
2. Set [JAVA_HOME](https://confluence.atlassian.com/doc/setting-the-java_home-variable-in-windows-8895.html) environment variable to directory location of jre
3. Open cmd prompt in administrator mdoe and cd to solr-9.1.1 directory
4. run command `bin\solr.cmd start -p 8983` for windows machine
    - if required, kill process using process id `taskkill /PID <insert-pid> /F`

## If there is a need to set up the a new core:

### Create new core
1. Ensure an instance of solr is running
2. make a copy of stopwords_en_modified which can be located in `backend/solr-9.1.1/server/solr/films/conf/stopwords_en_modified.txt`
3. run cmd `bin\solr create_core -c films`
4. run configurations below in cmd prompt `curl -X POST -H "Content-type:application/json" --data-binary "{ 'add-field-type' : { 'name':'text_en_stopwords', 'class':'solr.TextField', 'positionIncrementGap':'100','analyzer' : {'tokenizer':{ 'class':'solr.StandardTokenizerFactory'},'filters':[{'class':'solr.LowerCaseFilterFactory'},{'class':'solr.StopFilterFactory','words':'stopwords_en_modified.txt'}]}}}" http://localhost:8983/solr/films/schema` - this adds a new field type for our use case
5. specify the fields to be added so that solr doesnt automatically assign the fields `curl -X POST -H "Content-type:application/json" --data-binary "{'add-field':{'name':'movie_Name','type':'text_general','stored':true,'indexed':true },'add-field':{'name':'movie_dis','type':'text_en_stopwords','stored':true,'indexed':true},'add-field':{'name':'movie_year','type':'text_general','stored':true,'indexed':true },'add-field':{'name':'movie_director_cast','type':'text_general','stored':true,'indexed':true },'add-field':{'name':'movie_tags','type':'text_general','stored':true,'indexed':true },'add-field':{'name':'movie_star','type':'text_general','stored':true,'indexed':true },'add-field':{'name':'movie_Id','type':'text_general','stored':true},'add-field':{'name':'movie_id','type':'text_general','stored':true},'add-field':{'name':'movie_Poster','type':'text_general','stored':true},'add-field':{'name':'movie_name','type':'text_general','stored':true,'indexed':true },'add-field':{'name':'movie_dis_keywords','type':'text_general','stored':true,'indexed':true}}" http://localhost:8983/solr/films/schema`
6. lastly, to conclude the solr configuration steps, run in cmd prompt `curl -X POST -H "Content-type:application/json" --data-binary "{'add-copy-field' : {'source':'*','dest':'_text_'}}" http://localhost:8983/solr/films/schema` - this will create a new copyfield that encompasses all the fields into \_text\_ which is the default query term

### Post files
1. Ensure core is created and configuration above has been done
2. run cmd `bin\post -c <core-name> <dir-to-file.xml/csv/json>` (Linux and Mac system)
3. run cmd `java -jar example/exampledocs/post.jar [-h]` h flag is for help (Windows system)
4. cmd that worked for me `java -jar -Dc=films -Dtype=application/json  example/exampledocs/post.jar ..\data\merged_with_keywords.json`
    - -Dc states the corename
    - -Dtype states type of file posted
    - note the relative directory used for data

## Get Request
1. http://localhost:8983/solr/films/select?q=* curl or wtv to query

## Additional Notes
### How does Lucene / Solr work?
### Writing to Index
- document and fields go thru analyser to a indexer and gets a directory
### Searching in Index
- translate textual expression into query parser into text fragment and query object
### Analyser
- Analysers handle the job of analysing text into tokens or keywords to be searched or indexed
- Analyser builds tokenstreams which analyse text and represents a policy for extracting index terms from text
reader-tokeniser-tokenfilter-tokenfilter...-token
### Querying
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