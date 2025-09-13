const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Node.js plain server working ✅");
});

server.listen(5000, () => {
  console.log("Plain Node server running on http://localhost:5000");
});
