## System requirements
[Node.js](https://nodejs.org/en/) v15.* or above

To view applications, you must launch server and client apps.
Make sure you launch the server application first, only then launch the client



## Installation Server application
Open terminal in __./server__ folder and run 
```
npm install
```

### Connect database
In __./server__ folder create file __.env__ with content:

<span style='color: red'>
MONGO_KEY=mongodb+srv://admin:admin11@cluster0.cjwnjlm.mongodb.net/?retryWrites=true&w=majority
</span>

### Launch for development
Open terminal in __./server__ folder and run 
```
npm run start:dev
```



## Launching Client application

<div style="padding-left: 40px">

### Installation
Open terminal in __./client__ folder and run 
```
npm install
```

### Lounch for development
Open terminal in __./client__ folder and run 
```
npm start
```
</div>

## Tips

You can log in as an admin to avoid creating a list of movies:

Username:  <span style='color: red'> Admin </span> <br>
Password:  <span style='color: red'>  Admin1 </span>


