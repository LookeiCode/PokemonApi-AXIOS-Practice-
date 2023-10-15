const express = require('express');
const app = express();

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

app.get('/:id', (req, res) => {
    console.log(req.params)
    res.send(`<h1>${req.params.id}</h1>`)
})

// this is similar to React router
// <Route path='/:id' element={<h1>Hello World</h1>}

// L24 - params is just an object
// localhost:8000/(whatever you type here) will be the value, and the ID will be the key
// localhost:8000/fgfdgfdgfd --> will console log { id: 'fgfdgfdgfd' }

// L25 since we interpolated ${req.params.id} we said that we want to display on the page whatever we typed in the URL as an ID to display as an H1 (header)
// if we didn't add id after params      ^   then it would just display an empty object like "[object Object]" (key and value)

// GRABBING ANOTHER API (AXIOS INTRODUCTION)

// We normally would make a fetch call like we would in React, but node doesn't have fetch
// So we will use Axios (which is Basically just "fetch" with better/different syntax)




app.listen(8000)