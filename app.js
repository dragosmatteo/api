const express = require('express')
const app = express();

app.use(express.json())

const movies = [
   {
      id: 1,
      name: "Tenet",
   },

   {
      id: 2,
      name: "Batman",
   },

   {
      id: 3,
      name: "Superman",
   },

   {
      id: 4,
      name: "Anabelle",
   },
];

const getMovies = (req, res) => {
    res.send(movies)
}

const getMovie = (req, res) => {
    const movie = movies.find(movie => movie.id === parseInt(req.params.id))
    if (!movie) return res.status(404).send("Resources not load")
    res.send(movie);
}

const update = (req, res) => {
    const movie = movies.find((movie) => movie.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send("Resources not load");
    
    movie.name = req.body.name;
    res.send(movie);
}

const post = (req, res) => {
   const name = req.body.name;

   const movie = {
      id: movies.length + 1,
      name,
   };
   movies.push(movie);

   res.send(movie);
};

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.get("/api/movies", getMovies)

app.get("/api/movies/:id", getMovie);

app.post("/api/movies", post);

app.put("/api/movies/:id", update)

app.delete("/api/movies/:id", (req, res) => {
    const movie = movies.find((movie) => movie.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send("Resources not load");

    const index = movies.indexOf(movie)
    movies.splice(index, 1);

    res.send(movie)
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})
