require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
const PORT = process.env.PORT;

app.use(cors({
  origin: '*',
}));
app.use(bodyParser.json({ limit: '35mb' }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '35mb',
    parameterLimit: 50000,
  }),
);

app.use(express.text());
app.use(express.json());
app.use('/api/v1', require('./modules/v1/apk'));

try {
  app.listen(PORT,()=>{
    console.log(`😈 App Running ⚡On 🔥 ` + process.env.PORT + ` 🔥`);
  })
} catch (err) {
  console.log("Failed to connect --->>  ", err);
}