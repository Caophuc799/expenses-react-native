import { FlatList, StyleSheet, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

export const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trouser",
    amount: 89.99,
    date: new Date("2022-12-19"),
  },
  {
    id: "e3",
    description: "Bananas",
    amount: 9.99,
    date: new Date("2022-12-19"),
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
const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 35,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
