export const sorter = [
    {
      sort: "movie/show year descending",
      func: ()=>function (a,b){
            return b.movie_year-a.movie_year
            }
    },
    {
    sort: "movie/show year ascending",
    func: ()=>function (a,b){
        return a.movie_year-b.movie_year
        }
    },
    {
    sort: "movie/show rating ascending",
    func: ()=>function (a,b){
        return a.movie_star-b.movie_star
        }
    },
    {
    sort: "movie/show rating descending",
    func: ()=>function (a,b){
        return b.movie_star-a.movie_star
        }
    },
    {
        sort: "default",
        func: ()=>function (a,b){
            return
            }
        },

  ];
	 	 
 	
  	 	 	 
  	 	 	 
  	 	 	
  	 	 	 
  	 