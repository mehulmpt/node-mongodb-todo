const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const Todo = require("./models/todo");

mongoose.connect("mongodb://localhost:27017/first_db");

app.use("/", express.static(path.resolve(__dirname, "assets")));

app.use(express.json());

app.post("/api/delete", async (req, res) => {
  const { record } = req.body;
  console.log(record, "/api/delete");

  const response = await Todo.deleteOne({ record });

  console.log(response, "/api/delete response");

  res.json({ status: "ok" });
});

app.post("/api/modify", async (req, res) => {
  console.log(req.body)
  const { old: oldTitle, new: newTitle } = req.body;

  const response = await Todo.updateOne(
    {
      record: oldTitle,
    },
    { // $set allows us to overwrite only the fields which are changin while preserving the other fields
      $set: {
        record: newTitle,
      },
    }
  );

  console.log(response);

  res.json({ status: "ok" });
});


// reading from the DB
app.get("/api/get", async (req, res) => {
  const records = await Todo.find({}); // select all
  console.log('Response => ', records)
  res.json(records);
});

// Adding items to DB
app.post("/api/create", async (req, res) => {
  const record = req.body;
  console.log(record);

  // * CREATE (_C_RUD)
  const response = await Todo.create(record);

  console.log(response);

  res.json({ status: "ok" });
});

app.listen(13371, "127.0.0.1", () => {
  console.log("Server up on http://localhost:13371");
});
