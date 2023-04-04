import { createContext, useReducer, useState } from "react";
import { getExpenseData } from "../util/http";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
    case "SET":
      return action.payload;
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return [...state.filter((item) => item.id !== action.payload)];
    default:
      state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer);

  const addExpense = (expenseDate) => {
    dispatch({ type: "ADD", payload: expenseDate });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (id, expenseDate) => {
    dispatch({ type: "UPDATE", payload: { id, data: expenseDate } });
  };

  const setExpenses = (expenses) => {
    dispatch({ type: "SET", payload: expenses });
  };

  const value = {
    expenses: expensesState,
    addExpense,
    setExpenses,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
