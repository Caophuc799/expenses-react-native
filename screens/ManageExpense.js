import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpense = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const expensesContext = useContext(ExpensesContext);
  const selectedExpense = expensesContext.expenses.find(
    (item) => item.id === expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);

  const deleteExpenseHandler = async () => {
    setIsLoading(true);
    try {
      await deleteExpense(expenseId);
      expensesContext.deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense - please try again later!");
      setIsLoading(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (data) => {
    setIsLoading(true);
    try {
      if (isEditing) {
        await updateExpense(expenseId, data);
        expensesContext.updateExpense(expenseId, data);
      } else {
        const id = await storeExpense(data);
        expensesContext.addExpense({ ...data, id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later!");
      setIsLoading(false);
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        defaultValue={selectedExpense}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
