DROP TABLE IF EXISTS galaxies;
CREATE TABLE galaxies (
  galaxyID INT(11) AUTO_INCREMENT PRIMARY KEY,
  galaxyName varchar(255)
);

INSERT INTO galaxies VALUES (1, 'NGC'), (2, 'E0102'), (3, 'Unknown'), (4, 'Milky Way');

DROP TABLE IF EXISTS hostSystems;
CREATE TABLE hostSystems (
 hostSystemID INT(11) AUTO_INCREMENT PRIMARY KEY,
 hostSystemName varchar(255),
 galaxyID INT(11) NOT NULL,
 FOREIGN KEY (galaxyID) REFERENCES galaxies(galaxyID)
 ON DELETE CASCADE
);

INSERT INTO hostSystems VALUES (1, 'AU Mic', 1),  (2, 'DS Tuc', 2), (3, 'GJ 1252', 3), (4, 'GJ 143', 4), (5, 'Sol System', 4);

DROP TABLE IF EXISTS stars;
CREATE TABLE stars (
  starID int(11) AUTO_INCREMENT PRIMARY KEY,
  starName varchar(255),
  type varchar(255),
  temperature int(11),
  hostSystemID int(11),
  FOREIGN KEY (hostSystemID) REFERENCES hostSystems(hostSystemID)
  ON DELETE CASCADE
);

INSERT INTO stars VALUES (1, 'AU Mic', NULL, NULL, 1), (2, 'DS Tuc B', NULL, NULL, 2), (3, 'DS Tuc A', NULL, NULL, 2), (4, 'GJ 1252', NULL, 3458, 3), 
(5, 'GJ 143', NULL, 4571, 4), (6, 'Sol', 'Yellow Dwarf Star', 6000, 5);

DROP TABLE IF EXISTS exoplanets;
CREATE TABLE exoplanets (
  planetID INT(11) AUTO_INCREMENT PRIMARY KEY,
  hostSystemID INT(11) NOT NULL,
  FOREIGN KEY (hostSystemID) REFERENCES hostSystems(hostSystemID) ON DELETE CASCADE,
  exoplanetName varchar(255),
  numberOfStars INT(11) NOT NULL,
  mass INT(11),
  orbitalPeriod INT(11),
  discovery INT
 );

INSERT INTO exoplanets VALUES (1, 2, 'DS Tuc A b', 2, NULL, 8.138268, 2019), (2, 3, 'GJ 1252 b', 1, 0.00858, 0.5182349, 2020),
(3, 4, 'HD 21749 c', 1, 0.68, 7.78993, 2019), (4, 4, 'GJ 143 b', 1, 2.61, 35.61253, 2019), (5, 5, 'Mercury', 1, 0.055, 88, 265), (6, 5, 'Venus', 1, 0.0815, 255, 1610), (7, 5, 'Earth', 1, 1, 365, NULL),
(8, 5, 'Mars', 1, 0.107, 687, 1659), (9, 5, 'Jupiter', 1, 317.8, 4333, 1610), (10, 5, 'Saturn', 1, 95.16, 10756, 1610), (11, 5, 'Uranus', 1, 14.54, 30688.5, 1781), 
(12, 5, 'Neptune', 1, 17.15, 60225, 1846); 


DROP TABLE IF EXISTS exoplanetStarRelationShip;
CREATE TABLE exoplanetStarRelationShip (
  starID INT(11),
  FOREIGN KEY (starID) REFERENCES stars(starID),
  planetID INT(11),
  FOREIGN KEY (planetID) REFERENCES exoplanets(planetID)
  ON DELETE CASCADE
);

INSERT INTO exoplanetStarRelationShip VALUES (2, 1), (3, 1), (4, 2), (5, 3), (5, 4), (6, 5), (6, 6), (6, 7), (6, 8), (6, 9), (6, 10), (6, 11), (6, 12);