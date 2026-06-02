const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();

const port = process.env.PORT;

(async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("db connected");
  } catch (error) {
    console.log("db connected error");
  }
})();

app.listen(port, () => console.log(`server is run ${port}`));
