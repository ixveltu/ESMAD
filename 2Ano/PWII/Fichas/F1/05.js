const http = require("http");
const fs = require("fs");
const path = require("path");

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 5000;

// Define the public directory
const PUBLIC_DIR = path.join(__dirname, "public");

const server = http.createServer((req, res) => {
 if (req.method === "GET") {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const fileName = url.searchParams.get("file");

  if (fileName) {
   const filePath = path.join(PUBLIC_DIR, fileName);

   // Check if the file exists
   fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
     // File does not exist, return custom 404 page
     fs.readdir(PUBLIC_DIR, (err, files) => {
      if (err) {
       res.writeHead(500, { "Content-Type": "text/html" });
       res.end("<h1>Internal Server Error</h1>");
       return;
      }

      // Generate a list of available files
      const fileList = files
       .map((file) => `<li><a href="/?file=${file}">${file}</a></li>`)
       .join("");

      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(`
              <h1>404 - File Not Found</h1>
              <p>The requested file "${fileName}" does not exist.</p>
              <h2>Available Files:</h2>
              <ul>${fileList}</ul>
            `);
     });
    } else {
     // File exists, serve the file
     const fileStream = fs.createReadStream(filePath);
     res.writeHead(200, { "Content-Type": getContentType(filePath) });
     fileStream.pipe(res);
    }
   });
  } else {
   // No file specified in the query string
   res.writeHead(400, { "Content-Type": "text/html" });
   res.end(
    "<h1>400 - Bad Request</h1><p>No file specified in the query string.</p>"
   );
  }
 } else {
  // Method not allowed
  res.writeHead(405, { "Content-Type": "text/html" });
  res.end("<h1>405 - Method Not Allowed</h1>");
 }
});

// Helper function to determine the content type based on file extension
// function getContentType(filePath) {
//  const ext = path.extname(filePath).toLowerCase();
//  switch (ext) {
//   case ".html":
//    return "text/html";
//   case ".css":
//    return "text/css";
//   case ".js":
//    return "application/javascript";
//   case ".json":
//    return "application/json";
//   case ".png":
//    return "image/png";
//   case ".jpg":
//   case ".jpeg":
//    return "image/jpeg";
//   case ".gif":
//    return "image/gif";
//   default:
//    return "application/octet-stream";
//  }
// }

server.listen(PORT, HOST, () => {
 console.log(`Server running at http://${HOST}:${PORT}/`);
});
