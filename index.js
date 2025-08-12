import "dotenv/config";
import express from "express";

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

let teaData = [];
let nextId = 1;

// Create tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// Get all teas
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// Get tea by ID
app.get("/teas/:id", (req, res) => {
  const teaId = parseInt(req.params.id, 10);
  const tea = teaData.find((t) => t.id === teaId);

  if (!tea) {
    return res.status(404).send({ message: "Tea not found" });
  }

  res.status(200).send(tea);
});

// Update tea
app.put("/teas/:id", (req, res) => {
  const teaId = parseInt(req.params.id, 10);
  const tea = teaData.find((t) => t.id === teaId);

  if (!tea) {
    return res.status(404).send({ message: "Tea not found" });
  }

  const { name, price } = req.body;

  if (name) tea.name = name;
  if (price) tea.price = price;

  res.status(200).send(tea);
});

// Delete tea
app.delete("/teas/:id", (req, res) => {
  const teaId = parseInt(req.params.id, 10);
  const teaIndex = teaData.findIndex((t) => t.id === teaId);

  if (teaIndex === -1) {
    return res.status(404).send({ message: "Tea not found" });
  }

  const deletedTea = teaData.splice(teaIndex, 1); // remove tea from array
  res.status(200).send({ message: "Tea deleted successfully", deletedTea });
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
