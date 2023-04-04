import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = ({
  defaultValue,
  submitButtonLabel,
  onCancel,
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : "",
      isValid: true,
    },
    date: {
      isValid: true,
      value: defaultValue ? getFormattedDate(defaultValue.date) : "",
    },
    description: {
      isValid: true,
      value: defaultValue ? defaultValue.description.toString() : "",
    },
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputValue((current) => ({
      ...current,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }));
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValue.amount.value,
      date: new Date(inputValue.date.value),
      description: inputValue.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      console.log(amountIsValid, dateIsValid, descriptionIsValid);
      Alert.alert("Invalid input", "Please check your input values");
      setInputValue((current) => {
        return {
          amount: { value: current.amount.value, isValid: amountIsValid },
          date: { value: current.date.value, isValid: dateIsValid },
          description: {
            value: current.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputValue.amount.isValid ||
    !inputValue.date.isValid ||
    !inputValue.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label={"Amount"}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValue.amount.value,
          }}
          style={styles.rowInput}
        />
        <Input
          label={"Date"}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValue.date.value,
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label={"Description"}
        textInputConfig={{
          multiline: true,
          value: inputValue.description.value,
          onChangeText: inputChangeHandler.bind(this, "description"),
          //   autoCorrect: false,
          //   autoCapitalize: "words",
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered date!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button mode="flat" style={styles.button} onPress={onCancel}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
