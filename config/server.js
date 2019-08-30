const port = process.env.PORT || 8080;
const dbUrl =
  process.env.MONGODB_URL ||
  "mongodb+srv://Fuentech:Atlas@fuentech2018@shoppago-hlqaz.mongodb.net/shoppago?retryWrites=true&w=majority";
const app = require("../bin/WWW");
const mongoose = require("mongoose");

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Server's worKing on port ${port}`);
    });
  })
  .catch(err => {
    console.log(`Can't connect to database: ${err}`);
  });

module.exports.mongoose = mongoose;
