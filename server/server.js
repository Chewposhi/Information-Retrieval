const express = require('express');
const cors = require('cors');
const SolrNode = require('solr-node');
const app = express();

app.use(express.json());
app.use(cors());

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
    .rows(1)

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

app.get("/MoreLikeThis/:id", (req, res) => {

    const searchQuery = client.query()
    .q("{!mlt qf=movie_name mintf=1 mindf=7}"+req.params.id)
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

app.get("/AutoComplete/:searchText", (req, res) => {
    //localhost:8983/solr/films/suggest?suggest=true&suggest.build=true&suggest.dictionary=mySuggester&wt=json&suggest.q=Te
    //fetch("http://localhost:8983/solr/films/suggest?suggest=true&indent=true&suggest.build=true&suggest.dictionary=mySuggester&wt=json&suggest.q=Te");
    const Query = {
        "*":"*"
    };
    const searchQuery = client.query()
    .q("Te")
    .qop("OR")
    .addParams({
            wt: 'json',
            indent: true
        })
    .start(0)
    .rows(20)

    console.log(searchQuery)

    client._requestGet('suggest', searchQuery, function (err, result) {
        if (err) {
            console.log(err);
            return;
        };
        console.log(result)
        const response = result.suggest.mySuggester;
        console.log(response)
        res.json({"movies": response});

    });
});


app.listen(5000, () => {console.log(`server started on port 5000...`)});