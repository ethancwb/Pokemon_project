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



### Functions & Procedures: <br />
1. AddBattleHistory: to record a battle result, which takes in the battle_id, user_id, and game_result. It also updated the user_level when this user have multiple of 10 wins. <br />
2. AddBerry: to add berrry information into database, used for third party API loading. <br />
3. AddNewOwn: to add a new user-pokemon relationship record, by taking randomized values based on user level number from backend. In other words. The higher level this user has, the stronger pokemon he/she can catch. <br />
4. AddPokeType: which adds a new pokemon type for initializing database. <br />
5. AddStrongAgainst: which adds pokemon types relationship for initializing databse. <br />
6. Delete_pokemon: to delete a record from the user-pokemon relationship. In other words, it removes a pokemon from the user’s pokemon collections. <br />
7. Find_user_by_credential: which verified user_name and user_password in MySQL database. Returned the user information if values are matched, in order to render user profiles in front end. <br />
8. GenerateRandomTeam: in order to perform the user-computer battling feature, this procedure helps to generate a three-pokemon team by taking three random poke_id from backend. <br />
9. Get_allBerries: to perform the search berry feature, which returns all the berry records in the database. <br />
10. Get_all_pokemons: to retrieve all the pokemons of a specific user, in order to render user’s pokemon collection in front end. <br />
11. GetAllTypes: since some pokemons have multiple types, and MySQL can not store a list in a column, so we would use this function to join multiple tables together in order to perform our search pokemon by types feature. <br />
12. Get_favorite_pokemon_by_uid: to retrieve all the user’s favorite pokemons. In order to render the user’s battle team in front end. <br />
13. GetInforTableById: to retrieve all the pokemon information in order to perform the search by poke_id feature. <br />
14. GetInforTableByname: to retrieve all the pokemon information in order to perform the search by poke_name feature. <br />
15. Get_pokemon_by_id: to retrieve a specific pokemon by its poke_id. <br />
16. Get_pokemon_by_name: to retrieve a specific pokemon by its poke_name. <br />
17. Get_pokemon_by_type: to retrieve a list of pokemons by specifying a poke_type. <br />
18. GetTypesForId: to retrieve all the types of a specific pokemon. <br />
19. GetUserById: to retrieve all the user information by giving a user_id. <br />
20. Get_user_by_name: to retrieve all the user information by giving a user_name. <br />
21. Regisration: to register a user. <br />
22. SearchStrongAgainst: return a list of types that the given type is strong against. <br />
23. SearchWeakAgainst: return a list of types that the give type is weak against. <br />
24. Update_favorite: for users to dynamically choose or unchoose a pokemon to be his/her favorite pokemon. <br />
25. Update_user: to update the user’s profile. <br />


### Lessons Learned: <br />
<p>At the start of the project, our initial goal was just build a online Pokedex-like database that helps users to search for pokemon datas. The user and battle simulation part was our optional goal. But when we actually begin to develop this project, we feel really enthusiastic about it and decided to move further from on our original scope. Although this project took us almost a week effort to reach the current state, but we consider it as a great opportunity to enhance our knowledge on both MySQL database as well as web development. </p>
 
<p>And since we are in summer session, we don’t really have too much time on developing the project. If more time is given, we will definitely not use Angularjs as the front end since it is outdated. We will much prefer to use it as an opportunity to learn ReactJs or Angular 2. 
Also, because of the limited time, we didn’t fully follow the Best Practices. This will make our code harder for further maintenance or improvements. Although our code work fine, there are still a lot of places that we can improve to to achieve a better efficiency. </p>

<p>At last, we didn’t fully implement the web application in the manner of mobile-first design. We didn’t start the UI design from mobile which leads to a huge problem in the end which wasted us a lot of time to make it responsive(and it is not working for one page still). This taught us a lesson that we should “ALWAYS START WITH MOBILE VIEW!!”. 
 
### Related sources: <br />
<p>Pokemon Sprites: https://github.com/msikma/pokesprite</p>
<p>Pokemon API Sprites: https://github.com/PokeAPI/sprites</p>
<p>Pokemon API Promise-v2: https://github.com/PokeAPI/pokedex-promise-v2</p>
<p>Pokeapi.com: https://pokeapi.co/</p>
<p>PokeDex Official site: http://www.pokemon.com/us/pokedex</p>
<p>Bulbapedia: https://bulbapedia.bulbagarden.net/wiki</p>






