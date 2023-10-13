const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static('./public'));
require('./routes/api-routes')(app);
require('./routes/html-routes')(app);
app.listen(PORT, function () {
    console.log(`Listening on ${PORT}`);
});




