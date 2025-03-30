import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IndianRupee, PieChart, TrendingUp, Shield } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Take Control of Your <span className="text-purple-600">Finances</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Smart budgeting made simple. Track your expenses, set financial goals, and achieve financial freedom.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
          >
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-center">
                <IndianRupee className="h-12 w-12 text-purple-600" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Track Expenses</h3>
              <p className="mt-2 text-gray-500">Monitor your spending habits and stay within budget</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-center">
                <PieChart className="h-12 w-12 text-purple-600" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Budget Categories</h3>
              <p className="mt-2 text-gray-500">Organize expenses by categories for better insights</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-center">
                <TrendingUp className="h-12 w-12 text-purple-600" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Financial Goals</h3>
              <p className="mt-2 text-gray-500">Set and achieve your financial objectives</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;