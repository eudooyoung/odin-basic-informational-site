import express from "express";
import fs from "node:fs";
import type { Routes } from "./types.js";

const app = express();
const paths = [
  "./index.html",
  "./about.html",
  "./contact-me.html",
  "./404.html",
];
const routes: Routes = {};
const PORT = process.env.PORT;

paths.forEach((path) => {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    }
    const key = path.slice(2, -5);
    routes[key] = data;
  });
});

app.get("/", (_, res) => res.send(routes["index"]));
app.get("/about", (_, res) => res.send(routes["about"]));
app.get("/contact-me", (_, res) => res.send(routes["contact-me"]));
app.get("/*splat", (_, res) => res.send(routes["404"]));

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Basic informational app - listenting on port ${PORT}`);
});
