// Mid Term Test
// Student Id: 301217642
// Student Name: Christopher Chantres
// Date March 6

// create a reference to the model
let Movie = require('../models/movie');

// Gets all movies from the Database and renders the page to list all movies.
module.exports.movieList = function(req, res, next) {  
    Movie.find((err, movieList) => {
        // console.log(movieList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('movie/list', {
                title: 'Movie List', 
                movies: movieList
            })            
        }
    });
}

// Gets a movie by id and renders the details page.
module.exports.details = (req, res, next) => {
    
    let id = req.params.id;

    Movie.findById(id, (err, movieToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('movie/details', {
                title: 'Movie Details', 
                movie: movieToShow
            })
        }
    });
}

// Renders the Add form using the add_edit.ejs template
// Requirement  1.a. Fix the Add Button 
// Requirement  2.a. Complete the displayAddPage 
module.exports.displayAddPage = (req, res, next) => {

    res.render("movie/add_edit", {
        title: "AddMovie",
        movie: {},
      });
    console.log("----------> Entering in Adding page")
}

// Processes the data submitted from the Add form to create a new movie
//  Requirement 2.b. Complete the processAddPage 
module.exports.processAddPage = (req, res, next) => {

      let movie1 = Movie({
                Title: req.body.Title,
                Synopsis: req.body.Synopsis,
                Year: req.body.Year,
                Director: req.body.Director,
                Genre: req.body.Genre,
           });
      
      Movie.create(movie1, (err, movie) => {
        if (err)
         {
        return res.status(400).send({
                    success: false,
                    message: getErrorMessage(err),
                });
        } else
        {
            console.log("----------> Adding movie processed!")
            res.redirect("/movie/list");
        }
      });

}

// Gets a movie by id and renders the Edit form using the add_edit.ejs template
// Requirement  1.b. Add an Edit Button 
// Requirement  2.c. Complete the displayEditPage 
module.exports.displayEditPage = (req, res, next) => {
    
    let id = req.params.id;
    Movie.findById(id, (err, movie) => {
      if (err) 
      {
        console.log(err);
        res.end(err);
      } 
      else
      {
        res.render("movie/add_edit", {
          title: "EditMovie",
          movie: movie,
        });
        console.log("----------> Entering in Edit page")
      }
    });

}

// Processes the data submitted from the Edit form to update a movie
// Requirement 2.d. Complete the processEditPage 
module.exports.processEditPage = (req, res, next) => {
        
    let id = req.params.id;
    let movie1 = Movie({
            _id: req.body.id,
            Title: req.body.Title,
            Synopsis: req.body.Synopsis,
            Year: req.body.Year,
            Director: req.body.Director,
            Genre: req.body.Genre,
        });

    Movie.updateOne({ _id: id }, movie1, (err) => {
    if (err)
    {
        console.log(err);
        res.end(err);
    } 
    else 
    {
        console.log("----------> Edditing movie processed!");
      res.redirect("/movie/list");
    }
  });
    
}

// Deletes a movie based on its id.
module.exports.performDelete = (req, res, next) => {
    
    let id = req.params.id;

    Movie.remove({ _id: id }, (err) => {
      if (err)
      {
        res.end(err);
        console.log(err)
      } 
      else
      {
        console.log("----------> Entering in Deleteing movie")
        res.redirect("/movie/list");
      }
    });

}