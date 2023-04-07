from textblob import TextBlob
from textblob import Word
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import sys
import nltk


nltk.download('averaged_perceptron_tagger')
nltk.download('punkt')

stop_words = set(stopwords.words('english'))

lemmatizer = WordNetLemmatizer()

def parse(desc):
    tokens = [w for (w, pos) in TextBlob(desc).pos_tags if (pos[0] == 'V' or pos[0] == 'N') ]
    lemm = []
    for token in tokens:
        if token not in stop_words:
            lemm.append(lemmatizer.lemmatize(token))
    lemm = (", ".join(lemm))
    return lemm

def main():
    # Use the loaded model to make predictions
    parsed = parse(str(sys.argv[1]))

    print(parsed)

if __name__ == "__main__":
    main()