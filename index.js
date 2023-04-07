const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("(◕‿◕)");
});

app.listen(54321, () => {
    console.log("Server loaded and (hopefully) ready to go!");
});