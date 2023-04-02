import pickle
from sklearn.feature_extraction.text import CountVectorizer

# Load the saved model from a file

with open('my_model.pkl', 'rb') as file:
    clf_loaded = pickle.load(file)

# Load the vocabulary and ngram range from a file
with open('count_vec.pkl', 'rb') as file:
    vocabulary, ngram_range = pickle.load(file)

# Initialize a new CountVectorizer with the saved vocabulary and ngram range
new_count_vec = CountVectorizer(vocabulary=vocabulary, ngram_range=ngram_range)

def convert2count_vec(review):
    test_review = new_count_vec.transform([review])
    return test_review

# Use the loaded model to make predictions
test_review = convert2count_vec("Some of you may remember back in the 90s there was a show called Mystery Science Theater 3000 (MST3k) where the crew of the Satellite of Love riffed on bad movies. As the seasons passed they started getting letters from film students offering to intentionally make bad movies for the crew to review since being made fun of on the show would actually boost their chances of making it in Hollywood. I get the impression that the people behind Sharknado were hoping to attract the attention of the MST3k crew who have moved on to doing Rifftrax. It's the only explanation that makes sense. This movie is so badly written, acted, directed, with such immensely bad not-so-special effects that it has to be on purpose.")

predictions = clf_loaded.predict(test_review)
print(predictions)