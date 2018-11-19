# ONE-NO-DE

Heyo 👋 
One-node is an open source project that supports syncing files between devices without the need to have a central storage space (like in dropbox). One-node uses web-rtc so devices can see each other on the web and send/receive files. 


### One-node components:
The project has three main componemnts: 
1. ***Signalling server*** 🤖: this is the only central part of the whole project. It makes clients to see each other.. and that is all about it
2. ***Backend side*** 🔥: well since the app is a client side app, it is good to split it into front-end and back-end. The backend is responsible to manage the files and maintain a database of the synced files. In addition, it communicate with the signalling server.
3. ***Frontend side*** 🐥: Yes, this part has the UI and of course it communicates with the backend side of the app.

### Excited to run the app?
The app is still in progress, it has the following dependecies:
* node.js 
* vue.js (why vue.js.. because it is easy to learn!)
* Do I need to say HTML/CSS?

One-node requires [Node.js](https://nodejs.org/) v4+ to run. Remember we said the project has three parts, so you have to install dependecies for three projects (I know it sucks now but will change it to only one package.json later)

#### Client side: 
```sh
cd client
npm install
npm dev run
```
#### Backedn side: 
```sh
cd server
npm install
node app.js
```
#### Signalling server:
```sh
npm install
node app.js
```

# NOTE:
The app still in progress (it is not working yet). But, it will be there one day. 

License
----

MIT (I have no idea what MIT means, but seems good 😂)
