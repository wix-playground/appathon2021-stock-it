const express = require("express");
const app = express();

console.log(__dirname + "/webComponent.js")
app.use("/public", express.static(__dirname + "/public"));
app.use("/ping", (req, res) => res.status(200).send({message: "pong"}));


app.listen(5000, () => console.log("listen on port 5000"));