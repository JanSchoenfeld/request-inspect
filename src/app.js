const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();

const port = 8111;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res) => {
  writeRequestToFile(req);
  res.send("200");
});

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

function writeRequestToFile(req) {
  fs.writeFileSync(
    path.join(__dirname, "..", "requests", Date.now() + ".json"),
    buildJSONFromRequest(req)
  );
  console.log("successfully wrote new request to file!");
}

function buildJSONFromRequest(req) {
  let json = {};
  json.receivedAt = new Date().toISOString();
  json.path = req.path;
  json.query = req.query;
  json.header = req.headers;
  json.body = req.body;
  return JSON.stringify(json);
}
