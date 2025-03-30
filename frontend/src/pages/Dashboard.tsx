import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, IndianRupee } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Expense {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: string;
}

interface Budget {
  id: string;
  name: string;
  totalAmount: number;
  expenses: Expense[];
}

const Dashboard = () => {
  const { user } = useAuth();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [newBudget, setNewBudget] = useState({ name: '', totalAmount: '' });
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    description: '',
  });

  useEffect(() => {
    const storedBudgets = localStorage.getItem(`budgets_${user?.id}`);
    if (storedBudgets) {
      setBudgets(JSON.parse(storedBudgets));
    }
  }, [user]);

  const saveBudgets = (updatedBudgets: Budget[]) => {
    localStorage.setItem(`budgets_${user?.id}`, JSON.stringify(updatedBudgets));
    setBudgets(updatedBudgets);
  };

  const handleAddBudget = () => {
    if (!newBudget.name || !newBudget.totalAmount) return;

    const budget: Budget = {
      id: Date.now().toString(),
      name: newBudget.name,
      totalAmount: parseFloat(newBudget.totalAmount),
      expenses: [],
    };

    saveBudgets([...budgets, budget]);
    setNewBudget({ name: '', totalAmount: '' });
    setShowAddBudget(false);
  };

  const handleAddExpense = () => {
    if (!selectedBudget || !newExpense.category || !newExpense.amount) return;

    const expense: Expense = {
      id: Date.now().toString(),
      category: newExpense.category,
      amount: parseFloat(newExpense.amount),
      description: newExpense.description,
      date: new Date().toISOString(),
    };

    const updatedBudgets = budgets.map((budget) => {
      if (budget.id === selectedBudget.id) {
        return {
          ...budget,
          expenses: [...budget.expenses, expense],
        };
      }
      return budget;
    });

    saveBudgets(updatedBudgets);
    setNewExpense({ category: '', amount: '', description: '' });
    setShowAddExpense(false);
  };

  const calculateTotalExpenses = (expenses: Expense[]) => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const calculateRemainingAmount = (budget: Budget) => {
    const totalExpenses = calculateTotalExpenses(budget.expenses);
    return budget.totalAmount - totalExpenses;
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Budgets</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddBudget(true)}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Budget
          </motion.button>
        </div>

        {budgets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No budgets yet. Create your first budget to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {budgets.map((budget) => (
              <motion.div
                key={budget.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{budget.name}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedBudget(budget)}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        const updatedBudgets = budgets.filter((b) => b.id !== budget.id);
                        saveBudgets(updatedBudgets);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Budget:</span>
                    <span className="font-medium">₹{budget.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Expenses:</span>
                    <span className="font-medium">₹{calculateTotalExpenses(budget.expenses).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Remaining:</span>
                    <span className={`font-medium ${calculateRemainingAmount(budget) < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      ₹{calculateRemainingAmount(budget).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => {
                      setSelectedBudget(budget);
                      setShowAddExpense(true);
                    }}
                    className="w-full flex items-center justify-center px-4 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Expense
                  </button>
                </div>

                {budget.expenses.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Expenses</h4>
                    <div className="space-y-2">
                      {budget.expenses.slice(-3).map((expense) => (
                        <div
                          key={expense.id}
                          className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded"
                        >
                          <div>
                            <p className="font-medium">{expense.category}</p>
                            <p className="text-gray-500">{expense.description}</p>
                          </div>
                          <span className="font-medium">₹{expense.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Add Budget Modal */}
        {showAddBudget && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-bold mb-4">Add New Budget</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Budget Name</label>
                  <input
                    type="text"
                    value={newBudget.name}
                    onChange={(e) => setNewBudget({ ...newBudget, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                  <input
                    type="number"
                    value={newBudget.totalAmount}
                    onChange={(e) => setNewBudget({ ...newBudget, totalAmount: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddBudget(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddBudget}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Add Budget
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Add Expense Modal */}
        {showAddExpense && selectedBudget && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-bold mb-4">Add New Expense</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <input
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <input
                    type="text"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddExpense(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddExpense}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Add Expense
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;