const port = process.env.PORT || 8080;
const dbUrl = process.env.MONGODB_URL || `mongodb+srv://fuentech:Atlas@fuentech2018@mailcluster-505z9.mongodb.net/shopago?retryWrites=true&w=majority`;
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