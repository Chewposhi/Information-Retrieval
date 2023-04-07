# Information Retrieval Project
## What is our application about?
This is a movie recommendation website that has the following features
- Basic movie title query
- Fuzzy query with dynamic freedom
- Auto complete query
- Result filtering based on genre
- Result sorting
- More like this recommendation
- desc2movie, convert a user provided description to movie result
- Live sentiment analysis of movie reviews

## How to set up

### Componets of the system
- React.js frontend
- Node.js backend 
- Apache Solr database

### Steps to set up

#### 1. Install python
Download latest version of python

#### 2. Install Node.js
Download latest version of node.js from [https://nodejs.org/en/]

#### 3. Install JAVA
1. install Java on local machine
2. add java to your system path

#### 4. Obtain API from Rapid API
This step is required if you want to work with actual movie reviews getched from IMDB. If you fail this step, you can still work with dummy data, instruction is in next section, step 4. Go to Rapid API and sign up. search for IMDb API (https://rapidapi.com/apidojo/api/imdb8) and subsceibe to the free option. Obtain X-RapidAPI-Key from it and update the environment variable. Steps for updating environment variable is in the file `frontend/.env.example`

#### 5. Install Node.js dependencies in the frontend folder
1. cd into the `frontend` folder
2. run `npm install` to install neccessary packages from Node.js
3. if there is no error, move to the next step

#### 6. Install Node.js dependencies in the server folder
1. cd into the `server` folder
2. run `npm install` to install neccessary packages from Node.js
3. if there is no error, move to the next step

#### 7. Install python dependencies in the server folder
1. cd into the `server` folder
2. run `pip install -r requirements.txt` to install neccessary packages from python
3. if there is no error, move to the next step

## How to start the application

#### 1. Start the Solr server
1. run cmd in administrator mode
2. cd into the `\backend\solr-9.1.1\bin` directory, where `solr.cmd` file is present
3. run `solr start` in the above directory
4. it will take awhile for the server and the cores to fully load up
5. once the server is up, test out the server by going to the url `http://localhost:8983/solr/#/`

#### 2. Start the backend server
1. open a new terminal
2. cd into the `server` folder
3. run `npm run dev`
4. check the console for successful server start message

#### 3. Start the React server
1. open a new terminal
2. cd into the `frontend` folder
3. run `npm start`
4. a new window should start in your browser, if you see "please connect to solr server" message, it means solr server is not started 
5. otherwise, the application is up and running. Happy searching ;)

#### 4. [optional] Use dummy reviews in case of no rapid api, reviews will be fetched locally instead of from IMDB
1. open a new terminal
2. cd into the `frontend` folder
3. run `npx json-server --watch src/Data/db.json --port 8000`
4. check console for successful server start message
5. go to file `frontend/components/MovieDetails.js`
6. uncommnet line 65 to 72
7. comment out line 77 to 87

P.S. if you do the above step 4, the movie reviews and poster for every movie will be the same
