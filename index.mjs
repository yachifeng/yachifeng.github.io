import express from 'express';
import fetch from 'node-fetch';
import planets from 'npm-solarsystem';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    const backgrounds = [
        '/img/img1.jpeg',
        '/img/img2.jpeg',
        '/img/img3.jpeg',
        '/img/img4.jpeg',
        '/img/img5.jpeg',
        '/img/img6.jpeg',
        '/img/img7.jpeg',
        '/img/img8.jpeg',
        '/img/img9.jpeg',
        '/img/img10.jpeg'
    ];

    const randomBgUrl =
        backgrounds[Math.floor(Math.random() * backgrounds.length)];

    res.render('index', { randomBgUrl });
});

app.get('/planet', (req, res) => {
    const planetName = req.query.planetName;
    
    if (!planetName) {
        return res.redirect('/');
    }

    try {
        const functionName = `get${planetName.charAt(0).toUpperCase() + planetName.slice(1)}`;
        const planetInfo = planets[functionName]();
        res.render('planet', { planetName, planetInfo });
    } catch (error) {
        res.send("Planet not found.");
    }
});

app.get('/nasa', async (req, res) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const apiURL = `https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=${formattedDate}`;
    
    try {
        const response = await fetch(apiURL);
        const nasaData = await response.json();
        
        res.render('nasa', { nasaData, formattedDate });
    } catch (error) {
        res.status(500).send("Error fetching NASA data: " + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});