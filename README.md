# Your First Server Application

Deployment Link: https://swe-8-1-first-server-michaels2533.onrender.com

- [Setup](#setup)
- [Starter Code](#starter-code)
- [Grading](#grading)
- [Step 1 — Server Setup](#step-1--server-setup)
- [Step 2 — Creating API Endpoints](#step-2--creating-api-endpoints)
- [Step 3 — Add A Route Logger Middleware](#step-3--add-a-route-logger-middleware)
- [Step 4 — Serving Static Assets](#step-4--serving-static-assets)
- [Step 5 — Deploy](#step-5--deploy)

## Setup

For guidance on setting up and submitting this assignment, refer to the Marcy lab School Docs How-To guide for [Working with Short Response and Coding Assignments](https://marcylabschool.gitbook.io/marcy-lab-school-docs/fullstack-curriculum/how-tos/working-with-assignments#how-to-work-on-assignments).

After cloning your repository, make sure to run the following commands:

```sh
git checkout -b draft
```

## Starter Code

You will be given a blank repo for this one! You are building a server from scratch and will go through all the steps to set up a new Express project.

## Grading

Instead of automated tests, your grade on this assignment will be determined by the number of tasks you are able to complete. Tasks appear as a checkbox, like this:

- [ ] example of an incomplete task
- [x] example of an completed task

Feel free to mark these tasks as complete/incomplete as you go. Your instructor may modify your tasks as complete/incomplete when grading.

This assignment has 19 requirements:
- 6 server setup requirements
- 9 server API requirements
- 3 static asset requirements
- 1 deployment task

You got this!

**Server Setup Requirements**

- [ ] The root of the repository has a `server` folder with an `index.js` file and a `package.json` file inside (you will need to create this folder and these files!)
- [ ] `package.json` has `express` installed as a dependency
- [ ] `package.json` has `nodemon` as a dev dependency (use the `-D` flag when installing)
- [ ] `package.json` has a `"start"` script that uses `node` to run the `index.js` file and a `"dev"` script that uses `nodemon` to run `index.js`.
- [ ] In `index.js`, the `express()` function is used to create an `app`
- [ ] The `app` listens on an available port (I recommend `8080`)

**Server API Requirements**

- [ ] A `logRoutes` middleware controller prints the request method, url, and time of request for every request sent to the server, and then invokes the `next()` middleware in the chain.
- [ ] The server has a `GET /api/joke` endpoint that responds with a joke of your choosing!
- [ ] The server has a `GET /api/picture` endpoint that responds with the URL of a picture of your choosing (use a URL from the internet!)
- [ ] The server has a `GET /api/rollDie` endpoint that responds with an array containing a random dice roll.
- [ ] The `GET /api/rollDie` endpoint uses a `?quantity=` query parameter to specif the number of die rolls to be added to the `rolls` array.

**Static Assets Requirements**

- [ ] The root of the repository contains a Vite + React application. The folder containing the project is a sibling of `server`
- [ ] The `path` module and `__dirname` are used to generate an absolute path to the `dist/` folder of your React application
- [ ] The `express.static()` middleware serves the static assets in the React application's `dist/` folder.

**Deployment Technical Requirements**

- [ ] The project is deployed using Render and the link is listed at the top of this README.

## Step 1 — Server Setup

> ✅ You will know that you've completed this step when you can run `npm run dev` and `npm run start` to execute your `index.js` file.

**Create your files:**
* Create a `server` folder and `cd` into it.
* Run `npm init -Y` to create a `package.json` file.
* Create an `index.js` file in the `server` folder.

**Configure package.json**
* Run `npm i express` to install express
* Run `npm i -D nodemon` to install Nodemon as a dev dependency
* Modify the `package.json` file with the following `"scripts"`:

```json
"scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js"
},
```

While working on your server, use `npm run dev` to run the server and have it restart whenever you make changes.

When deploying, you will use the `npm start` command to start the server using the normal `node` command.

## Step 2 — Creating API Endpoints

> ✅ You will know that you've completed this step when you can run your server at [http://localhost:8080](http://localhost:8080) and send requests to each of your endpoints (e.g. [http://localhost:8080/api/joke](http://localhost:8080/api/joke)).

Now it is time to write the server application! Refer to the [lecture notes](https://marcylabschool.gitbook.io/marcy-lab-school-docs/mod-8-backend/1-intro-to-express) to build your Express server application.

In total, your application will have 3 endpoints:

1. Create a `GET /api/picture` endpoint that responds with the URL of a picture of your choosing (use a URL from the internet!)
    - Request URL: [http://localhost:8080/api/picture](http://localhost:8080/api/picture)
    - Response Structure: `{ src: "" }`
    - Example Response: `{ src: "https://static-cdn.jtvnw.net/jtv_user_pictures/meowntain-profile_banner-71b7a6d0d943dc9e-480.jpeg" }`

2. Create a `GET /api/joke` endpoint that responds with a joke of your choosing!
    - Request URL: [http://localhost:8080/api/joke](http://localhost:8080/api/joke)
    - Response Structure: `{ setup: "", punchline: ""}`
    - Example Response: `{ setup: "what do you call a pile of kittens?", punchline: "a meowntain" }`

3. Create a `GET /api/rollDie` endpoint. It should be able to handle a `?quantity=` query parameter that lets the client specify the number of dice to roll. If no value is provided, or an invalid value is provided, roll one die.
    - Request URL: [http://localhost:8080/api/rollDie](http://localhost:8080/api/rollDie)
    - Response Structure: `{ rolls: [] }`
    - Example Responses
      - With a query parameter `/api/rollDie?quantity=3`: `{ rolls: [5, 2, 3] }`
      - No query parameter `/api/rollDie`: `{ rolls: [4] }`
      - Invalid query parameter `/api/rollDie?quantity=foo` : `{ rolls: [2] }`

As you build your server, visit [http://localhost:8080](http://localhost:8080) (or whatever port number you chose) and test out your server's API endpoints!

## Step 3 — Add A Route Logger Middleware

> ✅ You will know that you've completed this step when information about every request that your server receives is printed to the console of your server's terminal.

In addition to the three GET endpoints, the server should have a `logRoutes` middleware that prints out information about every incoming request, regardless of the endpoint used.

It should invoke `next()` to pass the request to the next controller in the chain.

Feel free to use the logger in the lecture notes!

Restart your server and send requests to each of your API endpoints. Keep an eye on your terminal and see the requests being logged!

## Step 4 — Serving Static Assets

> ✅ You will know that you've completed this step when you visit your server at [http://localhost:8080](http://localhost:8080) and you are presented with a frontend webpage.

Now that your server has API endpoints, let's create a website to show users how to use your API!

1. `cd` to the root of your repository.
2. Run `npm create vite` to create a React+JavaScript application. This folder should be a sibling to `server`.
3. Remove the provided starter code and replace the `App` will the following (feel free to modify it):

    ```js
    function App() {

      return (
        <>
          <main>
            <h1>My First API</h1>
            <p>Welcome to my first API! This is a simple API that returns a random joke, can roll dice for you, and can provide you with a nice picture. Enjoy!</p>
            <ul>
              <li>Visit <a href="/api/joke">/api/joke</a> for a funny joke</li>
              <li>Visit <a href="/api/picture">/api/picture</a> to see a nice picture</li>
              <li>Visit <a href="/api/rollDie">/api/rollDie</a> to roll a die. (Try <a href="/api/rollDie?quantity=3">/api/rollDie?quantity=3</a> to roll multiple dice!)</li>
            </ul>
          </main>
        </>
      )
    }

    export default App
    ```

4. Next, run `npm run build` to build static assets for this React application.

5. Back in the `server/index.js` file, use the `express.static()` middleware along with the `path` module and `__dirname` to serve the static assets for your frontend. See the lecture notes for guidance.

6. Test this out by running your server and visiting `http://localhost:8080`. You should see your static assets!

## Step 5 — Deploy

> ✅ You will know that you've completed this step when you can visit your deployed server!

When you're done, push your code to github and [follow these steps to deploy a static server using Render](https://marcylabschool.gitbook.io/marcy-lab-school-docs/how-tos/deploying-using-render#deploy-a-static-server-with-vite). Then, add the deployed link to the top of this README.
