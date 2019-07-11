const express = require('express');
const app = express();
const port = 3000;
const Router = require('./router');

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

var router = new Router(app);
