const express = require('express');

const app = express();

const cors = require('cors');

//app.use(cors({origin: 'localhost:3333'}))

app.get('/',(req,res)=>{
    res.status(200).json({title: 'hello world'});
});

let port = 2345
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })