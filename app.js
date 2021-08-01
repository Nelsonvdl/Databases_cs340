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

app.get('/', function(rec, res){
  res.render('index');
});

// GET ROUTES
app.get('/galaxies', function(req, res)
{
    // Declare Query 1
    let query1 = "SELECT * FROM galaxies ;";

    // Run the 1st query
    db.query(query1, function(error, rows, fields){

        // Save the galaxies
        console.log(rows);
        let galaxies = rows;
        // galaxy_string = JSON.stringify(galaxies)
        // return res.send('galaxies', galaxy_string);
        res.render('galaxies', {data: galaxies});
      });
});


app.post('/add-Galaxy-Form', function(req, res) {
  // get incoming data
  let data = req.body;

  let name = data.name;
  let galaxyID = data.galaxyID;

  // query to add
  query1 = `INSERT INTO galaxies (fname, lname, homeworld, age) VALUES ('${data[':galaxyNameInput']}')`;
  db.query(query1, function(error, rows, fields){
    if(error) {
      console.log(error)
      res.sendStatus(400);
  } else {
    res.redirect('/galaxies');
  }
});
});


app.get('/hostSystems', function(req, res)
{
    // Declare Query 1
    // NOT DISPLAYING BOTH THE hostSystem NAME AND galaxy NAME
    let query1 = 'SELECT h.hostSystemID, g.name, h.name FROM hostSystems as h INNER JOIN galaxies as g ON g.galaxyID = h.galaxyID;';

    // Run the 1st query
    db.query(query1, function(error, rows, fields){

        // Save the hostSystems
        console.log(rows);
        let hostSystems = rows;
        // hostSystems_string = JSON.stringify(hostSystems)
        console.log('query1 = ' + query1);
        console.log('hostSystem = ' + hostSystems)
        console.log(hostSystems[0])
        res.render('hostSystems', {data: hostSystems});
      });
});

// app.post('/add-hostSystem-Form', function(req, res) {
//   // get incoming data
//   let data = req.body;
//
//   let name = data.name;
//   let hostSystemID = data.hostSystemID
//   // query to add
//   query1 = 'INSERT INTO hostSystems (name, galaxyID) VALUES ('${data[':hostSystemNameInput']}, ${galaxyID}')';
//   db.query(query1, function(error, rows, fields){
//     if(error) {
//       console.log(error)
//       res.sendStatus(400);
//   } else {
//     res.redirect('/hostSystems');
//   }
// });
// });


app.get('/stars', function(req, res)
{
    // Declare Query 1
    // NOT DISPLAYING BOTH THE hostSystem NAME AND galaxy NAME
    let query1 = 'SELECT s.starID, s.name, s.type, s.temperature, s.hostSystemID, h.hostSystemID FROM stars as s INNER JOIN hostSystems as h ON h.hostSystemID = s.hostSystemID';

    // Run the 1st query
    db.query(query1, function(error, rows, fields){

        // Save the hostSystems
        console.log(rows);
        let stars = rows;
        // hostSystems_string = JSON.stringify(hostSystems)
        console.log('query1 = ' + query1);
        console.log('star = ' + stars)
        // console.log(stars[0])
        res.render('stars', {data: stars});
      });
});


app.post('/add-star-Form', function(req, res) {
  // get incoming data
  let data = req.body;

  let name = data.name;
  let starID = data.starID
  // query to add
  query1 = `INSERT INTO stars (name, type, temperature, hostSystemID) VALUES ('${data['::nameInput']}, ${data[':typeInput']}, ${data[':temperatureInput']}, ${data[':hostSystemIDInput']}')`;
  db.query(query1, function(error, rows, fields){
    if(error) {
      console.log(error)
      res.sendStatus(400);
  } else {
    res.redirect('/stars');
  }
});
});

app.get('/exoplanets', function(req, res)
{
    // Declare Query 1
    let query1 = 'SELECT e.planetID, e.hostSystemID, e.name, e.numberOfStars, e.mass, e.orbitalPeriod, e.discovery FROM exoplanets as e INNER JOIN hostSystems as h ON e.hostSystemID = h.hostSystemID;';

    // Run the 1st query
    db.query(query1, function(error, rows, fields){

        // Save the exoplanets
        console.log(rows);
        let planets = rows;
        planets_string = JSON.stringify(planets)
        res.render('exoplanets', {data: planets});
      });
});



app.post('/add-exoplanet-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO exoplanets (hostSystemID, name, numberOfStars, mass, orbitalPeriod, discovery) VALUES ('${data[':hostSystemIDInput']}', '${data[':nameInput']}', ${data[':numberOfStarsInput']}, ${data[':massInput']}, ${data[':orbitalPeriodInput']}, ${data[':discoveryInput']})`;
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
            res.redirect('/exoplanets');
        }
    })
})

app.get('/EPSRelation', function(req, res)
{
    // Declare Query 1
    // let query1 = 'SELECT e.name, h.name FROM exoplanets as e INNER JOIN hostSystems as h ON e.planetID = h.hostSystemID';
    let query1 = 'SELECT * FROM exoplanetStarRelationShip;';

    // Run the 1st query
    db.query(query1, function(error, rows, fields){

        // Save the exoplanets
        console.log(rows);
        let epsr = rows;
        planets_string = JSON.stringify(epsr)
        res.render('EPSRelation', {data: epsr});
      });
});



/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
