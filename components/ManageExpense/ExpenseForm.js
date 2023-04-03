import { StyleSheet, View } from "react-native";
import Input from "./Input";

const ExpenseForm = () => {
  const amountChangeHandler = () => {};
  const dateChangeHandler = () => {};

  return (
    <View style={styles.container}>
      <Input
        label={"Amount"}
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: amountChangeHandler,
        }}
      />
      <Input
        label={"Date"}
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: dateChangeHandler,
        }}
      />
      <Input
        label={"Description"}
        textInputConfig={{
          multiline: true,
          //   autoCorrect: false,
          //   autoCapitalize: "words",
        }}
      />
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({});
