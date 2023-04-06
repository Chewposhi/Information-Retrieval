from textblob import TextBlob
from textblob import Word
from nltk.corpus import stopwords
import sys
stop_words = set(stopwords.words('english'))



def parse(desc):
    tokens = [w for (w, pos) in TextBlob(desc).pos_tags if (pos[0] == 'V' or pos[0] == 'N') ]
    lemm = []
    for token in tokens:
        if token not in stop_words:
            lemm.append(lemmatizer.lemmatize(token))
    
    return lemm

def main():
    # Use the loaded model to make predictions
    parsed = parse(str(sys.argv[1]))

    print(parsed)

if __name__ == "__main__":
    main()