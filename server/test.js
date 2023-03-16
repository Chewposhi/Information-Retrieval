const SolrNode = require('solr-node');

var client = new SolrNode({
    host: '127.0.0.1',
    port: '8983',
    core: 'films',
    protocol: 'http'
  });


const nameQuery = {
    movie_name:"The Gangster, the Cop, the Devil"
};



const searchQuery = client.query()
.q(nameQuery)
.qop("OR")
.addParams({
        wt: 'json',
        indent: true
    })
 .start(1)
 .rows(5)

client.search(searchQuery, function (err, result) {
    if (err) {
        console.log(err);
        return;
    };

    const response = result.response;
    console.log(response);

    /*if (response && response.docs) {
        response.docs.forEach((doc) => {
          console.log(doc);
        })
      }*/
});