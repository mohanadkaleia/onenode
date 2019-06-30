# ONE-NO-DE

[![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/made-with-vue.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

Heyo 👋
One-node is an open source project that supports syncing files between devices without the need to have a central storage space (like in dropbox). One-node uses web-rtc so devices can see each other on the web and send/receive files.

### One-node components:

The project has three main componemnts:

1. **_Signalling server_** 🤖: this is the only central part of the whole project. It makes clients to see each other.. and that is all about it
2. **_Backend side_** 🔥: well since the app is a client side app, it is good to split it into front-end and back-end. The backend is responsible to manage the files and maintain a database of the synced files. In addition, it communicate with the signalling server.
3. **_Frontend side_** 🐥: Yes, this part has the UI and of course it communicates with the backend side of the app.

### Excited to run the app?

The app is still in progress, it has the following dependecies:

- node.js
- vue.js (why vue.js.. because it is easy to learn!)
- Do I need to say HTML/CSS?

One-node requires [Node.js](https://nodejs.org/) v4+ to run. Remember we said the project has three parts, so you have to install dependecies for three projects (I know it sucks now but will change it to only one package.json later)

#### Install dependencies:

```sh
npm install
```

#### Run the migrations:

Well, in order to run the migration, you would need to change the configruations in the config.json. You should have a database schema named as `onenode`, then run the following command.

```sh
node /tools/migrations/wipe_db.js
```

#### Run the Backed server:

```sh
npm run server
```

#### Signalling server:

```sh
npm run signal
```

#### Run client:

```sh
npm run client
```

# NOTE:

The app still in progress (it is not working yet). But, it will be there one day.

## License

MIT (I have no idea what MIT means, but seems good 😂)
