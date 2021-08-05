
-- Get all the stars
SELECT starID, name, type, temperature, hostSystemID FROM stars

-- Get specific star data for updating
SELECT starID, name, type, temp, hostSystemID WHERE starID = :starIDInput

-- Inserting into stars
INSERT INTO stars (starID, name, type, temperature, hostSystemID)
VALUES (:starIDInput, :nameInput, :typeInput, :temperatureInput, :hostSystemIDInput)


-- Insert new planet
INSERT INTO exoplanets (planetID, hostSystemID, name, numberOfStars, mass, orbitalPeriod, discovery)
VALUES (:planetIDInput, :hostSystemIDInput, :nameInput, :numberOfStarsInput, :massInput, :orbitalPeriodInput, :discoveryInput)

-- Insert into galaxies
INSERT INTO galaxies (galaxyID, name)
VALUES (:galaxyIDInput, :galaxyNameInput)

-- Make a SELECT query that selects all the hostSystems from a given galaxy
SELECT h.name FROM hostSystems as h
INNER JOIN galaxies as g
ON g.galaxyID = h.galaxyID
WHERE g.name = (:galaxyIDInput)

-- DELETE galaxy
DELETE FROM galaies where ID = :galaxyInput

-- Update the host systems
UPDATE hostSystems SET name = :nameInput, galaxy = :galaxyInput
WHERE id = :hostSystemUpdateForm

-- Delete from host system
DELETE FROM hostSystems where ID = :hostSystemIDInput

-- Get all the host systems
SELECT hostSystemID, name, galaxyID FROM hostSystems


-- Get specific host system data for updating
SELECT hostSystemID, name WHERE hostSystemID = :hostSystemIDInput


-- Inserting into host systems
INSERT INTO hostSystems (hostSystemID, name, galaxyID)
VALUES (:hostSystemIDInput, :nameInput, :galaxyIDInput)

-- Make a SELECT query that selects all the stars from a given hostSystem
SELECT s.name FROM stars as s
INNER JOIN hostSystems as h
ON s.hostSystemID = h.hostSystemID
WHERE h.name = (:hostSystemNameInput)
