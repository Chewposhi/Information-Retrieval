import pickle
from sklearn.feature_extraction.text import CountVectorizer
import sys

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

def main():
    # Use the loaded model to make predictions
    test_review = convert2count_vec(str(sys.argv[1]))

    predictions = clf_loaded.predict(test_review)
    print(predictions)

if __name__ == "__main__":
    main()
