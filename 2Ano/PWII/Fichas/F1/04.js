const http = require("http");
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
 if (req.method === "GET") {
  if (req.url === "/") {
   res.writeHead(200);
   res.end("Welcome to my server");
  } else if (req.url === "/about") {
   res.writeHead(200);
   res.end("This is a node server");
  } else if (req.url === "/time") {
   res.writeHead(200);
   res.write(`Current date: ${new Date().toLocaleDateString()}`);
   res.end(`Current time: ${new Date().toLocaleTimeString()}`);
  }
 } else {
  res.writeHead(405);
  res.end("Page not found");
 }
});

server.listen(PORT, HOST, () => {
 console.log(`Server running at http://${HOST}:${PORT}/`);
});
