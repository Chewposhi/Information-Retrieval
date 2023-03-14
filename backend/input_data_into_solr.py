import pysolr

# Create a client instance. The timeout and authentication options are not required.
solr = pysolr.Solr('http://localhost:8983/solr/tech_products', always_commit=True, timeout=10)

# Note that auto_commit defaults to False for performance. You can set
# `auto_commit=True` to have commands always update the index immediately, make
# an update call with `commit=True`, or use Solr's `autoCommit` / `commitWithin`
# to have your data be committed following a particular policy.

# Do a health check.
solr.ping()

# Later, searching is easy. In the simple case, just a plain Lucene-style
# query is fine.
results = solr.search('samsung')

# The ``Results`` object stores total results found, by default the top
# ten most relevant results and any additional data like
# facets/highlighting/spelling/etc.
print("Saw {0} result(s).".format(len(results)))

# Just loop over it to access the results.
for result in results:
    print("The name is '{0}'.".format(result['name']))

# # Finally, you can delete either individual documents,
# solr.delete(id='doc_1')

# # also in batches...
# solr.delete(id=['doc_1', 'doc_2'])

# # ...or all documents.
# solr.delete(q='*:*')