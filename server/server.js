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
    protocol: 'http'
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
    const Query = {
        "movie_name":'"'+req.params.q+'"'
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
    .q("{!mlt qf=movie_name mintf=1 mindf=10}"+req.params.id)
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


app.listen(5000, () => {console.log(`server started on port 5000...`)});