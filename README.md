# Localz Challenge

## Approach to the Problem

Using Node.js and MongodB, a REST API was built. A database stores a list of drivers and can be used to search drivers by their name and ID using a GET request query. Drivers can register with a username, password, firstname, and lastname, which is a POST request from the body, and written and stored into a second user database. Drivers can then login using a username and password using a POST request, where their credentials are compared to the user database and if found, are successfully logged in and a session created. Next, a driver can access a dashboard only if they are logged in using a GET request. Logging out involves checking if the driver session is active (meaning that they are logged in) using a GET request, and then destroying the session. 

Built With
* MongodB
* Node.js

## Installing
Install the following modules. 
````
$ npm install express-session
$ npm install mongodb
$ npm install mongoose
````
Running the tests
Using Postman:
**List all drivers** using http://localhost:3000/localz/drivers and a GET request. 

**Search driver by name** using http://localhost:3000/localz/name?Name=insertnamehere
in a GET request. 

**Search driver by ID** using a query with the key Id using http://localhost:3000/localz/id?Id=insertidhere in a GET request.

To **register a driver**, go to http://localhost:3000/localz/register and use a POST request. Enter a username, password, firstname, and lastname in the body raw, using JSON. 
``
{
 "username" : "bob",
 "password": "password",
 "firstname": "Bob",
 "lastname":"Dylan"
 }
``    

To **login**, go to http://localhost:3000/localz/login and use a POST request. Enter a  username and password into the body using raw and JSON. 
 ````
{
 "username" : "bob",
 "password": "password"
}
````

**Access the dashboard** by http://localhost:3000/localz/dashboard using a GET request. Only accessable if logged in. 

**Logout** using http://localhost:3000/localz/logout in a GET request. Only successful if previously logged in. 



Authors 
* Areej Ali Ahmed
