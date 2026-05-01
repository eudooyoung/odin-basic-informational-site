import http from "node:http";
import fs from "node:fs";

const routes = {};
const fileNames = [
  "./index.html",
  "./about.html",
  "./contact-me.html",
  "./404.html",
];
fileNames.forEach((fileName) => {
  fs.readFile(fileName, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    }
    const key = fileName.slice(2, -5);
    routes[key] = data;
  });
});

const server = http.createServer();

server.on("request", (request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  switch (request.url) {
    case "/": {
      response.end(routes["index"]);
      break;
    }
    case "/about": {
      response.end(routes["about"]);
      break;
    }
    case "/contact-me": {
      response.end(routes["contact-me"]);
      break;
    }
    default: {
      response.end(routes["404"]);
    }
  }
});

server.listen(8080);
