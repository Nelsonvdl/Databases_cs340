/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Static Files
app.use(express.static('public'));

// Handlebars
var exphbs = require('express-handlebars');
const { query } = require('express');
app.engine('.hbs', exphbs({
    extname: ".hbs"
}));
app.set('view engine', '.hbs');


PORT = 9125;

// Database
// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var db = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_crawzach',
  password        : '3652',
  database        : 'cs340_crawzach'
});

/*
    ROUTES
*/

// GET ROUTES
app.get('/galaxies_test', function(req, res)
{
    // Declare Query 1
    let query1 = "SELECT * FROM galaxies;";

    // Run the 1st query
    db.query(query1, function(error, rows, fields){

        // Save the galaxies
        console.log(rows);
        let galaxies = rows;
        galaxy_string = JSON.stringify(galaxies)
        return res.send(galaxy_string);
      });
});

app.get('/hostSystems', function(req, res)
{
    // Declare Query 1
    let query1 = "SELECT * FROM hostSystems;";

    // Run the 1st query
    db.query(query1, function(error, rows, fields){

        // Save the hostSystems
        console.log(rows);
        let hostSystems = rows;
        hostSystems_string = JSON.stringify(hostSystems)
        return res.send(hostSystems);
      });
});


app.get('/stars', function(req, res)
{
    // Declare Query 1
    let query1 = "SELECT * FROM stars;";

    // Run the 1st query
    db.query(query1, function(error, rows, fields){

        // Save the stars
        console.log(rows);
        let stars = rows;
        star_string = JSON.stringify(stars)
        return res.send(star_string);
      });
});

app.get('/exoplanets', function(req, res)
{
    // Declare Query 1
    let query1 = "SELECT * FROM exoplanets;";

    // Run the 1st query
    db.query(query1, function(error, rows, fields){

        // Save the exoplanets
        console.log(rows);
        let planets = rows;
        planets_string = JSON.stringify(planets)
        return res.send(planets_string);
      });
});



app.post('/add-person-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let homeworld = parseInt(data['input-homeworld']);
    if (isNaN(homeworld))
    {
        homeworld = 'NULL'
    }

    let age = parseInt(data['input-age']);
    if (isNaN(age))
    {
        age = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES ('${data['input-fname']}', '${data['input-lname']}', ${homeworld}, ${age})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/');
        }
    })
})

/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
