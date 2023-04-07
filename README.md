# Information Retrieval Project
## What is out system about?
This is a movie recommendation website that has the following features
- Basic movie title query
- Fuzzy query with dynamic freedom
- Auto complete query
- Result filtering based on genre
- Result sorting
- More like this recommendation
- desc2movie, comvert a user provided description to movie result

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
- research on how to correct spelling (look into solr functions first) secondary

### to do (po) -> 
- UI for crawling and incremental indexing of new data
- ranking of result
- sort result
- possible: movie comparison
- implement fuzzy search



### classification
reviews -> positive or negative
classification -> just append new columnn
2 csvs -> 1 for before classification 1 after classification

multifaceted search -> filter
visualisation for ui -> word cloud
