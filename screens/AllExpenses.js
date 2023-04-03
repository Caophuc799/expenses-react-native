import { Text } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
  const expensesContext = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expensesPeriod={"Total"}
      expenses={expensesContext.expenses}
      fallBackText={"No registered expenses found"}
    />
  );
};

export default AllExpenses;
