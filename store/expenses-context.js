import { createContext, useReducer, useState } from "react";

export const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2023-03-31"),
  },
  {
    id: "e2",
    description: "A pair of trouser",
    amount: 89.99,
    date: new Date("2023-03-31"),
  },
  {
    id: "e3",
    description: "Bananas",
    amount: 9.99,
    date: new Date("2023-03-31"),
  },
  {
    id: "e4",
    description: "A Book",
    amount: 119.99,
    date: new Date("2023-3-19"),
  },

  {
    id: "e5",
    description: "A Book 1",
    amount: 219.99,
    date: new Date("2023-3-23"),
  },
  {
    id: "e6",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e7",
    description: "A pair of trouser",
    amount: 89.99,
    date: new Date("2022-12-19"),
  },
  {
    id: "e8",
    description: "Bananas",
    amount: 9.99,
    date: new Date("2022-12-19"),
  },
  {
    id: "e9",
    description: "A Book",
    amount: 119.99,
    date: new Date("2023-3-19"),
  },

  {
    id: "e10",
    description: "A Book 1",
    amount: 219.99,
    date: new Date("2023-3-23"),
  },
];
export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
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
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expenseDate) => {
    dispatch({ type: "ADD", payload: expenseDate });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (id, expenseDate) => {
    dispatch({ type: "UPDATE", payload: { id, data: expenseDate } });
  };

  const value = {
    expenses: expensesState,
    addExpense,
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
