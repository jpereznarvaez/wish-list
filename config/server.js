const port = process.env.PORT || 8080;
const dbUrl = process.env.MONGODB_URL;
const app = require("../bin/WWW");
const mongoose = require("mongoose");

// mongoose
//   .connect(dbUrl, {
//     useNewUrlParser: true
//   })
//   .then(() => {})
//   .catch(err => {
//     console.log(`Can't connect to database: ${err}`);
//   });

console.log("Connected to database");
app.listen(port, () => {
  console.log(`Server's worKing on port ${port}`);
});
module.exports.mongoose = mongoose;
