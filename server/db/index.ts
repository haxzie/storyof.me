import mongoose from "mongoose";

function connectDatabase() {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on("error", error => console.error(error));
  db.once("open", () => console.log("connected to database"));
  return db;
}

export { connectDatabase }