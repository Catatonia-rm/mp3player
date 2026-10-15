const mm = require('music-metadata');
const express = require('express');
const app = express();
const uint = require('uint8array-extras');

app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.redirect(__dirname + 'index.html');
});
app.get('/assets/music/:track/meta', (req, res) => {
  console.log(req.params.track);
  mm.parseFile(__dirname + '/assets/music/' + req.params.track)
    .then(meta => {

      //process cover
      if (meta.common.picture) {
        const picture = mm.selectCover(meta.common.picture);
        const src = `data:${picture.format};base64,${uint.uint8ArrayToBase64(picture.data)}`;
        meta.common.picture = src;
      }

      res.json(meta)
    })
    .catch(error => {
      console.error(error);
      res.send(error);
    })
})

const port = 8000;
app.listen(port, () => {
  console.log(`listening on ${port}`)
});
