import express from 'express';
const app = express();

app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static('public'));

import routes from './routes/github.routes.js';
app.use('/api/v1', routes);
app.get("/", (req, res) => {
    res.send("Welcome to GitHub Profile Analyzer API");
});

export default app;