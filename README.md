# Project: Pokemon Fight <br />
## Creator: Wenbin Chen & Scott Chen <br />
### URL: https://cs3200-final-project.herokuapp.com/#!/ <br />

### Install guide: <br />
1. Install node.js to your local machine if you don’t have one. Type: “brew install node” in terminal to install or go to https://nodejs.org/en/download/ to download it. <br />
2. Clone or download the web package to local. <br />
3. Open your console and direct yourself inside the project folder. <br />
4. Run Command: “npm install” to install all the project dependencies. <br />
5. Run Command: “node server.js” or  “npm run begin” to serve the web-app locally. <br />
6. Our project runs in port 8080 in default, so Open your browser and put in: “localhost:8080“ to enter the webapp. <br />
<br />
Note: You still need to connect to internet even you choose to run the project locally, since our backend database still needs to connect to the remote database server. A better way is just go to our online instance: https://cs3200-final-project.herokuapp.com <br />


### Architecture: <br />
#### Front end: <br />
<p> The technologies we used in front end are <b>HTML, SASS and JavaScript</b>.
HTML helps us to build the basic structure of our web and SASS is responsible
for rendering the plain materials. JavaScript, more specifically Angular.js
framework along with Jquery library, helps us to make our website more dynamic
instead of a static page. </p>
<br />

#### Back end: <br />
<p>  The technologies we used in backend are <b>Node.js and MySQL</b>. Node.js
made it possible for the server side to understand and compile JavaScript and
in addition, we used express.js framework to make it clearer and make the code
more organized. And for the database, we used MySQL and because it is a web-app,
we also connect it to a remote MySQL database hosting server. <p>
<br />

#### Miscellaneous: <br />
<p> Besides the technologies mentioned above, there are also a lot of packages/libraries that help the application development. “Bcrypt-nodejs” for user password encryption, “body-parser” for better communication between frontend and backend(passing JSON), ‘pokedex-promist-v2” for getting data from pokemon API and ‘mysql’ for nodejs to connect and pass ad hoc queries or calling mysql procedures. Also we used “nodemon” as a development tool that will automatically restart the server when detects a change in backend. Further details are inside “package.json”.<p> 
<br />




### UML: ![UML](https://github.com/ethancwb/cs3200_Final_Project/blob/master/UML.png?raw=true) <br />

### Schema: <br />
1. Users: 
table of recording user_id, user_name, user_password, user_level. Used “bcrypt library” for user password, which hashed the user_password before storing it into the database. In this case, only the users know what is their password. For people who are managing the database can only see its hash value. For example the user_password, “1”, in our database is stored as “$2a$10$IskFrTUQ563DPpPkRfYAyOGT0d5jdsjbtZZ72FM12EWShecKfSyXG”. <br />
 
2. Pokemons: This table is for storing basic pokemon stats (name, id, type, attack, defense, speed) in order to perform all the other functionalities. Used “pokeapi” (https://pokeapi.co/) for loading basic stats all the 721 pokemons. Used “pokemon sprites” (https://github.com/msikma/pokesprite) and “pokemon api sprites” (https://github.com/PokeAPI/sprites) for loading images. <br />
 
3. Type_table: This table stores all the pokemon types. <br />
 
4. Poke_types: For showing some pokemons may have multiple types, we need this table to store the types associating with the poke_ids of which pokemons are having this type in order to generate a many to many relationship. <br />
 
5. Type_weak_against: This table stores pokemon types that a specific type is weak against. By having this information, we could use it for future battling algorithm optimization. <br />

6. Type_strong_against: This table stores pokemon types that a specific type is strong against. It has the same functionalities as the type_weak_against. <br />
 
7. Owns: Users and pokemons many to many relationship, which stores the user_id, and all the pokemon stats, it order to represent user's’ pokemon lists. <br />
 
8. Battle_history: As the its name described, this table stores all the battle records. When users have some number of wins could result in a level up. Currently, we set every 10 wins for 1 level up. <br />
 
9. Berry: stores all the berries which are pokemon foods, which we also loaded from third party APIs. This table could be used for future implementation. Such as recovering a pokemon which has low HP. <br />



### Functions: <br />



