-- Get all the galaxies
SELECT * FROM galaxies;

-- Insert new galaxy
INSERT INTO galaxies (galaxyName) VALUES (:galaxyName)

-- Get all the host systems
SELECT * FROM hostSystems;

-- Get the host systems with galaxy name
SELECT h.hostSystemID, g.galaxyName, h.hostSystemName, g.galaxyID FROM hostSystems as h 
INNER JOIN galaxies as g ON g.galaxyID = h.galaxyID;

-- Filter by host system by galaxy name
SELECT h.hostSystemID, g.galaxyName, h.hostSystemName, g.galaxyID FROM hostSystems as h 
INNER JOIN galaxies as g ON g.galaxyID = h.galaxyID WHERE g.galaxyName = (:galaxyID);

-- Insert new host system
INSERT INTO hostSystems (hostSystemName, galaxyID) VALUES (:name, :galaxy)

-- Selecets all the stars with host system name displayed
SELECT s.starID, s.starName, s.type, s.temperature, h.hostSystemName FROM stars as s 
INNER JOIN hostSystems as h ON h.hostSystemID = s.hostSystemID;

-- Filters all the stars by a selected host system
SELECT s.starID, s.starName, s.type, s.temperature, h.hostSystemName FROM stars as s 
INNER JOIN hostSystems as h ON h.hostSystemID = s.hostSystemID WHERE h.hostSystemName = (:hostSystemName);

-- Drops FK for star deletion
ALTER TABLE exoplanetStarRelationShip DROP FOREIGN KEY exoplanetStarRelationShip_ibfk_1;

-- Deletes the star from the table
DELETE FROM stars WHERE starName = (:name);

-- Re adds the FK to the exoplanetStarRelationship
ALTER TABLE exoplanetStarRelationShip ADD FOREIGN KEY (starID) REFERENCES stars(starID);

-- Edits the star
UPDATE stars SET stars.starName = (:newName), stars.type = (:starType), stars.temperature=(:starTemp), stars.hostSystemID=(:hostSystemID) 
WHERE stars.StarName = (:name);

-- Insert new star
INSERT INTO stars (starName, type, temperature, hostSystemID) VALUES (:name, :starType, :starTemp);

-- Selects all the exoplanets with host system name displayed
SELECT e.planetID, h.hostSystemName, e.exoplanetName, e.numberOfStars, e.mass, e.orbitalPeriod, e.discovery FROM exoplanets as e 
INNER JOIN hostSystems as h ON e.hostSystemID = h.hostSystemID;

-- Filters exoplanets by host system
SELECT e.planetID, h.hostSystemName, e.exoplanetName, e.numberOfStars, e.mass, e.orbitalPeriod, e.discovery FROM exoplanets as e 
INNER JOIN hostSystems as h ON e.hostSystemID = h.hostSystemID WHERE h.hostSystemName = (:hostSystemName);

-- Inserts a new exoplanet to the exoplanet table 
INSERT INTO exoplanets (hostSystemID, exoplanetName, numberOfStars, mass, orbitalPeriod, discovery) 
VALUES (:hostSystemID, :name, :numberOfStars, :mass, :orbitalPeriod, :discovery)

--Inserts into exoplanetStarRelationship table
INSERT INTO exoplanetStarRelationShip VALUES (:star, :planet);

-- Selects all the planets and stars for the exoplanetStarRelationship table
SELECT s.starName, ep.exoplanetName FROM exoplanetStarRelationShip epr INNER JOIN exoplanets ep ON ep.planetID = epr.planetID INNER JOIN stars s ON s.starID = epr.starID;