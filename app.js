const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/site'))

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/:name', function(req, res){
  res.sendFile(__dirname + `/${req.params.name}.html`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));