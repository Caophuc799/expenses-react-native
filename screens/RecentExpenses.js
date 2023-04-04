import { Text } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { useContext, useEffect } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDate } from "../util/date";
import { getExpenseData } from "../util/http";

const RecentExpenses = () => {
  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    const fetchExpenses = async () => {
      const expenses = await getExpenseData();
      expensesContext.setExpenses(expenses);
    };

    fetchExpenses();
  }, []);

  const recentExpenses =
    expensesContext.expenses?.filter((item) => {
      const today = new Date();
      const date7DaysAgo = getDateMinusDate(today, 7);
      return item.date > date7DaysAgo;
    }) ?? [];
  return (
    <ExpensesOutput
      expensesPeriod={"Last 7 days"}
      expenses={recentExpenses}
      fallBackText={"No Expenses registered for the last 7 days"}
    />
  );
};

export default RecentExpenses;
