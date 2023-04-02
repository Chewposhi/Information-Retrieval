const express = require('express');
const cors = require('cors');
const SolrNode = require('solr-node');
const app = express();

app.use(express.json());
app.use(cors());

const { spawn } = require('child_process');

var client = new SolrNode({
    host: '127.0.0.1',
    port: '8983',
    core: 'films',
    protocol: 'http',
    //rootPath: '/select'
});

app.get("/init", (req, res) => {

    const Query = {
        "*":"*"
    };

    const searchQuery = client.query()
    .q(Query)
    .qop("OR")
    .addParams({
            wt: 'json',
            indent: true
        })
    .start(0)
    .rows(30)

    client.search(searchQuery, function (err, result) {
        if (err) {
            console.log(err);
            return;
        };

        const response = result.response;
        res.json({"movies": response.docs});

    });
});

app.get("/movie/:id", (req, res) => {
    const Query = {
        "id":req.params.id
    };

    const searchQuery = client.query()
    .q(Query)
    .qop("OR")
    .addParams({
            wt: 'json',
            indent: true
        })
    .start(0)
    .rows(10)

    client.search(searchQuery, function (err, result) {
        if (err) {
            console.log(err);
            return;
        };

        const response = result.response;
        res.json({"movies": response.docs});

    });
});

app.get("/nameSearch/:q", (req, res) => {
    const filtered = req.params.q.replace(':','');
    const Query = {
        "movie_name":'"'+filtered+'"'
    };

    const searchQuery = client.query()
    .q(Query)
    .qop("OR")
    .addParams({
            wt: 'json',
            indent: true
        })
    .start(0)
    .rows(20)

    client.search(searchQuery, function (err, result) {
        if (err) {
            console.log(err);
            return;
        };

        const response = result.response;
        res.json({"movies": response.docs});

    });
});

app.get("/MoreLikeThisName/:id", (req, res) => {

    const searchQuery = client.query()
    .q("{!mlt qf=movie_name mintf=1 mindf=6}"+req.params.id)
    .qop("OR")
    .addParams({
            wt: 'json',
            indent: true
        })
    .start(0)
    .rows(5)

    client.search(searchQuery, function (err, result) {
        if (err) {
            console.log(err);
            return;
        };

        const response = result.response;
        res.json({"movies": response.docs});

    });
});

app.get("/MoreLikeThisCast/:id", (req, res) => {

    const searchQuery = client.query()
    .q("{!mlt qf=movie_director_cast mintf=1 mindf=7}"+req.params.id)
    .qop("OR")
    .addParams({
            wt: 'json',
            indent: true
        })
    .start(0)
    .rows(5)

    client.search(searchQuery, function (err, result) {
        if (err) {
            console.log(err);
            return;
        };

        const response = result.response;
        res.json({"movies": response.docs});

    });
});

app.get("/Fuzzy/:searchText", (req, res) => {
    //console.log(req.params.searchText);
    var inputArray = req.params.searchText.replace(':','');
    inputArray = inputArray.split(' ');
    for (let i = 0; i < inputArray.length; i++) {
        inputArray[i]="movie_name:"+inputArray[i]+"~3";
    };
    inputArray = inputArray.join(' AND ')
    //console.log(inputArray)

    const searchQuery = client.query()
    .q(inputArray)
    .qop("OR")
    .addParams({
            wt: 'json',
            indent: true
        })
    .start(0)
    .rows(30)

    client.search(searchQuery, function (err, result) {
        if (err) {
            console.log(err);
            return;
        };

        const response = result.response;
        res.json({"movies": response.docs});

    });
});

app.get("/AutoComplete/:searchText", (req, res) => {
    const searchQuery = client.query()
    .q(req.params.searchText)
    .qop("OR")
    .addParams({
            wt: 'json',
            indent: true
        })

    client._requestGet('suggest', searchQuery, function (err, result) {
        if (err) {
            console.log(err);
            return;
        };
        const response = result.suggest.mySuggester;
        res.json(response);

    });
});

app.get("/AnalyseSent/:review", (req, res) => {
    const review = "Some of you may remember back in the 90s there was a show called Mystery Science Theater 3000 (MST3k) where the crew of the Satellite of Love riffed on bad movies. As the seasons passed they started getting letters from film students offering to intentionally make bad movies for the crew to review since being made fun of on the show would actually boost their chances of making it in Hollywood. I get the impression that the people behind Sharknado were hoping to attract the attention of the MST3k crew who have moved on to doing Rifftrax. It's the only explanation that makes sense. This movie is so badly written, acted, directed, with such immensely bad not-so-special effects that it has to be on purpose.";
    const childPython = spawn('python', ['sentiment_analyse.py',review])
    childPython.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        const result = data.toString();
        res.json(result)
    })
});


app.listen(5000, () => {console.log(`server started on port 5000...`)});