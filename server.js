const express = require("express");
const app = express();
app.use(express.static("public"));
/* Removed a lot of really bad code for the beta build. 
I merged the files into the Public directory so I can just use the above code  */
const packageJSON = require("./package.json");
const colorsJSON = require("./colors.json"); /* Changing the default colors to be fetched from a central URL */

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/stable/index.html");
});

app.get("/api/colors", (request, response) => {
  response.sendFile(__dirname + "/colors.json");
});

app.get("*", (request, response) => {
  response.sendFile(__dirname + "/public/errors/404/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});