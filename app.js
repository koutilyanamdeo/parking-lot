const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to the Parking Lot System!');
});

app.listen(PORT, (error) => {
    if (error) {
        return console.log('Error starting server:', error);
    }
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;