import http from "node:http";
import fs from "node:fs";
import type { Routes } from "./types.js";

const paths = [
  "./index.html",
  "./about.html",
  "./contact-me.html",
  "./404.html",
];
const routes: Routes = {};

paths.forEach((path) => {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    }
    const key = path.slice(2, -5);
    routes[key] = data;
  });
});

const getPage = (url: string) => {
  let page;
  switch (url) {
    case "/": {
      page = routes["index"];
      break;
    }
    case "/about": {
      page = routes["about"];
      break;
    }
    case "/contact-me": {
      page = routes["contact-me"];
      break;
    }
    default: {
      page = routes["404"];
    }
  }

  return page;
};

const server = http.createServer();

server.on("request", (request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  const page = getPage(request.url!);
  response.end(page);
});

server.listen(8080);
