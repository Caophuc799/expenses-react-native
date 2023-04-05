import axios from "axios";
const baseUrl =
  "https://expense-react-native-59ccb-default-rtdb.asia-southeast1.firebasedatabase.app";
export const storeExpense = async (expenseData) => {
  const response = await axios.post(`${baseUrl}/expenses.json`, expenseData);
  const id = response.data.name;
  return id;
};

export const getExpenseData = async () => {
  const response = await axios.get(`${baseUrl}/expenses.json`);
  const expenses = [];
  for (const key in response.data) {
    expenses.push({
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    });
  }
  return expenses;
};

export const updateExpense = async (id, expenseData) => {
  return axios.put(`${baseUrl}/expenses/${id}.json`, expenseData);
};

export const deleteExpense = async (id) => {
  return axios.delete(`${baseUrl}/expenses/${id}.json`);
};
