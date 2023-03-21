import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Review from './Review';
import Scroll from './Scroll';
import ReviewList from './ReviewsList';
import '../Styles/review.css';
const MovieDetails = () => {
    const {id} = useParams();
    const [details, setDetails] = useState([{}]);
    const [reviews, setReviews] = useState(null);
    const [reviewsloaded, setReviewsloaded] = useState(false);
    const [poster, setPoster] = useState(null);
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'dbe439b5fbmsh9e034485ec08f21p19ca13jsn40de937bb717',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      }
    };

    useEffect(() => {
      // fetch detials from solr
      fetch(`http://localhost:5000/movie/${id}`).then(
        response => response.json()
      ).then(
        data => {
          setDetails(data["movies"])
        }
      );

      // fetch reviews from imdb
      /*fetch('https://imdb8.p.rapidapi.com/title/get-user-reviews?tconst=tt0944947', options)
      .then(response => response.json())
      .then(response => setReviews(response))
      .catch(err => console.error(err));*/

      // fetching test data from json server
      fetch("http://localhost:8000/reviews")
      .then(response => response.json())
      .then(response => {
        setReviews(response);
        setPoster(true);
        setReviewsloaded(true);

      }
      );
      
    }, []);

    /*setReviews({
      "@type": "imdb.api.userreviews.userreviewsfortitle",
      "base": {
        "id": "/title/tt0944947/",
        "image": {
          "height": 1500,
          "id": "/title/tt0944947/images/rm4204167425",
          "url": "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg",
          "width": 1102
        },
        "title": "Game of Thrones",
        "titleType": "tvSeries",
        "year": 2011
      },
      "paginationKey": "g4xofermtiqhejcxxxgs753i36t52q343yod77piale6qpzryiv4lxwxttnwkctjvloetvxr",
      "reviews": [
        {
          "author": {
            "displayName": "TheLittleSongbird",
            "userId": "/user/ur20552756/"
          },
          "authorRating": 10,
          "helpfulnessScore": 0.7758123924188439,
          "id": "/title/tt0944947/userreviews/rw3853874",
          "interestingVotes": {
            "down": 29,
            "up": 149
          },
          "languageCode": "eng",
          "reviewText": "Was over-time on a gradual binge of watching 'Game of Thrones' from the first episode (gradual because of being so busy), having heard nothing but amazing things about it from friends, family and IMDb reviewers. Plus with such a great cast of talent and a brilliant book series, how could it possibly go wrong? \n\nThe good news is that 'Game of Thrones' didn't go wrong. Quite the opposite. Not only is it a rare television show that does its original source material justice and treats it with respect but it is on its own merits one of the finest, most addictive and consistently compelling shows in recent years. A television show so brilliant that one has to actually check that it was made for television when everything is done to such a high level that it puts many films made today to shame. This is one of the strongest examples of an acclaimed show that deserves every ounce of the praise it's garnered.\n\nVisually, 'Game of Thrones' looks amazing. The scenery is throughout spectacular, the sets are hugely atmospheric and beautiful on the eyes with a real meticulous eye for detail and the costumes suit the characters to a tee. Then there are the special effects that are some of the best of any television programme and are not overused or abused, the scale, the detail and how they actually have character and soul are better than those in a lot of the big-budget blockbusters. As well the cinematography and editing, which are cinematic quality as well.\n\nOne cannot talk about 'Game of Thrones' without mentioning the thematically, orchestrally and atmospherically multi-layered music scoring and the unforgettable main theme. Again, worthy of a high-budget fantasy/action/drama film.\n\nIt is hard not to be bowled over by the quality of the writing, outstanding isn't a strong enough adjective to describe how good the writing is. It always has a natural flow, is layered and thought-provoking and demonstrates a wide range of emotions such as suspenseful tension, poignant pathos and witty humour. The story-lines are paced so beautifully, structured with such nuance and attention to coherence, a high emotional level and touch upon complex and sensitive themes with intelligence and tact.\n\nWhenever there's a set-piece or more action-oriented scene there's always a reason, never there for the sake of it. Not only are the set-pieces done with a lot epic scale, superb staging, excitement and dramatic tension but underneath all the scale and flashy attention to detail there is a lot of heart and a multi-layered one. They're not overlong, nor are there out of place elements.\n\nCharacters are a huge part of the appeal too. 'Game of Thrones' has characters that are so well developed and as close to real life as one can get despite being in a fantasy world. These characters are not hero and villain archetypes (Joffrey is the only one close to that, the difference though is that he is an extremely interesting one with a lot of development who ranks well beyond one hundred percent on the threat level scale), they have much more to them and have strengths and flaws. Decisions are logical and one doesn't like any character any less when a decision is not the right one because mistakes are acknowledged and learnt from.\n\n'Game of Thrones' cast is full of talented names and, thanks to so well rounded characters and such great writing, nothing but the very best is gotten out of them. Even those who are not favourites of mine. Big acting standouts are Peter Dinklage, Sean Bean, Lena Headey and Jack Gleeson (Joffrey being the king of all young characters with not a redeeming bone in their body).\n\nIn conclusion, absolutely outstanding and a rare television show worthy of being a cinematic modern classic. This review may sound superlatively hyperbolic, but to me 'Game of Thrones' is that good. 10/10 Bethany Cox",
          "reviewTitle": "This is a television show?",
          "spoiler": false,
          "submissionDate": "2017-11-09",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "Leofwine_draca",
            "userId": "/user/ur0482513/"
          },
          "authorRating": 10,
          "helpfulnessScore": 0.5077021651726835,
          "id": "/title/tt0944947/userreviews/rw2602788",
          "interestingVotes": {
            "down": 47,
            "up": 70
          },
          "languageCode": "eng",
          "reviewText": "Season One\n\nAn outstanding television drama that helps set a new benchmark in terms of quality. The complex storyline involves the battle for supremacy between various political factions who dominate a worldscape that's as involved and complex as anything Tolkien could muster up. Each episode is riven with treachery, backstabbing, allegiances, betrayals, friendships and battle.\n\nThere are 10 episodes in this first season and every one's a stunner, perfectly paced with a mix of exposition and action. The scripts are intelligent and insightful; each writer knows that it's the characters who make or break a show, and every single one of them is interesting and engaging. Despite the huge cast, it's easy to become familiar with the main players. It's hard to single out any actor for praise: Sean Bean, Lena Headey, Mark Addy, Maisie Williams, Emilia Clarke, Aiden Gillen, Iain Glen; none of them put a foot wrong, they each inhabit their role with so much depth that you forget about the actor and focus on the character instead. Peter Dinklage is perhaps the luckiest, capturing a truly scene-stealing character with wit and warmth.\n\nSeason Two\n\nIt's impossible to say too much about the many twists, surprises and genuine shocks in the show without spoiling it, but overall GAME OF THRONES remains a realistic, harrowing and exceptionally involving piece of television. A complex tableau of characters is woven and yet despite the complexity of geography, politics, allegiances and history, the viewer is never left confused, not even for a second. Season 2 ups the ante with even more explicit sex and a key climactic battle sequence that wouldn't be out of place in the likes of LORD OF THE RINGS. Despite these cinematic elements, however, the focus remains on intricate characterisation and that's what holds this show together, no matter how many truly fantastic elements are thrown into the mix.\n\nSeason Three\n\nSeason 3 offers more of the same, with some particularly vicious torture sequences and lots more twists and turns as the plot develops. And while it's hard to pick out a season that's superior to the others, I can safely say that, when it comes, the Red Wedding is undoubtedly the highlight of the show so far; a stunning, unforgettable set-piece that never lets you go. Strong stuff indeed, just as I'd expect from what is the best thing on television at the moment.\n\nSeason Four\n\nThings remain on a high-quality level with Season 4 of the show, which I think is an improvement on the previous season (as good as it was). There's no long-winded journey here with characters meeting their inevitable fate in episode 9 as there was in Season 3; instead it all feels fresh and inventive, and all of the major story lines are packed with peril and incident. Neil Marshall's epic battle in episode 9 is the highlight, but Peter Dinklage contributes some excellent acting and Rory McCann has never been better as the Hound. By all accounts this is the last season to stick closely to the plot of the Martin novels, so I can't wait to see where Season 5 goes.\n\nSeason Five\n\nSeason 5 sees the show no longer at the top of its game but it still packs a wallop as a prime piece of TV and it nevertheless knocks spots off the competition. I'd probably give this a 9/10 purely because some of the scripted lines are weak, there's a greater reliance on extraneous sex and nudity than in the previous couple of seasons, and some of the characters could have been written better. It's nonetheless as rousing as ever, with some great twists, some truly shocking character deaths, and stunning production values. The first seven episodes build up to an electric trio at the climax, with the episode 'Hardhome' containing the best set-piece of the entire series so far.\n\nSeason Six\n\nSeason 6 picks up from the previous season to provide a better quality viewing experience all round. Gone are most of the extraneous story lines, with only a handful of dumb humour scenes left in. Things feel more vital here, more important than ever, and more dangerous. I particularly liked the way that the writers go out of their way to re-introduce old characters and tie up loose ends which they do very well. As before, things build to an incredible last couple of episodes, and as ever I'm left eagerly awaiting the next series.\n\nSeason Seven\n\nThis penultimate season of the show is very much in end-game territory. There are only 7 episodes and they move incredibly fast, so that characters appear to be teleporting all over the world given the speed of their travel. There are less characters now so those that remain have to do more, while the spectacular, dragon-oriented action is better than ever before, with the stand-out episodes being four and six in that respect. The north-of-the-wall material is quite incredible, in fact, and harks back to the highs of HARDHOME. The rest is expensive, expansive, and thoroughly engaging, as ever.\n\nSeason Eight\n\nAs for the final season, well, it gets a lot of flak here on the Internet...but I loved it. Six short episodes, the first couple of which are strong in terms of scene setting. The third episode is the big siege, a little dark and death-free for my liking, but otherwise up there with other fantastic siege stories done right on screen such as THE TWO TOWERS. The fourth episode is the weakest with some excruciating moments, but the fifth might well be the best episode of all, filled with heightened drama and terrific on-screen destruction. The final episode is weaker and ends with some excruciating happy-ever-after material, but the criticisms I have aren't enough to detract from a more than satisfying end to the show.",
          "reviewTitle": "TV par excellence",
          "spoiler": true,
          "submissionDate": "2012-04-27",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "SnoopyStyle",
            "userId": "/user/ur2898520/"
          },
          "authorRating": 9,
          "helpfulnessScore": 0.39829120775240423,
          "id": "/title/tt0944947/userreviews/rw4874158",
          "interestingVotes": {
            "down": 18,
            "up": 22
          },
          "languageCode": "eng",
          "reviewText": "In the fictional Seven Kingdoms of Westeros, the ruler sits on the Iron Throne. It's a story of various characters fighting to gain the throne, influence the throne, or survive the throne. There are White Walkers, giants, dragons, and a big ice wall.\n\nThis follows the George R. R. Martin series of fantasy novels, at least for the earlier seasons. This HBO show lasted 8 seasons, 6 of which are the pinnacle of prestige TV. In our fragmented TV world, this may be the last of the watercooler shows. People are eager to watch it on its first airing and eager to discuss it with their friends right away. People binge to catch up so they can join the conversation. The writing is great. The production is cinematic. No spoilers in this review. Just binge and enjoy.",
          "reviewTitle": "watercooler",
          "spoiler": false,
          "submissionDate": "2019-05-20",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "Hitchcoc",
            "userId": "/user/ur0278527/"
          },
          "authorRating": 10,
          "helpfulnessScore": 0.5251624177484453,
          "id": "/title/tt0944947/userreviews/rw4025216",
          "interestingVotes": {
            "down": 14,
            "up": 29
          },
          "languageCode": "eng",
          "reviewText": "I am writing this because according to the IMDB User Ratings, I have not commented. I have reviewed all the individual episodes, but not the show as a whole. There is little that I can add to the impact of this show. I am proud to be on the same planet as those who created and put this work into fruition. When one looks at the technical accomplishments and the multiple plot strains that have been kept in balance, it is truly a wonder. I know that there are those who can never get past the \"book did this\" and \"the book did that.\" We have to come to realize that it is impossible to recreate every nuance that fiction allows and that occasionally characters must be dropped and events assumed. For me, I have approached these as the artistic creations they are--as film (and television, at that). I have the books. I've not read them but plan to at some point. I doubt at this late stage of my life there will ever be another series to match this. I like fantasy but am not ruled by it as a genre. But this is for us all. If you've not seen it, treat yourself.",
          "reviewTitle": "A Need Fulfilled",
          "spoiler": false,
          "submissionDate": "2018-01-06",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "Kirpianuscus",
            "userId": "/user/ur61197531/"
          },
          "helpfulnessScore": 0.2243696909108378,
          "id": "/title/tt0944947/userreviews/rw4781554",
          "interestingVotes": {
            "down": 33,
            "up": 17
          },
          "languageCode": "eng",
          "reviewText": "I am not one of its fans. For its childish stories, for the feeling after a season biging. But its virtues are many. And real. From performances of great actors to magnificent use of CGI. For the portraits and for something who you feel authentic and slice of near reality. For the tension and for high care to details. For music and for the mark of HBO. For the sides of cruelty and references to mythologies and Medieval history. For a sort of genius to reflect contemporary realities. And, especially, for the touching portraits of kindness, duty spirit and sacrifice. For me, it is not a film of a story but the film of its characters. And lovely actors. A parable - serie.\n\nYes, I am not its fan. But I admitt - a am dependent by it. First, for the inspiration to use old great actors , from Diana Rigg to Max von Sydow. And, sure, for the great performances of young actors, from Emilia Clarke to Maisie Williams. The great virtue of serie - to remind the taste of classic fairy tales. And the charme, so seductive charme of them.",
          "reviewTitle": "I am not its fan...",
          "spoiler": false,
          "submissionDate": "2019-04-14",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "Kirpianuscus",
            "userId": "/user/ur61197531/"
          },
          "helpfulnessScore": 0.5353003783492037,
          "id": "/title/tt0944947/userreviews/rw4888623",
          "interestingVotes": {
            "down": 6,
            "up": 17
          },
          "languageCode": "eng",
          "reviewText": "After its end, expecting the prequel, the things are more clear. It is a great show. Not only for the status of adaptation but for the science to be answer to many other adaptation. It is a serie of characters and their stories , more than the serie of a story itself. It is a modern fairy tale - the values and sins and failures and virtues are the same. It is a perfect trip guide across history lessons and the near every day reality. It is the perfect door to a fantastic - realistic universe. And, sure, it is GoT. Not The Lord of The Rings, not Lost, not The Tudors or Spartacus. Just and only GooT. The last season reminds this basic truth. Dragons and cruel revenge ( many from us are expressions of frustrations and drawings of wrath), old sandals and swords in new version, sex and battles and traitors, and a drop of relation Luke and Anakin Skywalker. And the end, the so infamous end for many from us, it is real perfect. For a simple reason- it is the fair eulogy of memory of humankind and the right gift to the small details defining us behind appearences. It remains, for me, more than a show, an adventure. Eight seasons. Long months expecting the next season. Impressed by cruelty, in naked expressions, by courage and generosity and loyalty. By few splendid characters. By powerful scenes as the deaths of Hodor or Tommen Baratheon. Shocked by the execution of Nedd Stark, ball of feelings behind Red Wedding. Feeling the radical transformation of Daenerys , episode by episode, admiring the battle of Winterfel, being impressed by the hard, almost crazy work of entire team. And admiring great actors doing , in impecable manner, theirs job. So, the final taste is marked by profound gratitude.Including Daniel Banioff and D. B. Weiss.",
          "reviewTitle": "the final taste",
          "spoiler": false,
          "submissionDate": "2019-05-26",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "kosmasp",
            "userId": "/user/ur5876717/"
          },
          "authorRating": 9,
          "helpfulnessScore": 0.5273825141914176,
          "id": "/title/tt0944947/userreviews/rw5374696",
          "interestingVotes": {
            "down": 4,
            "up": 13
          },
          "languageCode": "eng",
          "reviewText": "So I succesfully avoided major spoilers about the show and could binge watch this since the complete Box set came out in early December. The first season was a bit overwhelming, what with all the houses and characters thrown at you. As you may be able to tell, I have not read the source material. Not sure who of the cast had read it beforehand either. So bare that in mind.\n\nNow the line Winter is coming is something everyone associates with the show, I just never expected this to come up so early in the show. What is surprising, at least during the first seasons of the show, is how many supposedly main characters fail to survive. This keeps the viewers on their tows. Towards the end of the show this gets a bit watered down. Not sure how much influence the original author had there (he had only written material for the first 6 seasons of the show, the rest was made up).\n\nHaving said that, you can feel a drop in quality. And while I have friend who thought the second season was boring (it's a bit of a travelling show and things get stretched quite a bit), if he continued to watch, he might feel even worse with the last seasons. Even though they are shorter (episode wise, not time wise per episode), they feel stretched even more.\n\nAlso the conclusion (no worries, I'm not telling) is anticlimatic to say the least. It feels bad and the continuity errors are just thrown aside. So if not for the epic battles and the actors, who are all really amazing in this, I might have gone farther down with my vote. Then again, if it wasn't for the last season specifically, I might have given it a 10 too ... A prequel show has been axed for now (not sure if the bad reviews and or numbers for the last season played a role), but I would watch it. This achieved overall something that \"The Reign\" could not: combine violence, fantasy and nudity into something mature/adult that works for men and women watching",
          "reviewTitle": "A long time coming",
          "spoiler": false,
          "submissionDate": "2020-01-02",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "classicsoncall",
            "userId": "/user/ur2707735/"
          },
          "authorRating": 10,
          "helpfulnessScore": 0.5973774058806445,
          "id": "/title/tt0944947/userreviews/rw7340340",
          "interestingVotes": {
            "down": 13,
            "up": 36
          },
          "languageCode": "eng",
          "reviewText": "With over five thousand reviews already posted here for \"Game of Thrones\", there's really nothing I think I could add to indicate what an epic, kingdom spanning series this turned out to be. As is often the case, I'm late to the party for this program, but on the flip side, I was able to watch the entire series relatively uninterrupted over a span of a few weeks. The story telling and characters are spell binding, with twists that sometimes come out of nowhere that leave you gasping. Not even the principals are immune, leading characters are often discarded just as you were beginning to relate to them, and often in a manner that's nasty and bloody. For a series this massive in scope, it would be hard to pick out a favorite character; up until the last season mine would have been Daenerys Targaryen Stormborn (Emilia Clarke), with Tyrion Lannister (Peter Dinklage) a pretty close second. I think the reason so many folks were dismayed by the eighth and final season was because it ended by going against the grain of most viewers' expectation that Jon Snow (Kit Harington) would emerge as the King of the Seven Kingdoms, or at least a co-ruler with Daenerys. My own feeling gravitated toward Brandon the Broken (Isaac Hempstead Wright) around the time he became the Three Eyed Raven. If you haven't seen this series yet, you might be intrigued enough to catch it after learning what Cersei Lannister (Leana Heady) stated to Ned Stark (Sean Bean) in Episode #1.7 - \"When you play the game of thrones, you win, or you die.\"",
          "reviewTitle": "\"There's nothing more powerful in the world than a good story.\" - Tyrion Lannister, Episode #8.6",
          "spoiler": true,
          "submissionDate": "2021-09-13",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "lee_eisenberg",
            "userId": "/user/ur4888011/"
          },
          "authorRating": 8,
          "helpfulnessScore": 0.2455954988203936,
          "id": "/title/tt0944947/userreviews/rw3216459",
          "interestingVotes": {
            "down": 10,
            "up": 8
          },
          "languageCode": "eng",
          "reviewText": "I understand that George R. R. Martin based \"A Song of Ice and Fire\" on various and sundry wars and conquests throughout Europe's history. Indeed, the characters on \"Game of Thrones\" seem to have no aim except to fight for control of Westeros. It is as though their quest for prestige has become an excuse to spend eternity fighting.\n\nI should note that this show is not for children. It's one of the most violent shows that I've ever seen. Seriously, they leave little to the imagination. I've never read the books on which the series is based, but the series doesn't dumb anything down (understanding of course that it's fantasy).\n\nHaving just binge-watched the first season, I recommend the show. Really impressive.",
          "reviewTitle": "all fight for prestige, even when none is apparent",
          "spoiler": false,
          "submissionDate": "2015-04-07",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "jboothmillard",
            "userId": "/user/ur4248714/"
          },
          "authorRating": 7,
          "helpfulnessScore": 0.05193811798293364,
          "id": "/title/tt0944947/userreviews/rw3311199",
          "interestingVotes": {
            "down": 37,
            "up": 5
          },
          "languageCode": "eng",
          "reviewText": "This was a show I had heard a lot about, I assumed it was one with a cult following, in fact it has become more and more popular as time and seasons go by, so I decided to get into it as well. Basically the show is based on a series of fantasy novels by George R. R. Martin, it is set in the fictional continents of Westeros and Essos in the Seven Kingdoms (the North, the Iron Islands, the Vale, the Westerlands, the Stormlands, the Reach, and Dorne). There are three narratives that go on throughout the show, the first being a civil war among several noble houses for the Iron Throne of the Seven Kingdoms, the second being attempts to exile the descendants of the ruling dynasty to reclaim the throne, and the third being the rising threat of the inpending winter and fierce creatures and fierce people from the North. Within in the series are several plots and story lines, and a broad ensemble cast of characters, said to be the largest in television history, and winning a Guinness World Record for this. Starring Golden Globe and Emmy winning and four-time nominated Peter Dinklage as Tyrion Lannister, twice Emmy nominated Lena Headey as Cersei Lannister, twice Emmy nominated Emilia Clarke as Daenerys Targaryen, Kit Harington as Jon Snow, Sophie Turner as Sansa Stark, Iain Glen as Jorah Mormont, Maisie Williams as Arya Stark, Nikolaj Coaster-Waldau as Jaime Lannister, John Bradley as Samwell Tarly, Alfie Allen as Theon Greyjoy, Aidan Gillen as Petyr 'Littlefinger' Baelish, Jerome Flynn as Bronn, Conleth Hill as Lord Varys, Charles Dance as Tywin Lannister, Rory McCann as Sandor 'The Hound' Clegane, Gwendoline Christie as Brienne of Tarth, Julian Glover as Grand Maester Pycelle, Jack Gleeson as Joffrey Baratheon, Michelle Fairley as Catelyn Stark, Isaac Hempstead Wright as Bran Stark, Ian McElhinney as Barristan Selmy, Stephen Dillane as Stannis Baratheon, Ben Crompton as Eddison Tollett, Nathalie Emmanuel as Missandei, Mark Stanley as Grenn, Daniel Portman as Podrick Payne, Liam Cunningham as Davos Seaworth, Richard Madden as Robb Stark, Natalie Dormer as Margaery Tyrell, Kristian Nairn as Hodor, Sibel Kekilli as Shae, Carice van Houten as Melisandre, Finn Jones as Loras Tyrell, Hannah Murray as Gilly, Rose Leslie as Ygritte, Kristofer Hivju as Tormund Giantsbane, Michael McElhatton as Roose Bolton, Joe Dempsie as Gendry, Jacob Anderson as Grey Worm, Ian Beattie as Meryn Trant, Owen Teale as Alliser Thorne, Vicious's Iwan Rheon as Ramsay Snow, Dominic Carter as Janos Slynt, Donald Sumpter as Maester Luwin, Natalia Tena as Osha, Esmé Bianco as Ros, Brenock O'Connor as Olly, Ron Donachie as Rodrik Cassel, Josef Altin as Pypar, Amrita Acharia as Irri, Eugene Simon as Lancel Lannister, Michiel Huisman as Daario Naharis, James Cosmo as Jeor Mormont, Tom Wlaschiha as Jaqen H'ghar, Dean-Charles Chapman as Tommen Baratheon, Luke Barnes as Rast, Art Parkinson as Rickon Stark, Sean Bean as Eddard 'Ned' Stark, three-time Emmy nominated Dame Diana Rigg as Olenna Tyrell, Oona Chaplin as Talisa Maegyr, Peter Vaughan as Maester Aemon, Anton Lesser as Qyburn, Roxanne McKee as Doreah, Ben Hawkey as Hot Pie, Brian Fortune as Othell Yarwyck, Tara Fitzgerald as Selyse Baratheon, Love Actually's Thomas Brodie-Sangster as Jojen Reed, Kerry Ingram as Shireen Baratheon, Jason Momoa as Khal Drogo, Indira Varma as Ellaria Sand, Roger Ashton-Griffiths as Mace Tyrell, Ellie Kendrick as Meera Reed, Gethin Anthony as Renly Baratheon, Charlie and the Chocolate Factory's Noah Taylor as Locke, Steven Cole as Kovarro, Callum Wharry as Tommen Baratheon, Aimee Richardson as Myrcella Baratheon, Mark Addy as Robert Baratheon, Francis Magee as Yoren, Scorpion's Elyes Gabel as Rakharo, Mackenzie Crook as Orell, Paul Kaye as Thoros of Myr, Blunder's Tony Way as Dontos Hollard, Josephine Gillan as Marei, Jonathan Pryce as High Sparrow, Ciarán Hinds as Mance Rayder, Robert Pugh as Craster, The Grey's Nonso Anozie as Xaro Xhoan Daxos, Clive Russell as Brynden 'Blackfish' Tully, Casino Royale's Tobias Menzies as Edmure Tully, Jessica Henwick as Nymeria Sand, Harry Potter's Ralph Ineson as Dagmer Cleftjaw, Nell Tiger Free as Myrcella Baratheon, Harry Potter's David Bradley as Walder Frey, Mark Gatiss as Tycho Nestoris, Star Wars' Oliver Ford Davies as Maester Cressen, The Crystal Maze's Edward Tudor-Pole as Protester, Ian McShane and Max von Sydow as Three-Eyed Raven. To be completely honest, I cannot keep up with absolutely every storyline going on, because there are so many characters, in fact I have probably only memorised less than ten of the character names. The biggest reason I keep watching is because of the exciting fight and chase scenes when they happen, the great special effects to bring dragons, ghosts, zombie and all other mythical creatures to life, the over-the-top bloody violence and deaths, and the frequent nudity and sexual activity. This does not mean I do not like the show overall, I am always interested to see what will happen next with the faces of the characters I recognise, so it is certainly a worthwhile fantasy drama. It was nominated the Golden Globe for Best Television Series – Drama (twice), it won the Primetime Emmys for Outstanding Art Direction for a Single-Camera Series (also nominated), Outstanding Costumes for a Series (also nominated twice), Outstanding Makeup for a Single-Camera Series (Non-Prosthetic) (twice, also nominated), Outstanding Sound Editing for a Series (also nominated three times), Outstanding Sound Mixing for a Comedy or Drama Series (One-Hour) (also nominated twice), Outstanding Special Visual Effects (twice, also nominated twice), and it was nominated for Outstanding Casting for a Drama Series (four times), Outstanding Cinematography for a Single-Camera Series, Outstanding Directing for a Drama Series (four times), Outstanding Drama Series (twice), Outstanding Hairstyling for a Single-Camera Series (three times), Outstanding Prosthetic Makeup for a Series, Miniseries, Movie or a Special (four times), Outstanding Single- Camera Picture Editing for a Drama Series (three times) and Outstanding Writing for a Drama Series (three times). It won the BAFTA for the Audience Award (also nominated), and it was nominated for Best International. Very good!",
          "reviewTitle": "Game of Thrones",
          "spoiler": true,
          "submissionDate": "2015-09-05",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "Tweekums",
            "userId": "/user/ur13977076/"
          },
          "authorRating": 10,
          "helpfulnessScore": 0.5242343537991961,
          "id": "/title/tt0944947/userreviews/rw5396208",
          "interestingVotes": {
            "down": 7,
            "up": 18
          },
          "languageCode": "eng",
          "reviewText": "This epic series is set in a fantasy world like no other I can think of. It has the look of medieval Europe with rival families manoeuvring to take the Iron Throne on which the Kings of Westeros sit. As the series begins Robert Baratheon is the king and he invites this friend Ned Stark to be his Hand, most trusted advisor. This leads to Ned, his wife and daughters; Sansa and Arya, moving to the capital... it isn't long before they are caught up in court intrigue. Robert's wife is involved with her own brother; it is learnt that the children of the last slain king are still alive... and there are rumours that the dead are returning to life north of the wall in the far north, where Ned's illegitimate son Jon is stationed. They are expected to attack next winter!\n\nAs the series progresses rival families fight each other, form and break alliances. Other characters work for personal advancement knowing that if the move to soon or side with the wrong people their lives will soon be over. The villains are truly villainous; the heroes aren't as clear cut as one might expect. The cast of major characters is huge and events in the first season shockingly show that even those set up as lead characters can be killed off. There are fantasy elements; most notably three dragons belonging to Daenerys Targaryen; the White Walkers (the Army of the Dead); and magic of Melisandre, the Red Woman but for the most part things are gritty and real. Often that means brutal violence, quite a bit of nudity and lots of swearing... this of course means that the series won't be for everybody; however if you don't turn off in disgust in the opening few episodes you'll probably want to watch it all and love it. The cast does a phenomenal job; this includes many established actors as well as up and coming stars and people for whom this was their first acting job such as young actresses Sophie Turner and Maisie Williams who play Sansa and Arya Stark who's characters develop across many seasons in ways one wouldn't imagine when it started. There is also a stellar performance from Peter Dinklage who plays dwarf Tyrion Lannister; a character that dominates just about every scene he is in despite his diminutive size. Others who must be mentioned are Sean Bean, Emilia Clarke, Kit Harrington, Lena Headey, Aiden Gillen, Charles Dance and Jack Gleeson... to be honest I could go on listing almost everybody in it! The special effects are fantastic; one could almost believe that dragons are real after watching this. The world in which the series is set is filmed in a wide range of countries giving it a very real feel... gone are the days when a major US series set in numerous locations will be filmed entirely in Southern California or the Pacific North West! Overall I can only say 'Watch this' as I loved it from start to finish.",
          "reviewTitle": "A modern classic on an epic scale",
          "spoiler": false,
          "submissionDate": "2020-01-10",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "ma-cortes",
            "userId": "/user/ur3270789/"
          },
          "authorRating": 8,
          "helpfulnessScore": 0.3556883391059184,
          "id": "/title/tt0944947/userreviews/rw3036165",
          "interestingVotes": {
            "down": 17,
            "up": 18
          },
          "languageCode": "eng",
          "reviewText": "This is a violently graphic and strong retelling about facing off among various families in an undetermined time . Nine noble families battle for control of the mythical land of Westeros. Robert Baratheon (Mark Addy) , King of Westeros, asks his old friend Eddard ¨Ned¨(Sean Bean), Lord Stark, to serve as Hand of the King, or highest official. When Ned returned to Winterfell at the end of Robert's Rebellion, he had a bastard son, Jon Snow, by an unknown woman he had met in the South. He raised Jon alongside his five trueborn children Robb (Richard Madden) , Sansa (Sophie Turner) , Arya (Maisie Williams) , Bran (Isaac Hempstead Wright) , and Rickon (Art Parkinson) . Along with the Stark family is Theon (Alfie Allen), he became a ward of Lord Eddard \"Ned\" Stark at Winterfell, and he became close with Robb . Although Ned is secretly warned that the previous Hand was assassinated, Eddard accepts in order to investigate further . Meanwhile the Queen's family, the Lannisters, may be hatching a plot to take power . There appears Tyrion (Peter Dinklage) the third and youngest son of Lord Tywin (Charles Dance) and Lady Joanna Lannister. Because of his unusual stature Tyrion has been a victim of mockery his entire life, with people overlooking his noble birth in order to tease and taunt him. Tyrion's mother died giving birth to him and his father and older sister Cersei (Lena Headey) have despised him all his life as a result. He has always maintained a close relationship with his elder brother Ser Jaime Lannister (Nikolaj Coaster-Waldau), Cersei's twin . Across the sea, the last members of the previous and deposed ruling family, the Targaryens, are also scheming to regain the throne . As Daenerys (Emilia Clarke) is the only daughter of Aerys II Targaryen and Rhaella Targaryen , she is now a princess living in exile, the last of the Targaryens . But Daenerys grows into a supremely confident warrior women with perhaps the most stringent code of ethics in all the Seven Kingdoms. All while a very ancient evil awakens in the farthest north. Amidst the war and political confusion, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond . There finds Jon Snow (Kit Harington) , the bastard Son of Lord Ned Stark by an unknown mother , it is here that the skills that were passed on to him by Ned come to light as Jon becomes a natural born leader with a strong code of ethics and an effective warrior when battling at and beyond the Wall. \n\nThis is a spectacular epic dealing with friction between the houses Stark, Lannister, Baratheon and Targaryen and with the remaining great houses Greyjoy, Tully, Arryn,Tyrell and Martell and in which political and sexual intrigue is pervasive ; all of them lead to full-scale war . Breathtaking epic version based on George RR Martin novels with exciting drama and overwhelming combats , his stories are imaginatively brought to life on groundbreaking images with great production values and outstanding scenarios . Sword cross , intense drama , nudism , sexual scenes , and bloody fights abound in this spellbinding adaptation . Magnificent climatic battle scenes and struggles including lots of blood and gore ; and adding colorful computer generator images including heinous dragons . The series is well written by an excellent plethora of screenwriters as David Benioff , D.B. Weiss , Vanessa Taylor under supervision by the great creator George R.R. Martin . This author was asked if he had a resolution or ending to the seemingly endless conflict , he replied that the end would be a cloud of dust or snow being driven by the wind across a vast graveyard full of tombstones. The series takes its name from the first novel in the book series \"A Game of Thrones\" - which is actually known as \"A Song of Ice and Fire\",and most of the show is largely faithful to the books . George R.R. Martin's story credit acknowledges the entire series under this title, rather than the title of individual volumes. George R.R. Martin has stated that the infamous \"Red Wedding\" was the hardest chapter for him to write in \"A Storm of Swords.\" He was so emotionally attached to the characters that he actually wrote the rest of the book first, and then that chapter last .",
          "reviewTitle": "Impressive epic with plenty of violence , fierce combats  ,  plot twists  , gore and blood .",
          "spoiler": false,
          "submissionDate": "2014-06-18",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "paul_haakonsen",
            "userId": "/user/ur22654354/"
          },
          "authorRating": 8,
          "helpfulnessScore": 0.20305274744823198,
          "id": "/title/tt0944947/userreviews/rw3525549",
          "interestingVotes": {
            "down": 11,
            "up": 7
          },
          "languageCode": "eng",
          "reviewText": "As a life-long fan of the Dungeons & Dragons roleplaying game, it is a hard thing to not be familiar with the \"Game of Thrones\" series. And yet it took me five years after the pilot to start watching it. But it should be said, then, that I haven't been able to stop watching it since I started, and I have sat through four of the seasons so far in a very short time.\n\nWhat works for me in \"Game of Thrones\" is the extensive storyline, with multiple houses working against one another or with one another all in order to obtain power, wealth and the crown to the realm. But also the myriad of intricate and detailed characters that are in the series, that is just spectacular. Especially because anyone of these characters can die on a whim, so you never know who is safe.\n\nThe costumes are sets are fantastic, especially because there is so much attention to detail, both mundane and flashy. And it really works out so well, because you really think that you are in a medieval fantasy setting with dragons and knights. And also the special effects play a big role in the series, although not the point where the show is dependent on the special effects. Of course, having good CGI is particularly important if the dragons were to be realistic and believable.\n\nI like the politics and the alliances and feuds between the different houses and affiliations, because it is played out so well, and it is really well thought through by the creator.\n\nOne thing that really is a thorn in my side if the excessive amount of nudity in the show, because it really sleazes up the series unnecessarily. The show would work out equally well with much less nudity and done in a more presentable way. But also the constant excessive use of foul language; here I am thinking of the \"F-word\" and the \"C-word\" that most of the characters are using frequently. It really seems out of place with the setting and atmosphere of the series, plus is also adds a wholly unnecessary level of unpleasantness. I am not a prude, but I think it is so frequent in the series that it is a downright annoyance.\n\nYou quickly find your favorite character or characters in the myriad of colorful, quirky, scheming, bold, defiant and lovable characters. And likewise, you also quickly find ones that you most definitely do not like or even downright loathe. For me, the King Joffrey character was one that I instantly despised, he really pulled every wrong string in my being. Nothing against Jack Gleeson as an actor, it was just the character that he portrayed. And as such, when a series manages to instill such a relationship between the viewer and fictional characters, then the series is really worth watching, appealing to you on more than just an entertainment level.\n\nThe slow build up of various events, and how the events have effects on the various houses and factions like ripples in a pond, really add enjoyment to the show. And you want to see more and learn what will happen next and see how the epic tale unfolds. Who will live and who will die? Who will stand victorious when the dust settles?\n\n\"Game of Thrones\" is really worth watch, especially if you enjoy the fantasy genre. I am rating it a solid eight out of ten stars, and the reason for it not scoring nine or even ten stars from me is solely because of the unnecessary nudity and foul language.",
          "reviewTitle": "The game is on...",
          "spoiler": false,
          "submissionDate": "2016-08-15",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "bevo-13678",
            "userId": "/user/ur76062573/"
          },
          "authorRating": 10,
          "helpfulnessScore": 0.5167095388627896,
          "id": "/title/tt0944947/userreviews/rw5828457",
          "interestingVotes": {
            "down": 16,
            "up": 31
          },
          "languageCode": "eng",
          "reviewText": "Great show with dragons, sex, fighting, dwarfs and cooking tips",
          "reviewTitle": "Dt",
          "spoiler": false,
          "submissionDate": "2020-06-16",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "grantss",
            "userId": "/user/ur2860723/"
          },
          "authorRating": 7,
          "helpfulnessScore": 0.13603289871785676,
          "id": "/title/tt0944947/userreviews/rw4871543",
          "interestingVotes": {
            "down": 36,
            "up": 11
          },
          "languageCode": "eng",
          "reviewText": "(Updated after Season 8)\n\nSet in a fantasy land (though, in many ways, very similar to Earth in the Middle ages) the stories of several families and individuals and their quest for power. In particular, they all want the Iron Throne...\n\nGood, epic, fantasy drama, based on the books by George RR Martin. Started extremely well: the focus on several individuals, the clever interlocking story lines, the weaving together of family feuds, power trips and pure greed and malice. Add in superb cinematography, settings, scenery and CGI, spot-on performances and some great battle scenes and we had an intriguing, engaging, action-packed drama.\n\nOne of the early trademarks of the show was the principle that all characters are expendable: characters, often heroes and seemingly there for the long haul, get killed off in the blink of an eye, and out of the blue. This is good and bad. Good in that it shows that, as in life, there are no certainties and \"heroes\" / very likeable characters with depth aren't necessarily immortal (this is definitely not Disney!). On the other hand, it leaves you feeling distant and unengaged. It's difficult to support a character when they could be killed off at any moment.\n\nThe other issue early on was that there are possibly too many stories being told simultaneously. Too many characters in the story I didn't care about (though the previous issue diluted this phenomenon somewhat!). This is particularly so in Seasons 3 and 4.\n\nWhile the plot is good and the characters have depth, it isn't all substance: style plays its part and sometimes the dial is too much over to the style side. Over time, style starts to overwhelm substance.\n\nThis all said, it does start to come together from Season 5 onwards. Seasons 1 and 2 were good, and set up the story for some great development in Season 3. Unfortunately, Seasons 3 and 4 drifted somewhat. Season 5 gets us back on track and Season 6 propelled the story forward in a big way.\n\nSeason 7 is where the individual, seemingly parallel at times, stories start to come together, as we start to effectively get one story, rather than several. It also set up the series for the final season, which promised to be a humdinger.\n\n...which it certainly wasn't. Game of Thrones Season 8 would have to be one of the most eagerly anticipated final seasons in TV history...and one of the worst (and I've watched the final seasons of Dexter and True Blood!). Having created the mythical world and developed the plot to this thrilling climax, spending eight years in doing so, the writers seemed to not know how to end it. Pacing is uneven, some plot developments are quite laughable (deux ex machina, anyone...), direction is weird at times - artsy for the sake of it (Episode 3...) and there's far more style than substance (and the style feels forced).\n\nThe final episode does tie things up quite neatly but more with a whimper than a bang. Very disappointing, especially considering the build-up.\n\nLess drifting in the middle seasons (even cull one or two seasons), a tighter final season and no zombies (the white walkers were a waste of time - a distraction from the real confrontation) and this would have been brilliant.",
          "reviewTitle": "Good but not great: massively over-rated",
          "spoiler": false,
          "submissionDate": "2019-05-20",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "AlsExGal",
            "userId": "/user/ur15148330/"
          },
          "authorRating": 10,
          "helpfulnessScore": 0.45877622815926894,
          "id": "/title/tt0944947/userreviews/rw3796821",
          "interestingVotes": {
            "down": 23,
            "up": 33
          },
          "languageCode": "eng",
          "reviewText": "... as I am writing this. \n\nIf the first season seems boring to you (that seems to be the biggest complaint I've heard from people who don't like the show) just push through anyway. If by episode 10 you still aren't hooked, I'd be really surprised.\n\nIt's fantasy medieval material with lots of characters, plots and settings. Almost all of the characters are interesting and multidimensional, supported by very good acting for this type of show and for the immense quantity of characters involved (and half a dozen of them bringing really high level acting talent in general). Almost every character has their own backstory that makes their actions relatable, from Tywin, whose weak father almost lost their family seat, to Joffrey who got told he is the greatest of the world from his birth and became a spoiled brat. Hardly any character has \"plot armor\", so nearly anyone can die at any second with the momentum changing completely. The dialogue is excellent, based on the excellent writing from the books. \n\nIt has terrific world-building, a lot of attention to detail, amazing production value in every technical aspect (soundtrack is amazing, cinematography is impressive, the locations are great). There are great battles and special effects. It is full of unexpected but consistent plot-twists, and it's extremely focused on details and foreshadowing, which makes every scene potentially important and provides a rich ground for theories on future plots and speculation on answers for the dozens of mysteries the show introduces. \n\nIt is highly immersive and dark, good things happen to bad people all the time, as bad things happen to good people, which is frustrating and infuriating most of the time, but that makes it so unpredictable and also helps with creating connections to the characters and making you really invested in what's going to happen next.",
          "reviewTitle": "Game of Thrones - king of all TV dramas in current production...",
          "spoiler": false,
          "submissionDate": "2017-09-03",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "safenoe",
            "userId": "/user/ur34307814/"
          },
          "authorRating": 6,
          "helpfulnessScore": 0.12437001842817345,
          "id": "/title/tt0944947/userreviews/rw7240590",
          "interestingVotes": {
            "down": 26,
            "up": 8
          },
          "languageCode": "eng",
          "reviewText": "Being a GoT fan, I greatly admired the writing here and great to see bold choices in writing made. Season 6 was quite a downer with quality slipping in casting choices, but it picked up later on thankfully.",
          "reviewTitle": "Season 6 was a downer",
          "spoiler": false,
          "submissionDate": "2021-08-18",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "phd_travel",
            "userId": "/user/ur22484170/"
          },
          "helpfulnessScore": 0.12778083981978614,
          "id": "/title/tt0944947/userreviews/rw2497443",
          "interestingVotes": {
            "down": 79,
            "up": 19
          },
          "languageCode": "eng",
          "reviewText": "I had to watch this because others were watching it and I tried to be open minded and see what all the fuss was about. Seriously how did such a silly novel came to screen! This shouldn't have been done by HBO. It' just nerd fantasy fiction. What a derivative story! They just throw in all sorts of shocking and titillating nonsense to make a story but it's all so silly. There is just so much gross stuff: the incest, the beheading and other dismemberments, the token homosexuals, the gratuitously violent sword fighting and last but not least the \"Golden Crown\". I'm reminded of what many prominent authors and critics got together to say about Harry Potter: The sight of grown people reading the books is distressing. The same can be said of Game of Thrones. Except Game is full of so many unpleasant characters. The cast tries hard but they are wasted. They are almost all irritating and to kill of Sean Bean leaving only Lena Headey as a cast member of stature! Can't bear to think of Season 2 relying on the remaining cast. I think the worst part was watching Emilia Clarke talk that strange language for minutes on end.\n\nWere there any good points? Just the effort put in production set design and makeup. Jason Momoa does look like a human monster here. The vaguely British Irish medieval castles and settings are well done. Its just a shame so much effort went into such drivel.",
          "reviewTitle": "Very unpleasant and not very original",
          "spoiler": true,
          "submissionDate": "2011-09-30",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "gradyharp",
            "userId": "/user/ur3223254/"
          },
          "authorRating": 10,
          "helpfulnessScore": 0.4233895480161169,
          "id": "/title/tt0944947/userreviews/rw2416071",
          "interestingVotes": {
            "down": 100,
            "up": 97
          },
          "languageCode": "eng",
          "reviewText": "It has begun! The much touted HBO miniseries A GAME OF THRONES arrived with Episode 1, and though the entire series cannot be judged on one episode, this initial hour has all the promise of an involving and visually stunning adaptation of the 1996 George R.R. Martin series of books of adult fantasy fiction titled 'A Song of Ice and Fire'. The 'game' is played by seven families - Stark, Lannister, Baratheon, Greyjoy, Tully, Arryn, and Tyrell - and what we find in the initial episode is a taste of the intrigue to come. \n\nIn this first episode Lord Eddard Stark (Sean Bean) is the patriarch of House Stark, one of the major noble houses of the Seven Kingdoms of Westeros and ancestral rulers of the North. Near the castle of Winterfell, Eddard's children discover a dead direwolf and five of its pups still alive. As the direwolf is the symbol of the Starks, Eddard allows each of his five children to keep one of the pups as pet. A sixth pup is discovered a short distance away from the others. It is a mute albino, and this one is given to Jon Snow (Kit Harington), the bastard son of Lord Eddard Stark. King Robert Baratheon (Mark Addy) , Eddard's childhood friend, journeys to Winterfell with his family to ask Eddard to become Hand of the King, the top adviser and military commander in the realm, due to the death of the previous Hand, Lord Jon Arryn. Eddard's wife, Catelyn Stark (Michelle Fairley), receives a letter from her sister Lysa Arryn, stating that Jon Arryn's death was a murder plotted by Queen Cersei (Lena Headey) and her powerful family, the Lannisters. Though reluctant to leave his duties and family, Eddard is convinced by his wife to accept the position in order to investigate Jon Arryn's death. Eddard's middle son Bran Stark (Isaac Hempstead-Wright) is engaging in climbing Winterfell castle's walls and towers accidentally sees Queen Cersei and her twin brother Jaime Lannister (Nikolaj Coaster-Waldau) having incestuous relations. To protect their secret affair, Jaime throws the boy out of a tower window. Where the story goes form here will follow throughout the remaining episodes. \n\nThough some would criticize an early report on a series merely at its inception, it seems only fitting that offering a word on encouragement to pay attention to this new series is warranted. We can only hope that the series continues to build as it progresses. The cast is filled with excellent actors, both seasoned and refreshingly new. \n\nGrady Harp",
          "reviewTitle": "Heads up for GAME OF THRONES",
          "spoiler": true,
          "submissionDate": "2011-04-18",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "mm-39",
            "userId": "/user/ur0453228/"
          },
          "authorRating": 7,
          "helpfulnessScore": 0.5442408134528044,
          "id": "/title/tt0944947/userreviews/rw4841114",
          "interestingVotes": {
            "down": 19,
            "up": 39
          },
          "languageCode": "eng",
          "reviewText": "Well the first couple of seasons where good! Game of Thrones has magic, dragons, action, and drama; with a hard does of x rated scenes and nudity. Game of Thrones has H B O movie quality, sets, and A list actors. Game of Thrones follows a good mix with some of England's history which give a real feel for the major story line mixed in with magically fantasy. (ie the wall the Romans built around Scotland) Like The Sopranos H B O made a fresh, cutting edge, and raw series. Regrettably the later years of the series becomes formulated, redundant, and hemmed in; much like the Walking Dead series. Does anyone watch the Walking Dead anymore? Well the killing off of lead characters, and introduction of new characters creates new life for a series. Regrettable the second half of Game of Thrones loses steam like most series. 7 out of 10 stars.",
          "reviewTitle": "Well the first couple of season where good!",
          "spoiler": true,
          "submissionDate": "2019-05-10",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "deloudelouvain",
            "userId": "/user/ur58525162/"
          },
          "authorRating": 10,
          "helpfulnessScore": 0.3945393039614515,
          "id": "/title/tt0944947/userreviews/rw3793387",
          "interestingVotes": {
            "down": 15,
            "up": 19
          },
          "languageCode": "eng",
          "reviewText": "Definitely one of the best fantasy series ever. I don't think I ever saw a better one. At least I can't remember a better one. I write this after the seventh season and it's still as good as the beginning. That's says it all. The acting is excellent. There are so many different characters, clans and families that it could be difficult to follow if you didn't pay attention. But all the characters are worth watching, every single one of them. And don't get too attached to a character because it could be over for him or her in any episode. Never saw so many main characters being killed or murdered as in Game Of Thrones. And that's a real good thing because there is always an element of surprise. In every season characters that you would think will survive die. The battles are epic, the story could go in any direction anytime. Betrayals, violence, conquests, incestuous affairs, the show has everything. I'm a devoted fan, so devoted I already have three tattoos about it. House Targayen rules!",
          "reviewTitle": "Best fantasy series ever",
          "spoiler": false,
          "submissionDate": "2017-08-30",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "Vincentiu",
            "userId": "/user/ur13017201/"
          },
          "helpfulnessScore": 0.3574687297653368,
          "id": "/title/tt0944947/userreviews/rw2600673",
          "interestingVotes": {
            "down": 6,
            "up": 9
          },
          "languageCode": "eng",
          "reviewText": "loyalty for novel, spectacular show, magnificent adaptation of each detail. sure, not a real surprise for HBO but it is a major success to create an entire world in so manner. the key - perfect cast and power of images. the freedom for each step of tale and mixture of seduction and cold view. exercise of masterpiece, it is more than adaptation. the colors are part of nuances. the dialog is seed of events. the territories - pieces of huge puzzle - are slices of tasty bread. the force of measure is the rule, secret and miracle to make this extraordinary work. no drop of speculation, only ash honey of a monumental river of survive.",
          "reviewTitle": "impressive",
          "spoiler": false,
          "submissionDate": "2012-04-22",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "DKosty123",
            "userId": "/user/ur4067661/"
          },
          "authorRating": 7,
          "helpfulnessScore": 0.02529548792759245,
          "id": "/title/tt0944947/userreviews/rw5527458",
          "interestingVotes": {
            "down": 20,
            "up": 2
          },
          "languageCode": "eng",
          "reviewText": "Yes, this is sort of a middle ages feud, the Lannisters and the Starks and the battles of the 7 kingdoms from north to south. The locales range from the Wall to Winterfell, to Kings Landing. Every episode has opening credits with maps of all the kingdoms which change as events happen. Using an original book OF FIRE AND ICE, the series starts off magnificently with many power grabbing events and executions. The list of characters grows week to week, and some executions end many cast members stay on the show.\n\nThe actor who is in the most episodes is a Lannister played by Peter Dinkvage. While Peter is short in stature, his acting is high in caliber. He is nearly killed early in the series, but like a Phoenix he continues to rise from his own demise to become a power broker for the Dragon Lady. She is a Southern Ruler who owns 3 Dragons and heads a powerful army who wants to rule the 12 kingdoms. Normally, this would be an easy task.\n\nThen there are the Starks who rule Winterfell and the North. To complicate matters, there is the army of the dead. Early on in the series they only make brief attacks on small bands of troops. Then as more people are killed, the amry of the dead gets bigger and bigger and become a bigger and bigger threat. There's a lot of excellent character development in the earliest parts of this series. The middle age world of kingdoms have many interesting little asides.\n\nThen as we wind into the last seasons, an alliance is created to face the army of the dead in sort of a middle age world war. The climatic battle is long and drawn out, as the author is no longer working on the scripts and the material has diminished considerably. Overall the series quality is very high up until the segment leading to the big battle. That is when we lose character development and the series is totally immersed in the final battle.\n\nThe way to watch this now is to get the DVDs and absorb it at your leisure, Is it worth watching? Definitely. Is the ending satisfactory? That depends on your point of view. It does prove that game on is more than just an hour, and it makes the Middle Age World more complicated than I ever imagined.",
          "reviewTitle": "Massive Cast Epic HBO Production",
          "spoiler": true,
          "submissionDate": "2020-03-05",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "Rainey-Dawn",
            "userId": "/user/ur35635716/"
          },
          "authorRating": 10,
          "helpfulnessScore": 0.2455954988203936,
          "id": "/title/tt0944947/userreviews/rw4348469",
          "interestingVotes": {
            "down": 10,
            "up": 8
          },
          "languageCode": "eng",
          "reviewText": "There's nothing I can say that hasn't already been said: It's a fantastic series. \n\nI did not see this series for a few years - didn't have the means to do so. I finally bought the series on DVD to watch because I HAD to see this series. I knew I would love it - and others that have seen it kept reminding me of it and telling me I must watch it! I'm glad others prodded me about it and happy I bought it for viewing. I fell in-love as I knew I would. I will buy Season 8 when it comes out - I have to see the ending and complete the set. \n\nIf you still haven't seen this series and love medieval fantasy then I highly recommend this for viewing - I would prod you to watch as I was - you won't be disappointed! \n\n10/10",
          "reviewTitle": "Outstanding Series",
          "spoiler": false,
          "submissionDate": "2018-09-19",
          "titleId": "/title/tt0944947/"
        },
        {
          "author": {
            "displayName": "FeastMode",
            "userId": "/user/ur104603847/"
          },
          "authorRating": 8,
          "helpfulnessScore": 0.05668228460165682,
          "id": "/title/tt0944947/userreviews/rw5065458",
          "interestingVotes": {
            "down": 8,
            "up": 2
          },
          "languageCode": "eng",
          "reviewText": "Slow at times, but intriguing and well made with amazing production value. movie-level quality in many aspects\n\nseason 1: 7/10 (2 viewings) season 2: 7/10 (2 viewings) season 3: 7/10 (2 viewings) season 4: 7/10 (2 viewings)\n\nseason 5: 8/10 beastly. finally got to see a lot of what i've been waiting for. a step above the previous seasons (3 viewings)\n\nseason 6: 8/10 had some flaws, and slow at times earlier in the season, but the last two episodes were amazing. especially the last one, one of my all time favorite episodes of any show (3 viewings)\n\nseason 7: 10/10 smh omg wow (2 viewings)\n\nseason 8: 4/10\n\nthis entire season is multiple steps down from previous seasons. but i didn't really hate it until the finale. as mixed as it was, there is a lot of good in the rest of the season. but the finale left me so bitter that i had to drop the score all the way down to a 4/10. i am so sad and disappointed that it finished on such a horrible note. (1 viewing)\n\n SPOILERS\n\n i could type an essay on everything wrong with the finale and this season as a whole but i don't feel like wasting my time. i will assume the show ends before jon's convo with tyrion. everything after didn't happen. and that still leaves a bunch of issues i had with the rest of the season. like khaleesi turning evil so suddenly and surprisingly",
          "reviewTitle": "high quality to the max",
          "spoiler": true,
          "submissionDate": "2019-08-17",
          "titleId": "/title/tt0944947/"
        }
      ],
      "totalReviews": 5338
    })*/

    //console.log(reviews[0].base.image.url);
    function reviewsList() {
      return (
        <Scroll>
          <ReviewList Reviews={reviews[0]} />
        </Scroll>
      );
    }

    return ( 
        
        <div>
            {poster && <img className="br-50 h10 w5 dib" alt="poster" src={[reviews[0].base.image.url]} />}
            <div>
              <h1>{details[0]["movie_name"]}</h1>
              <h2>genre: {details[0]["movie_tags"]}</h2>
              <p>description: {details[0]["movie_dis"]}</p>
            </div>
            <div>
              <h1>Reviews</h1>
              {reviewsloaded && reviewsList()}
            </div>
            
        </div>
    );
}
 
export default MovieDetails;