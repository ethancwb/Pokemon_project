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
instead of a static page. </p> <br />

#### Back end: <br />
<p>  The technologies we used in backend are <b>Node.js and MySQL</b>. Node.js
made it possible for the server side to understand and compile JavaScript and
in addition, we used express.js framework to make it clearer and make the code
more organized. And for the database, we used MySQL and because it is a web-app,
we also connect it to a remote MySQL database hosting server.
<h3> Miscellaneous: </h3>
<p> Besides the technologies mentioned above, there are also a lot of packages/libraries that help the application development. “Bcrypt-nodejs” for user password encryption, “body-parser” for better communication between frontend and backend(passing JSON), ‘pokedex-promist-v2” for getting data from pokemon API and ‘mysql’ for nodejs to connect and pass ad hoc queries or calling mysql procedures. Also we used “nodemon” as a development tool that will automatically restart the server when detects a change in backend. Further details are inside “package.json”.



### UML: ![UML](https://github.com/ethancwb/cs3200_Final_Project/blob/master/UML.png?raw=true) <br />

### Functions: <br />


