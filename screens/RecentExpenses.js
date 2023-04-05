import { Text } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDate } from "../util/date";
import { getExpenseData } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expenses = await getExpenseData();
        expensesContext.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsLoading(false);
    };

    fetchExpenses();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

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
