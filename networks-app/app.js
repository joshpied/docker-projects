const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const mongoose = require('mongoose');

const Favorite = require('./models/favorite');

const app = express();

app.use(bodyParser.json());

app.get('/favorites', async (req, res) => {
  const favorites = await Favorite.find();
  res.status(200).json({
    favorites: favorites,
  });
});

app.post('/favorites', async (req, res) => {
  const favName = req.body.name;
  const favType = req.body.type;
  const favUrl = req.body.url;

  try {
    if (favType !== 'movie' && favType !== 'character') {
      throw new Error('"type" should be "movie" or "character"!');
    }
    const existingFav = await Favorite.findOne({ name: favName });
    if (existingFav) {
      throw new Error('Favorite exists already!');
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const favorite = new Favorite({
    name: favName,
    type: favType,
    url: favUrl,
  });

  try {
    await favorite.save();
    res
      .status(201)
      .json({ message: 'Favorite saved!', favorite: favorite.toObject() });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

app.get('/movies', async (req, res) => {
  try {
    const response = await axios.get('https://swapi.dev/api/films');
    res.status(200).json({ movies: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

app.get('/people', async (req, res) => {
  try {
    const response = await axios.get('https://swapi.dev/api/people');
    res.status(200).json({ people: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

// app.listen(3000);

// get rid of below to check /movies routes working
mongoose.connect(
  // 'mongodb://localhost:27017/swfavorites', // will work if using traditional npm install, otherwise won't work with docker (host-to-host)
  // 'mongodb://host.docker.internal:27017/swfavorites', // works with docker without error and server will run (container-to-host method)
  // 'mongodb://172.17.0.2:27017/swfavorites', // find ip of mongo container by running 'docker container inspect mongodb' (container-to-container solution)
  'mongodb://mongodb:27017/swfavorites', // uses 'mongodb' as domain because that is the name of the container (docker network method)
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(3000);
    }
  }
);
