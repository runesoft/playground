
//basically just serves public/index.html on port 3333

const express = require('express');
const app = express();


app.use(express.static('public'))

let port = 3333
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })