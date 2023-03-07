# Information Retrieval
Movie Recommendation website
Search based on keywords -> description, title 
Classification on reviews taken from imdb api 

Search/Home page
- displays some movies tiles
- search bar

Movie page
-> poster
-> description and details
-> good or bad (classification)

## Webpage
### functional requirements
- have search function -> backend
- integrate solr with react -> useState from react -> solr should be able to access it OR find a connector that works with react (see [algolia](https://blog.openreplay.com/full-text-search-in-react-with-algolia-and-firestore/))
- display movies upon search -> frontend backend
- UI for crawling (separate tab)
    - specify the parameters (attributes such as genre, release dates)
    - dropdown or input box

### non functional
- predictive text as we type
- home page display set of movies (dynamic or statically determined)

### to do (ben) -> 
- working solr with crawled data
- research on how to correct spelling (look into solr functions first) secondary

### to do (po) -> 
- connect frontend to solr
- test search

- flowchart for the program flow

### classification
reviews -> positive or negative
classification -> just append new columnn
2 csvs -> 1 for before classification 1 after classification