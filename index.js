const express = require('express');
const app = express();
const helmet = require("helmet");
const config = require("config");
var cors = require('cors');

app.use(express.json());
app.use(helmet());
app.use(cors());

app.get('/hodor', (req, res) => res.send('Hello World!'))

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log(`Listening to port ${port}`);
});