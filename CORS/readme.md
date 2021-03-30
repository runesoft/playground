To be able to play with CORS you need to have web services running on two domains.
In this case we can use the :port to create mulitiple domain on localhost.

Web site runs on localhost:3333.
When it loads, it will try and access the service that is located on localhost:2345.
Before opening the site, open the developer tools in your browser and view the network stack.
It should fail. By uncommenting the CORS related line in the source code and restarting it you should be able to make it work.

Web site
```bash
npm install
node index.js
```

API server
```bash
node api.js
```