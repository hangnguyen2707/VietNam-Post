const mongoose = require("mongoose");

async function connect() {
  const username = "tuanngheoyeudoi1212";
  const password = "Ab12345";
  const cluster = "cluster0.nvttmpi";
  const dbname = "MagicPost";

  try {
    await mongoose.connect(
      `mongodb://localhost:27017/Post`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

module.exports = { connect };