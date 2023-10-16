const express = require('express');
const axios = require('axios');
const app = express();

// We need these two lines to enable cors (we talk more about what this is at the end of this file)
const cors = require('cors');
app.use(cors());

const PORT = 8000;
// to see the webpage type in your browser - localhost:8000 (or whatever your port is)

// req and res have to be in this order - req (request) comes before res (response)
// you can type out the full word too if you want, or you can just use "req" or "res"
app.get('/', (req, res) => {
    res.send('<h1>Hello World, again!</h1>')
})

app.get('/hi', (req, res) => {
    res.send('<h1>Hi!</h1>')
})

// The way I understand it, each route is like it's own page
// So now if you did localhost:8000/hi it's a new page that just shows "Hi!"

//PARAMETERIZED ROUTES
// a "parameterized" route is a route with a colon followed by something (example: :id or :name) <-- those are parameters

// UN-COMMENT THIS (L25-28)
// app.get('/:id', (req, res) => {
//     console.log(req.params)
//     res.send(`<h1>${req.params.id}</h1>`)
// })

// this is similar to React router
// <Route path='/:id' element={<h1>Hello World</h1>}

// L24 - params is just an object
// localhost:8000/(whatever you type here) will be the value, and the ID will be the key
// localhost:8000/fgfdgfdgfd --> will console log { id: 'fgfdgfdgfd' }

// L25 since we interpolated ${req.params.id} we said that we want to display on the page whatever we typed in the URL as an ID to display as an H1 (header)
// if we didn't add id after params      ^   then it would just display an empty object like "[object Object]" (key and value)

// GRABBING ANOTHER API (AXIOS INTRODUCTION)

// We normally would make a fetch call like we would in React, but node doesn't have fetch
// So we will use Axios (which is a library that's basically just "fetch" with better/different syntax)
// You can replace fetch with Axios if you wanted - like if you were doing a React project
// This is because since Axios is a library, code is being used under the hood - Axios IS using fetch under the hood


// We are going to make an axios request to the Pokemon Api
// ! Axios request are ASYNC

// We put the async right here
app.get('/pokemon', async (req, res) => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    // console.log(response.data)
    const pokemon = response.data.results
    res.send(pokemon)
})
// Since it's async, we need to "await" it too like we did on L53 right before we grab the API
// The axios.get method on L53 is just using endpoints - so if you wanted to GET it's axios.get - if you wanted to patch it's axios.patch, etc

// TRY/CATCH with Axios
// We can also still use try/catch blocks with axios too
// We purposefully put an error in the URL to trigger the catch/error block (un-comment L62-79)
// app.get('/pokemon', async (req, res) => {
//     try {
//     const response = await axios.get('https://pokeapi.co/api/v2/pokemondfdff');
//     console.log(response)
//     } catch (error){
//     console.log(error, "404 not found")
//     }
// });


// Now lets get a specific pokemon by their name
app.get('/pokemon/:name', async (req, res) => {
    const name = req.params.name
    // requesting the "name" from the object and assigning it to the variable name
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    // We just interpolate and append the name variable at the end of the URL
    const pokemon = response.data
    res.send(pokemon)
})

// Now lets just the abilities of a certain pokemon
app.get('/pokemon/abilities/:name', async (req, res) => {
    const name = req.params.name
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemon = response.data
    res.send(pokemon.abilities)
})

app.listen(8000)

// TAKEAWAYS: So we basically made our own backend with the PokemonApi
// So on the React side when we made a fetch call to the PokemonApi we would use their Api endpoint, but now since we created our own backend with their Api, we can just make a call to our own backend which would be "localhost(whatever port number you gave)" and get the same result


// FRONTEND AND BACKEND (DEPLOYMENT & TERMINALS)
// If we want to run a backend and frontend we will need two terminals open - we can just use a split terminal in VsCode
// You would always deploy your app to the market in this way - you can run your entire app in one terminal, but it's only common in learning environments


// SOLVING SECURITY ISSUE
// When you try to request anything from your backend server/domain (example: localhost:8000) from your frontend Vite domain (localhost:5713) it will throw an error
// This is because BY DEFAULT your Express backend only takes request from the same domain (in this case our Express backend domain is localhost:8000)
// When we try to take a request from our backend domain from our frontend, different domain (localhost:5713) it says "nah bro, you ain't 8000 idk you like that"
// This is where another backend library comes into place called "cors" (npm i cors)
// Cors allows your Express server to take requests from ANY domain (including localhost:5173)
