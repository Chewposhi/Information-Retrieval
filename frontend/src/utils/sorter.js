export const sorter = [
    {
      sort: "movie year descending",
      func: ()=>function (a,b){
            return b.movie_year-a.movie_year
            }
    },
    {
    sort: "movie year ascending",
    func: ()=>function (a,b){
        return a.movie_year-b.movie_year
        }
    },
    {
    sort: "movie rating ascending",
    func: ()=>function (a,b){
        return a.movie_star-b.movie_star
        }
    },
    {
    sort: "movie rating descending",
    func: ()=>function (a,b){
        return b.movie_star-a.movie_star
        }
    },

  ];
	 	 
 	
  	 	 	 
  	 	 	 
  	 	 	
  	 	 	 
  	 