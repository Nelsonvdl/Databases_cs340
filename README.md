DataBase Backed Website

------Purpose-------
This website backed by a database will provide an extensive list of exoplanets with correlated astronomical entities. These related entities will include the hostSystem, stars, galaxies, and the exoplanet itself. Each of these entities will have attributes most often including a unique ID and name with other individual attributes. Our database will include the 131 TESS confirmed exoplanets. The exoplanet entity will include stellar parameters such as their masses, orbital periods, and radii. Exoplanets in this database will also include identifying parameters such as name, and id. The other entities in this database will contain similar attributes. Relationships between exoplanets, stars, hostSystems, and galaxies will be drawn as shown below. The raw data for this database will be drawn from NASA’s Exoplanet Archive

------Use-------
1)
with node and express installed, while in the Databases_cs340 directory, run:
    npm install
in order to get all dependencies

2)
in dbcon.js add the appropriate credentials for the input 
designated by an *

3)
run the DDQ.sql queries on your desired SQL server with foregin key restraints disabled

4) 
run the server on prefered hosting site or use 
    node app.js 2345
from the terminal where 2345 is the port and can be any open port
