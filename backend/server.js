const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json()); // Middleware to parse JSON data
app.use(cors());

// ✅ Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://haribala112006:Hari2006@budget-cluster.tuh3nho.mongodb.net/?retryWrites=true&w=majority&appName=Budget-Cluster")
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Define Schema and Model
const BudgetSchema = new mongoose.Schema({
  name: String,
  totalAmount: Number,
  expenses: [{ category: String, amount: Number }],
});

const Budget = mongoose.model("Budget", BudgetSchema);

// ✅ Create API Endpoint to Save Data
app.post("/add-budget", async (req, res) => {
  try {
    const newBudget = new Budget(req.body);
    await newBudget.save();
    res.json({ message: "✅ Budget Added to MongoDB Atlas" });
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to Save Budget" });
  }
});

// ✅ Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
