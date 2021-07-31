DROP TABLE IF EXISTS galaxies;
CREATE TABLE galaxies (
  galaxyID INT(11) AUTO_INCREMENT PRIMARY KEY,
  name varchar(255)
);

INSERT INTO galaxies VALUES (1, 'NGC'), (2, 'E0102'), (3, 'Unknown'), (4, 'Milky Way');

DROP TABLE IF EXISTS hostSystems;
CREATE TABLE hostSystems (
 hostSystemID INT(11) AUTO_INCREMENT PRIMARY KEY,
 name varchar(255),
 galaxyID INT(11) NOT NULL,
 FOREIGN KEY (galaxyID) REFERENCES galaxies(galaxyID)
);

INSERT INTO hostSystems VALUES (1, 'AU Mic', 1),  (2, 'DS Tuc', 2), (3, 'GJ 1252', 3), (4, 'GJ 143', 4);

DROP TABLE IF EXISTS stars;
CREATE TABLE stars (
  starID int(11) AUTO_INCREMENT PRIMARY KEY,
  name varchar(255),
  type varchar(255),
  temperature int(11),
  hostSystemID int(11),
  FOREIGN KEY (hostSystemID) REFERENCES hostSystems(hostSystemID)
);

INSERT INTO stars VALUES (1, 'AU Mic', NULL, NULL, 1), (2, 'DS Tuc B', NULL, NULL, 2), (3, 'DS Tuc A', NULL, NULL, 2), (4, 'GJ 1252', NULL, 3458, 3), (5, 'GJ 143', NULL, 4571, 4);

DROP TABLE IF EXISTS exoplanets;
CREATE TABLE exoplanets (
  planetID INT(11) AUTO_INCREMENT PRIMARY KEY,
  hostSystemID INT(11) NOT NULL,
  FOREIGN KEY (hostSystemID) REFERENCES hostSystems(hostSystemID),
  name varchar(255),
  numberOfStars INT(11) NOT NULL,
  mass INT(11),
  orbitalPeriod INT(11),
  discovery INT
);

INSERT INTO exoplanets VALUES (1, 2, 'DS Tuc A b', 2, NULL, 8.138268, 2019), (2, 3, 'GJ 1252 b', 1, 0.00858, 0.5182349, 2020),
(3, 4, 'HD 21749 c', 1, 0.68, 7.78993, 2019), (4, 4, 'GJ 143 b', 1, 2.61, 35.61253, 2019);


DROP TABLE IF EXISTS exoplanetStarRelationShip;
CREATE TABLE exoplanetStarRelationShip (
  starID INT(11),
  FOREIGN KEY (starID) REFERENCES stars(starID),
  planetID INT(11),
  FOREIGN KEY (planetID) REFERENCES exoplanets(planetID)
);

INSERT INTO exoplanetStarRelationShip VALUES (2, 1), (3, 1), (4, 2), (5, 3), (5, 4);
