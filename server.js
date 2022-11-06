const dotenv = require("dotenv");
dotenv.config({});
const mongoose = require("mongoose");
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB Successfully");
  });
const port = process.env.PORT || 3000;
// console.log(process.env.PORT);
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
