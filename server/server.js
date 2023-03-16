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


    /*res.json({ "movies": [
        {"id":1, "movie_name": ["The Last of Us"], "movie_dis": ["\nAfter a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope."], "movie_year": ["(2023– )"], "movie_director_cast": ["Pedro Pascal", "Bella Ramsey", "Anna Torv", "Gabriel Luna"], "movie_tags": ["\nAction, Adventure, Drama            "], "movie_star": ["9.2"]},
        {"id":2,"movie_name": ["Ant-Man and the Wasp: Quantumania"], "movie_dis": ["\nScott Lang and Hope Van Dyne, along with Hank Pym and Janet Van Dyne, explore the Quantum Realm, where they interact with strange creatures and embark on an adventure that goes beyond the limits of what they thought was possible."], "movie_year": ["(2023)"], "movie_director_cast": ["Peyton Reed", "Paul Rudd", "Evangeline Lilly", "Michael Douglas", "Michelle Pfeiffer"], "movie_tags": ["\nAction, Adventure, Comedy            "], "movie_star": ["6.5"]},
        {"id":3,"movie_name": ["You"], "movie_dis": ["\nA dangerously charming, intensely obsessive young man goes to extreme measures to insert himself into the lives of those he is transfixed by."], "movie_year": ["(2018– )"], "movie_director_cast": ["Penn Badgley", "Victoria Pedretti", "Ambyr Childers", "Elizabeth Lail"], "movie_tags": ["\nCrime, Drama, Romance            "], "movie_star": ["7.7"]},
        {"id":4,"movie_name": ["The Flash"], "movie_dis": ["\nBarry Allen uses his super speed to change the past, but his attempt to save his family creates a world without super heroes, forcing him to race for his life in order to save the future."], "movie_year": ["(2023)"], "movie_director_cast": ["Andy Muschietti", "Sasha Calle", "Michael Keaton", "Ezra Miller", "Ben Affleck"], "movie_tags": ["\nAction, Adventure, Fantasy            "], "movie_star": []},
        {"id":5,"movie_name": ["Your Place or Mine"], "movie_dis": ["\nTwo long-distance best friends change each other's lives when she decides to pursue a lifelong dream and he volunteers to keep an eye on her teenage son."], "movie_year": ["(2023)"], "movie_director_cast": ["Aline Brosh McKenna", "Reese Witherspoon", "Ashton Kutcher", "Zoe Chao", "Jesse Williams"], "movie_tags": ["\nComedy, Romance            "], "movie_star": ["5.6"]},
        {"id":6,"movie_name": ["Poker Face"], "movie_dis": ["\nCharlie has an extraordinary ability to determine when someone is lying. She hits the road with her Plymouth Barracuda and with every stop encounters a new cast of characters and strange crimes she can't help but investigate and solve."], "movie_year": ["(2023– )"], "movie_director_cast": ["Natasha Lyonne", "Benjamin Bratt", "Simon Helberg", "Brandon Micheal Hall"], "movie_tags": ["\nCrime, Drama, Mystery            "], "movie_star": ["8.0"]},
        {"id":7,"movie_name": ["1923"], "movie_dis": ["\nThe Duttons face a new set of challenges in the early 20th century, including the rise of Western expansion, Prohibition and the Great Depression."], "movie_year": ["(2022–2023)"], "movie_director_cast": ["Harrison Ford", "Helen Mirren", "Brandon Sklenar", "Julia Schlaepfer"], "movie_tags": ["\nDrama, Western            "], "movie_star": ["8.6"]},
        {"id":8,"movie_name": ["Babylon"], "movie_dis": ["\nA tale of outsized ambition and outrageous excess, it traces the rise and fall of multiple characters during an era of unbridled decadence and depravity in early Hollywood."], "movie_year": ["(I) (2022)"], "movie_director_cast": ["Damien Chazelle", "Brad Pitt", "Margot Robbie", "Jean Smart", "Olivia Wilde"], "movie_tags": ["\nComedy, Drama, History            "], "movie_star": ["7.3"]},
        {"id":9,"movie_name": ["Yellowstone"], "movie_dis": ["\nA ranching family in Montana faces off against others encroaching on their land."], "movie_year": ["(2018–2023)"], "movie_director_cast": ["Kevin Costner", "Luke Grimes", "Kelly Reilly", "Wes Bentley"], "movie_tags": ["\nDrama, Western            "], "movie_star": ["8.7"]},
        {"id":10,"movie_name": ["The White Lotus"], "movie_dis": ["\nThe exploits of various guests and employees of a tropical resort over the span of a week."], "movie_year": ["(2021–2023)"], "movie_director_cast": ["Jennifer Coolidge", "Jon Gries", "F. Murray Abraham", "Adam DiMarco"], "movie_tags": ["\nComedy, Drama            "], "movie_star": ["7.9"]},
        {"id":11,"movie_name": ["Black Panther: Wakanda Forever"], "movie_dis": ["\nThe people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King T'Challa."], "movie_year": ["(2022)"], "movie_director_cast": ["Ryan Coogler", "Letitia Wright", "Lupita Nyong'o", "Danai Gurira", "Winston Duke"], "movie_tags": ["\nAction, Adventure, Drama            "], "movie_star": ["6.8"]},
        {"id":12,"movie_name": ["Infinity Pool"], "movie_dis": ["\nJames and Em Foster are enjoying an all-inclusive beach vacation in the fictional island of La Tolqa, when a fatal accident exposes the resort's perverse subculture of hedonistic tourism, reckless violence and surreal horrors."], "movie_year": ["(2023)"], "movie_director_cast": ["Brandon Cronenberg", "Alexander Skarsgård", "Mia Goth", "Cleopatra Coleman", "Dunja Sepcic"], "movie_tags": ["\nCrime, Horror, Mystery            "], "movie_star": ["6.1"]},
        {"id":13,"movie_name": ["Fast X"], "movie_dis": ["\nDom Toretto and his family are targeted by the vengeful son of drug kingpin Hernan Reyes."], "movie_year": ["(2023)"], "movie_director_cast": ["Louis Leterrier", "Vin Diesel", "Jordana Brewster", "Tyrese Gibson", "Michelle Rodriguez"], "movie_tags": ["\nAction, Crime, Mystery            "], "movie_star": []},
        {"id":14,"movie_name": ["Winnie the Pooh: Blood and Honey"], "movie_dis": ["\nAfter Christopher Robin abandons them for college, Pooh and Piglet embark on a bloody rampage as they search for a new source of food."], "movie_year": ["(2023)"], "movie_director_cast": ["Rhys Frake-Waterfield", "Amber Doig-Thorne", "Nikolai Leon", "Maria Taylor", "Natasha Rose Mills"], "movie_tags": ["\nHorror            "], "movie_star": ["3.9"]},
        {"id":15,"movie_name": ["Avatar: The Way of Water"], "movie_dis": ["\nJake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home."], "movie_year": ["(2022)"], "movie_director_cast": ["James Cameron", "Sam Worthington", "Zoe Saldana", "Sigourney Weaver", "Stephen Lang"], "movie_tags": ["\nAction, Adventure, Fantasy            "], "movie_star": ["7.8"]},
        {"id":16,"movie_name": ["Shrinking"], "movie_dis": ["\nA grieving therapist starts to tell his clients exactly what he thinks. Ignoring his training and ethics, he finds himself making huge changes to people's lives - including his own."], "movie_year": ["(2023– )"], "movie_director_cast": ["Jason Segel", "Jessica Williams", "Harrison Ford", "Luke Tennie"], "movie_tags": ["\nComedy, Drama            "], "movie_star": ["7.8"]},
        {"id":17,"movie_name": ["The Walking Dead"], "movie_dis": ["\nSheriff Deputy Rick Grimes wakes up from a coma to learn the world is in ruins and must lead a group of survivors to stay alive."], "movie_year": ["(2010–2022)"], "movie_director_cast": ["Andrew Lincoln", "Norman Reedus", "Melissa McBride", "Lauren Cohan"], "movie_tags": ["\nDrama, Horror, Thriller            "], "movie_star": ["8.1"]},
        {"id":18,"movie_name": ["Magic Mike's Last Dance"], "movie_dis": ["\nMike takes to the stage again, following a business deal that went bust, leaving him broke and taking bartender gigs in Florida. Mike heads to London with a wealthy socialite who lures him with an offer he can't refuse."], "movie_year": ["(2023)"], "movie_director_cast": ["Steven Soderbergh", "Jemelia George", "Channing Tatum", "Daniel Llaca", "Erin Cline"], "movie_tags": ["\nComedy, Drama            "], "movie_star": ["5.7"]},
        {"id":19,"movie_name": ["Star Trek: Picard"], "movie_dis": ["\nFollow-up series to ", "Star Trek: The Next Generation", " (1987) and ", "Star Trek: Nemesis", " (2002) that centers on Jean-Luc Picard in the next chapter of his life."], "movie_year": ["(2020–2023)"], "movie_director_cast": ["Star Trek: The Next Generation", "Star Trek: Nemesis", "Patrick Stewart", "Michelle Hurd", "Alison Pill", "Santiago Cabrera"], "movie_tags": ["\nAction, Adventure, Drama            "], "movie_star": ["7.3"]},
        {"id":20,"movie_name": ["Game of Thrones"], "movie_dis": ["\nNine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia."], "movie_year": ["(2011–2019)"], "movie_director_cast": ["Emilia Clarke", "Peter Dinklage", "Kit Harington", "Lena Headey"], "movie_tags": ["\nAction, Adventure, Drama            "], "movie_star": ["9.2"]},
        {"id":21,"movie_name": ["Knock at the Cabin"], "movie_dis": ["\nWhile vacationing, a girl and her parents are taken hostage by armed strangers who demand that the family make a choice to avert the apocalypse."], "movie_year": ["(2023)"], "movie_director_cast": ["M. Night Shyamalan", "Dave Bautista", "Jonathan Groff", "Ben Aldridge", "Nikki Amuka-Bird"], "movie_tags": ["\nHorror, Mystery, Thriller            "], "movie_star": ["6.2"]}


    ] })*/
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

app.listen(5000, () => {console.log(`server started on port 5000...`)});