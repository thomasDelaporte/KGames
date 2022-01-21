# KGames

> `KGames` is a rough copy of the official (game) website of [Kameto Corp](https://kgames.fr/). under ReactJS, NodeJS (with PostgreSQL database), GraphQL and Websocket technologies.


`KGames` enables you to own your game server and client with all the games 
available on the official website of [Kgames](https://kgames.fr). You can update
the database your self so you can have specific question adapted to your
group of friends.


## Features

By now, the features of KGames we're focusing:

- [x] User session
    - [x] Login through Google account
    - [x] Login through Twitch account
- [x] Room session
- [ ] Lobby management (Connection/Disconnection/Configuration/Game select).
- [ ] Games server API
- [ ] Games
    - [x] KCulture
    - [x] Geoquizz
    - [ ] Undercover
    - [ ] Spyfall
    - [ ] Imposter


## How to Contribute

### Get the code

Requires `npm` or `yarn`. 

```
git clone  https://github.com/thomasDelaporte/KGames.git
cd KGames
npm install
```

### Start the dev server

To work on the project, you should have one CLI for the server and 
another one for the web client.

Before running commands below, you need to build the `common` package:

```
npm run common:build
```

You'll need to create an .env file for `web` and `server` package based
on the `env.example` file given.

Main commands that you'll use for development:

```
npm run web:dev
npm run server:dev
```

### Build the app

To build the projet you have the commands:

```
npm run web:build
npm run server:build
```

### Contributing

Contributions and feed back are welcome following Github workflow.


## License

`KGames` is provided under the MIT license.
