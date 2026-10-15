const fs = require('fs');
const mm = require('music-metadata');
const express = require('express');
const app = express();

app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.redirect(__dirname + 'index.html');
});
app.get('/assets/music/:track/meta', (req, res) => {
  console.log(req.params.track);
  mm.parseFile(__dirname + '/assets/music/' + req.params.track)
    .then(data => { res.json(data); console.log(data) })
    .catch(error => {
      console.error(error);
      res.send(error);
    })
})

const port = 8000;
app.listen(port, () => {
  console.log(`listening on ${port}`)
});
