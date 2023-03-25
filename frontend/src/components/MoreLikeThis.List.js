import React from "react";
import Card from './Card';


function MoreLikeThisList({ MoreList }) {

  MoreList = [
    {
        "movie_name":["The Last of Us"],
        "movie_dis":["\nAfter a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope."],
        "movie_year":["(2023– )"],
        "movie_director_cast":["Pedro Pascal",
          "Bella Ramsey",
          "Anna Torv",
          "Gabriel Luna"],
        "movie_tags":["\nAction, Adventure, Drama            "],
        "movie_star":[9.2],
        "id":"387d2122-691f-427a-8d75-c9f133583718",
        "_version_":1760490217804922880},
      {
        "movie_name":["Ant-Man and the Wasp: Quantumania"],
        "movie_dis":["\nScott Lang and Hope Van Dyne, along with Hank Pym and Janet Van Dyne, explore the Quantum Realm, where they interact with strange creatures and embark on an adventure that goes beyond the limits of what they thought was possible."],
        "movie_year":["(2023)"],
        "movie_director_cast":["Peyton Reed",
          "Paul Rudd",
          "Evangeline Lilly",
          "Michael Douglas",
          "Michelle Pfeiffer"],
        "movie_tags":["\nAction, Adventure, Comedy            "],
        "movie_star":[6.5],
        "id":"2b385057-b1ce-4d17-9c1c-dd891728375d",
        "_version_":1760490217850011648},
      {
        "movie_name":["You"],
        "movie_dis":["\nA dangerously charming, intensely obsessive young man goes to extreme measures to insert himself into the lives of those he is transfixed by."],
        "movie_year":["(2018– )"],
        "movie_director_cast":["Penn Badgley",
          "Victoria Pedretti",
          "Ambyr Childers",
          "Elizabeth Lail"],
        "movie_tags":["\nCrime, Drama, Romance            "],
        "movie_star":[7.7],
        "id":"943335ea-2dd3-4d58-82bc-00f4dbb8aac7",
        "_version_":1760490217852108800},
      {
        "movie_name":["The Flash"],
        "movie_dis":["\nBarry Allen uses his super speed to change the past, but his attempt to save his family creates a world without super heroes, forcing him to race for his life in order to save the future."],
        "movie_year":["(2023)"],
        "movie_director_cast":["Andy Muschietti",
          "Sasha Calle",
          "Michael Keaton",
          "Ezra Miller",
          "Ben Affleck"],
        "movie_tags":["\nAction, Adventure, Fantasy            "],
        "id":"71f1caf0-fcf8-47ce-8bab-a0a03183d1a1",
        "_version_":1760490217853157376},
      {
        "movie_name":["Your Place or Mine"],
        "movie_dis":["\nTwo long-distance best friends change each other's lives when she decides to pursue a lifelong dream and he volunteers to keep an eye on her teenage son."],
        "movie_year":["(2023)"],
        "movie_director_cast":["Aline Brosh McKenna",
          "Reese Witherspoon",
          "Ashton Kutcher",
          "Zoe Chao",
          "Jesse Williams"],
        "movie_tags":["\nComedy, Romance            "],
        "movie_star":[5.6],
        "id":"daa347c8-9d57-4b83-a8b9-604fb1e09248",
        "_version_":1760490217854205952},
      {
        "movie_name":["Poker Face"],
        "movie_dis":["\nCharlie has an extraordinary ability to determine when someone is lying. She hits the road with her Plymouth Barracuda and with every stop encounters a new cast of characters and strange crimes she can't help but investigate and solve."],
        "movie_year":["(2023– )"],
        "movie_director_cast":["Natasha Lyonne",
          "Benjamin Bratt",
          "Simon Helberg",
          "Brandon Micheal Hall"],
        "movie_tags":["\nCrime, Drama, Mystery            "],
        "movie_star":[8.0],
        "id":"49fe5557-021e-4c2f-98b4-e26c67c35b64",
        "_version_":1760490217854205953},
        
  ];

  const More = MoreList.map(movie =>  <Card key={movie["id"]} movie={movie} />);
   
  return (
    <div style={{display:'flex', flexDirection:'row'}}>
      {More}
    </div>
  );
}

export default MoreLikeThisList;