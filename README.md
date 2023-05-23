# The backend for my [PeripheralsManager](https://github.com/3ncy/PeripheralsManager) repository.

## Running
- set up the .env variables, check next section for more info
- install `node.js` (and npm, if it's not installed automatically)
- run `npm i` in the project directory
- after all packages are successfully restored, run `node index.js` to start the API

### .env
The easiest way to set up the environment variables needed to run this project is by creating a copy of the file `.env.example` and renaming it to `.env`.  
Everything there is commented, but there are three important sections:
* Website config
    -  Contains the port on which the API will run. Make sure it is accessible for the connecting clients, you might need to modify your firewall rules.
* Database config
    - Contains all the neccessary info to connect to a PostreSQL database.
* Auth config 
    - Contains paths to your public/private key files. Those should be generated with the OpenSSH format.
    - The keys can be used to encrypt the traffic from client to the server when he is sending senstive information.

----

## Compiling
There are no special steps, this project is in plain JS, not TS, so you can just follow the steps in the **Running** section

----

The API docs are accessible at the path `<ip>:PORT/api-docs/`