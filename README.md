## Project with React, Express, MySQL

## MySQL: 
1. XXAMP as local Server
2. Heidi used to access to database

Code to create the database: copy code into db.sql file and paste it in Heidi consults.

## Quick Start

Create user and database in mysql:

1. Install the database:
In the terminal log in as root and used the sample.sql file included in this repo

```
mysql -u root
mysql> source Act_tac.sql;
```

At this point you can test the actual connection to the database.

```
mysql> use database;
mysql> show tables;
```

You should get:

```
+--------------------+
| Tables_in_database |
+--------------------+
| act                |
| tac_table          |
+--------------------+
2 row in set (0.00 sec)
```

Modify the user and password that you are going to use to access the database in the server.js file:
```
app.use(myConnection(mysql, {
  host: 'localhost', 
  user: 'yourUser',
  password: 'YourPassword', 
  port: 3306, 
  database: 'database'}, 'single'));
```

3. Install server and client packages

``` bash
# Install dependencies for server
npm install

# Install amchart
npm install @amcharts/amcharts4

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000

```

## React Express Starter Pack

Full stack apps with React and Express.
https://github.com/bradtraversy/react_express_starter 

### Redux Version
[Click Here For Redux Version](https://github.com/bradtraversy/react_redux_express_starter) 

###  React Express Starter Packs Author

Brad Traversy
[Traversy Media](http://www.traversymedia.com)




