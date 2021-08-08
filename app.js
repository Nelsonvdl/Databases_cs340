/*
    SETUP
*/

// Express
var express = require('express');
var db = require('./dbcon.js');

var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('port', process.argv[2]);

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
    let query1 = 'SELECT * FROM galaxies ;';

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){

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

  let galaxyName = data['input-galaxyName']

  // query to add
  query1 = `INSERT INTO galaxies (galaxyName) VALUES ('${galaxyName}')`;
  db.pool.query(query1, function(error, rows, fields){
    if(error) {
      console.log(error)
      res.sendStatus(400);
  } else {
    res.redirect('/galaxies');
  }
});
});


app.get('/hostSystems', function(req, res){
// Declare Query 1
let query1 = `SELECT h.hostSystemID, g.galaxyName, h.hostSystemName, g.galaxyID FROM hostSystems as h INNER JOIN galaxies as g ON g.galaxyID = h.galaxyID;`;
let query2 = `SELECT * FROM galaxies;`
db.pool.query(query1, function(error, rows, fields){
  let hostSystemsData = rows;
  db.pool.query(query2, function(error, rows, fields){
    let galaxiesData = rows;

    res.render('hostSystems', {data: hostSystemsData, galaxies: galaxiesData});
  });
})
});

// VERY REPETITIVE
// Search by hostSystem
app.post('/hostSystems-search', function(req, res){
// Declare Query 1
let data = req.body;
let galaxyID = data['input-galaxy'];
console.log(data);

    // NEED TO CHECK IF QUERY 1 is empty

let query1 = `SELECT h.hostSystemID, g.galaxyName, h.hostSystemName, g.galaxyID FROM hostSystems as h INNER JOIN galaxies as g ON g.galaxyID = h.galaxyID WHERE g.galaxyName = ('${galaxyID}');`;
let query2 = `SELECT * FROM galaxies;`
db.pool.query(query1, function(error, rows, fields){
  let hostSystemsData = rows;
  db.pool.query(query2, function(error, rows, fields){
    let galaxiesData = rows;

    res.render('hostSystems', {data: hostSystemsData, galaxies: galaxiesData});
  });
})
});


app.post('/add-hostSystem-form', function(req, res) {
  // get incoming data
  let data = req.body;

  let name = data['input-hostSystem'];
  let galaxy = data['input-galaxy']
  // let data = parseInt(data[hostSystemID])
  // query to add
    query1 = `INSERT INTO hostSystems (hostSystemName, galaxyID) VALUES ('${name}', '${galaxy}')`;
  db.pool.query(query1, function(error, rows, fields){
    if(error) {
      console.log(error)
      res.sendStatus(400);
  } else {
    res.redirect('/hostSystems');
  }
});
});

app.get('/stars', function(req, res){

  let data = req.body;
  let galaxyID = data['input-galaxy'];
  console.log(data);
    // Declare Query 1
    // NOT DISPLAYING BOTH THE hostSystem NAME AND galaxy NAME
    let query1 = 'SELECT s.starID, s.starName, s.type, s.temperature, h.hostSystemName FROM stars as s INNER JOIN hostSystems as h ON h.hostSystemID = s.hostSystemID;';

    let query2 = `SELECT * FROM hostSystems;`;
    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){

        // Save the hostSystems
        console.log(rows);
        let stars = rows;
        // hostSystems_string = JSON.stringify(hostSystems)
        console.log('query1 = ' + query1);
        console.log('star = ' + stars)

        db.pool.query(query2, function(error, rows, fields){
          let hostSystemsData = rows;

          // console.log(stars[0])
          res.render('stars', {data: stars, hostSystems: hostSystemsData});
        })


      });
});

// Searches for all the stars in a host System
app.post('/stars-search', function(req, res){

  let data = req.body;
  console.log(data);
  let hostSystemName = data['input-hostSystem'];
  console.log('name ' + hostSystemName);

    // Declare Query 1
    let query1 = `SELECT s.starID, s.starName, s.type, s.temperature, h.hostSystemName FROM stars as s INNER JOIN hostSystems as h ON h.hostSystemID = s.hostSystemID WHERE h.hostSystemName = ('${hostSystemName}');`;

        // NEED TO CHECK IF QUERY 1 is empty

    let query2 = `SELECT * FROM hostSystems;`;
    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){

        // Save the hostSystems
        console.log(rows);
        let stars = rows;

        db.pool.query(query2, function(error, rows, fields){
          let hostSystemsData = rows;

          res.render('stars', {data: stars, hostSystems: hostSystemsData});
        })


      });
});

// Deletes a star from the stars table and exoplanetStarRelationShip table
app.post('/stars-delete', function(req, res){

  let data = req.body;
  console.log(data);
  let name = data['input-star'];
  console.log('name ' + name);

    // Declare Query 1
    let query1 = `ALTER TABLE exoplanetStarRelationShip DROP FOREIGN KEY exoplanetStarRelationShip_ibfk_1;`

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
      // run second query
      let query2 = `DELETE FROM stars WHERE starName = ('${name}');`;
      db.pool.query(query2, function(error, rows, fields){
        let query3 = `ALTER TABLE exoplanetStarRelationShip ADD FOREIGN KEY (starID) REFERENCES stars(starID);`
        db.pool.query(query3, function(error, rows, fields){
          res.redirect('/stars');
        })


      });
    });
});

