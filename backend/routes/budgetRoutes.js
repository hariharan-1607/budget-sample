const express = require("express");
const supabase = require("../config/supabase");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Get all budgets for the authenticated user
router.get("/", async (req, res) => {
  try {
    const { data: budgets, error } = await supabase
      .from("budgets")
      .select("*")
      .eq("user_id", req.user.userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching budgets:", error);
      return res.status(500).json({ msg: "Error fetching budgets", error: error.message });
    }

    // Fetch expenses for each budget
    const budgetsWithExpenses = await Promise.all(
      budgets.map(async (budget) => {
        const { data: expenses } = await supabase
          .from("expenses")
          .select("*")
          .eq("budget_id", budget.id)
          .order("date", { ascending: false });

        return {
          ...budget,
          expenses: expenses || [],
        };
      })
    );

    res.json(budgetsWithExpenses);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
});

// Create a new budget
router.post("/", async (req, res) => {
  try {
    const { name, totalAmount } = req.body;

    if (!name || !totalAmount) {
      return res.status(400).json({ msg: "Name and total amount are required" });
    }

    const { data: budget, error } = await supabase
      .from("budgets")
      .insert([
        {
          user_id: req.user.userId,
          name,
          total_amount: parseFloat(totalAmount),
        },
      ])
      .select("*")
      .single();

    if (error) {
      console.error("Error creating budget:", error);
      return res.status(500).json({ msg: "Error creating budget", error: error.message });
    }

    res.status(201).json({ ...budget, expenses: [] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
});

// Update a budget
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, totalAmount } = req.body;

    // Verify budget belongs to user
    const { data: existingBudget } = await supabase
      .from("budgets")
      .select("user_id")
      .eq("id", id)
      .single();

    if (!existingBudget || existingBudget.user_id !== req.user.userId) {
      return res.status(404).json({ msg: "Budget not found" });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (totalAmount !== undefined) updateData.total_amount = parseFloat(totalAmount);

    const { data: budget, error } = await supabase
      .from("budgets")
      .update(updateData)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("Error updating budget:", error);
      return res.status(500).json({ msg: "Error updating budget", error: error.message });
    }

    res.json(budget);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
});

// Delete a budget
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Verify budget belongs to user
    const { data: existingBudget } = await supabase
      .from("budgets")
      .select("user_id")
      .eq("id", id)
      .single();

    if (!existingBudget || existingBudget.user_id !== req.user.userId) {
      return res.status(404).json({ msg: "Budget not found" });
    }

    const { error } = await supabase.from("budgets").delete().eq("id", id);

    if (error) {
      console.error("Error deleting budget:", error);
      return res.status(500).json({ msg: "Error deleting budget", error: error.message });
    }

    res.json({ msg: "Budget deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
});

// Add expense to a budget
router.post("/:budgetId/expenses", async (req, res) => {
  try {
    const { budgetId } = req.params;
    const { category, amount, description } = req.body;

    if (!category || !amount) {
      return res.status(400).json({ msg: "Category and amount are required" });
    }

    // Verify budget belongs to user
    const { data: budget } = await supabase
      .from("budgets")
      .select("user_id")
      .eq("id", budgetId)
      .single();

    if (!budget || budget.user_id !== req.user.userId) {
      return res.status(404).json({ msg: "Budget not found" });
    }

    const { data: expense, error } = await supabase
      .from("expenses")
      .insert([
        {
          budget_id: budgetId,
          category,
          amount: parseFloat(amount),
          description: description || "",
        },
      ])
      .select("*")
      .single();

    if (error) {
      console.error("Error creating expense:", error);
      return res.status(500).json({ msg: "Error creating expense", error: error.message });
    }

    res.status(201).json(expense);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
});

// Update an expense
router.put("/:budgetId/expenses/:expenseId", async (req, res) => {
  try {
    const { budgetId, expenseId } = req.params;
    const { category, amount, description } = req.body;

    // Verify budget belongs to user
    const { data: budget } = await supabase
      .from("budgets")
      .select("user_id")
      .eq("id", budgetId)
      .single();

    if (!budget || budget.user_id !== req.user.userId) {
      return res.status(404).json({ msg: "Budget not found" });
    }

    const updateData = {};
    if (category) updateData.category = category;
    if (amount !== undefined) updateData.amount = parseFloat(amount);
    if (description !== undefined) updateData.description = description;

    const { data: expense, error } = await supabase
      .from("expenses")
      .update(updateData)
      .eq("id", expenseId)
      .eq("budget_id", budgetId)
      .select("*")
      .single();

    if (error) {
      console.error("Error updating expense:", error);
      return res.status(500).json({ msg: "Error updating expense", error: error.message });
    }

    res.json(expense);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
});

// Delete an expense
router.delete("/:budgetId/expenses/:expenseId", async (req, res) => {
  try {
    const { budgetId, expenseId } = req.params;

    // Verify budget belongs to user
    const { data: budget } = await supabase
      .from("budgets")
      .select("user_id")
      .eq("id", budgetId)
      .single();

    if (!budget || budget.user_id !== req.user.userId) {
      return res.status(404).json({ msg: "Budget not found" });
    }

    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", expenseId)
      .eq("budget_id", budgetId);

    if (error) {
      console.error("Error deleting expense:", error);
      return res.status(500).json({ msg: "Error deleting expense", error: error.message });
    }

    res.json({ msg: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
});

module.exports = router;
