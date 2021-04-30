const io = require("socket.io-client");
const socket = io("ws://localhost:3000");





socket.on("connect", () => {
  // either with send()
  var path =process.argv.length>2?`/${process.argv[2]}`: `/noget`
    socket.emit("create", {path:path})
    console.log('connected')
});

// handle the event sent with socket.send()
socket.on("request", data => {
  console.log(data.query);
  setTimeout(() => {
      var body = process.argv.length>3 ? process.argv[3] : 'juhuu'
    socket.emit("response", {
            rid:data.rid,  
            body:body + data.rid
        }
    );
  }, (000));
  
});


