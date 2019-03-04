const express = require('express');
const app = express();
const helmet = require("helmet");
const config = require("config");
const mongoose = require("mongoose");
const cors = require('cors');

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: Private key is not defined");
  process.exit(1);
}

app.use(express.json());
app.use(helmet());
app.use(cors());

const predictions = require("./src/routes/predictions");
app.use("/hodor/api/predictions", predictions);

const groups = require("./src/routes/groups");
app.use("/hodor/api/groups", groups);

const users = require("./src/routes/users");
app.use("/hodor/api/users", users);

const auth = require("./src/routes/auth");
app.use("/hodor/api/auth", auth);

const groupUsers = require("./src/routes/group-users");
app.use("/hodor/api/group-users", groupUsers);

mongoose.connect(config.get("db_connection_string"), { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error(err))

app.get('/hodor', (req, res) => res.send('Hello World!'))

const port = process.env.PORT || 8081;
app.listen(port, '0.0.0.0', () => {
  console.log(`Listening to port ${port}`);
});
