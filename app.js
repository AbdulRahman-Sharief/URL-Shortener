const express = require("express");

const shortUrl = require("./model/shortUrl.js");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const shortUrls = await shortUrl.find();
  res.render("index", { shortUrls });
});
app.post("/shortUrls", async (req, res) => {
  console.log(req.body.fullUrl);
  await shortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});
app.get("/:shortUrl", async (req, res) => {
  //   console.log(req.body.fullUrl);
  const shorturl = await shortUrl.findOne({ short: req.params.shortUrl });
  if (!shorturl) return res.sendStatus(404);
  shorturl.clicks++;
  shorturl.save();
  res.redirect(shorturl.full);
});
module.exports = app;