// Edits a single star
app.post('/stars-edit', function(req, res){

  let data = req.body;

  let name = data["input-star"];
  console.log('name ' + name)
  let starType = data["input-starType"];
  console.log('type ' + starType)

  let starTemp = data["input-starTemp"];
  console.log('temp ' + starTemp)

  let newName = data["input-starNameNew"];
  console.log(newName)

  let hostSystemID = parseInt(data["input-hostSystemID"]);
  console.log('host System ' + hostSystemID)


  // query to update stars
  let query1 = `UPDATE stars SET stars.starName = ('${newName}'), stars.type = ('${starType}'), stars.temperature=('${starTemp}'), stars.hostSystemID=('${hostSystemID}') WHERE stars.StarName = ('${name}');`;
  db.pool.query(query1, function(error, rows, fields){
    if(error) {
      console.log(error)
      res.sendStatus(400);
  } else {
    console.log(rows)
    res.redirect('/stars');
  }
});
});

app.post('/add-star-Form', function(req, res) {
  // get incoming data
  let data = req.body;

  let name = data["input-starName"];
  let starType = data["input-starType"];
  // if (isNaN(starType))
  // {
  //     starType = 'NULL'
  // }
  let starTemp = data["input-starTemp"];
  // if (isNaN(starTemp))
  // {
  //     starTemp = 'NULL'
  // }

  let hostSystemID = parseInt(data["input-hostSystemID"]);

  // query to add stars
  query1 = `INSERT INTO stars (starName, type, temperature, hostSystemID) VALUES ('${name}', '${starType}', '${starTemp}', '${hostSystemID}')`;
  db.pool.query(query1, function(error, rows, fields){
    if(error) {
      console.log(error)
      res.sendStatus(400);
  } else {
    res.redirect('stars');
  }
});
});

app.get('/exoplanets', function(req, res)
{
    // Declare Query 1
    let query1 = `SELECT e.planetID, h.hostSystemName, e.exoplanetName, e.numberOfStars, e.mass, e.orbitalPeriod, e.discovery FROM exoplanets as e INNER JOIN hostSystems as h ON e.hostSystemID = h.hostSystemID;`;

    let query2 = `SELECT * FROM hostSystems;`;

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){

        // Save the exoplanets
        // console.log(rows);
        let planets = rows;

        db.pool.query(query2, function(error, rows, fields){
          let hostSystemsData = rows

        res.render('exoplanets', {data: planets, hostSystems: hostSystemsData});
        })
        // planets_string = JSON.stringify(planets)

      });
});

app.post('/exoplanet-search', function(req, res){

  let data = req.body;
  console.log(data);
  let hostSystemName = data['input-hostSystem'];
  console.log('name ' + hostSystemName);

    // Declare Query 1
    let query1 = `SELECT e.planetID, h.hostSystemName, e.exoplanetName, e.numberOfStars, e.mass, e.orbitalPeriod, e.discovery FROM exoplanets as e INNER JOIN hostSystems as h ON e.hostSystemID = h.hostSystemID WHERE h.hostSystemName = ('${hostSystemName}');`;

    // NEED TO CHECK IF QUERY 1 is empty

    let query2 = `SELECT * FROM hostSystems;`;
    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        // Save the hostSystems
        console.log(rows);
        let stars = rows;

        db.pool.query(query2, function(error, rows, fields){
          let hostSystemsData = rows;

          res.render('exoplanets', {data: stars, hostSystems: hostSystemsData});
        })


      });
});


app.post('/add-exoplanet-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let name = data['input-exoplanetName'];
    let hostSystemID = parseInt(data['input-hostSystemID']);
    let numberOfStars = parseInt(data['input-numberOfStars']);
    if (isNaN(numberOfStars))
    {
        numberOfStars = 'NULL'
    }

    let mass = parseInt(data['input-mass']);
    if (isNaN(mass))
    {
        mass = 'NULL'
    }

    let orbitalPeriod = parseInt(data['input-orbitalPeriod']);
    if (isNaN(orbitalPeriod))
    {
        orbitalPeriod = 'NULL'
    }

    let discovery = parseInt(data['input-discovery']);
    if (isNaN(discovery))
    {
        discovery = 'NULL'
    }

    // Create the query and run it on the database
    let query1 = `INSERT INTO exoplanets (hostSystemID, exoplanetName, numberOfStars, mass, orbitalPeriod, discovery) VALUES ('${hostSystemID}', '${name}', ${numberOfStars}, ${mass}, ${orbitalPeriod}, ${discovery})`;

    let query2 = `SELECT e.planetID, s.starID FROM exoplanets AS e INNER JOIN stars as s ON e.hostSystemID = s.hostSystemID WHERE exoplanetName = ('${name}');`;


    db.pool.query(query1, function(error, rows, fields){

      db.pool.query(query2, function(error, rows, fields){

        let erp = rows;


        for (let i = 0; i < erp.length; i++) {
          let planet = erp[i].planetID;
          let star = erp[i].starID;

          let query3 = `INSERT INTO exoplanetStarRelationShip VALUES ('${star}', '${planet}');`;
          db.pool.query(query3, function(error, rows, fields){
            console.log('added ' + planet + ' ' + star);
        })
      }


          res.redirect('/exoplanets');

        })


      })

    })


app.get('/EPSRelation', function(req, res)
{

    let query1 = `SELECT s.starName, ep.exoplanetName FROM exoplanetStarRelationShip epr INNER JOIN exoplanets ep ON ep.planetID = epr.planetID INNER JOIN stars s ON s.starID = epr.starID;`;


    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){

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
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
