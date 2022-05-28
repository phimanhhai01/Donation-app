import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import RadioForm, { RadioButton } from "react-native-simple-radio-button";
import React, { useState, useEffect, useImperativeHandle } from "react";
import SafeAreaView from "react-native-safe-area-view";
import { Menu, Provider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addItem, resetItem } from "../redux/action";
import NumberPicker from "./numberPicker";
import { useIsFocused } from "@react-navigation/native";
import { createDonate, deleteDonate, getListDonate } from "../api";

const Main = () => {
  const [value, setValue] = useState(0);
  const [amount, setAmount] = useState(0);
  const [inputValue, setInputValue] = useState(0);
  const [isReport, setIsReport] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [numberPickerValue, setNumberPickerValue] = useState(0);
  const [rows, setRows] = useState([]);
  //const [listItem, setListItem] = useState([]);
  const nav = useNavigation();
  const isFocused = useIsFocused();
  console.log(isFocused);
  const dispatch = useDispatch();
  const item = useSelector((state) => state);

  const onChange = (text) => {
    setInputValue(parseInt(text.replace(/[^0-9]/g, "")));
  };
  const makeRows = async () => {
    const data = await getListDonate();
    let result = 0;
    setRows(data);
    for (let i = 0; i < data.length; i++) {
      result = result + data[i].amount;
    }
    console.log("Amount", result);
    setAmount(result);
  };
  useEffect(() => {
    if (isFocused) {
      makeRows();
    }
  }, [isFocused]);

  const onPressDonate = () => {
    if (inputValue !== "0") {
      setAmount(amount + inputValue);
      setInputValue("0");
    }
    // setListItem([
    //   ...listItem,
    //   {
    //     amount: inputValue,
    //     type: value,
    //   }
    // ])
    // dispatch(addItem({
    //   amount: inputValue,
    //   type: value === 0 ? 'Paypal' : 'Direct',
    // }))
    createDonate({
      amount: inputValue === "0" ? numberPickerValue : inputValue,
      type: value === 0 ? "Paypall" : "Direct",
    });
    makeRows();
  };
  const openMenu = () => {
    setIsVisible(true);
  };

  const closeMenu = () => {
    setIsVisible(false);
  };
  const radio_props = [
    { label: "PayPal", value: 0 },
    { label: "Direct", value: 1 },
  ];

  const navigateToListItem = (pageName) => {
    nav.navigate(pageName);
    closeMenu();
    makeRows();
  };
  const onClickReset = () => {
    dispatch(resetItem());
    setAmount(0);
    setInputValue("0");
    Promise.all([rows.map((element) => deleteDonate(element._id))]);
    makeRows();
  };
  useEffect(() => {
    console.log(numberPickerValue);
  }, [numberPickerValue]);

  return (
    // <SafeAreaView>
    <Provider style={styles.root}>
      <View style={styles.container}>
        <View style={styles.headers}>
          <Text style={styles.headerText}>Donation 5.0</Text>
          <Menu
            visible={isVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu}>
                <Icon name="dots-three-vertical" size={24} color="white" />
              </TouchableOpacity>
            }
          >
            <Menu.Item
              onPress={() => {
                navigateToListItem("Report");
              }}
              title="Report"
            />
            {rows.length > 0 && (
              <Menu.Item onPress={onClickReset} title="Reset" />
            )}
          </Menu>
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>Welcome Home</Text>
          <View style={styles.donationField}>
            <View>
              <Text style={styles.radioTitle}>Please Give Generously</Text>
              <RadioForm
                style={styles.radioField}
                radio_props={radio_props}
                initial={0}
                onPress={(value) => {
                  setValue(value);
                }}
              />
            </View>
            <View style={styles.numberpickerField}>
              <View style={styles.numberPickerField1}></View>
              <View style={styles.numberPickerField2}>
                <NumberPicker setNumberPickerValue={setNumberPickerValue} />
              </View>
            </View>
          </View>
          <View style={styles.line}>
            <View
              style={{
                width: `${amount / 100}%`,
                height: 4,
                backgroundColor: "blue",
              }}
            ></View>
          </View>
          <View style={styles.amountField}>
            <Text>Amount</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.textInput}
              value={inputValue}
              onChangeText={(text) => onChange(text)}
            ></TextInput>
          </View>
        </View>
        <View style={styles.buttonField}>
          <TouchableOpacity onPress={onPressDonate} style={styles.buttonDonate}>
            <Text>Donate</Text>
          </TouchableOpacity>
          {isReport ? (
            <TouchableOpacity style={styles.buttonReport}>
              <Text>Report Selected</Text>
            </TouchableOpacity>
          ) : (
            <Text>Total so Far</Text>
          )}
          <View>
            <Text>${`${amount}`}</Text>
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headers: {
    marginTop: 30,
    paddingHorizontal: 12,
    backgroundColor: "#496791",
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    color: "white",
    fontSize: 24,
  },
  body: {
    backgroundColor: "white",
    height: "68%",
    padding: 12,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
  },
  donationField: {
    height: "70%",
  },
  radioTitle: {
    marginBottom: 12,
    fontSize: 18,
    color: "gray",
  },
  radioField: {
    paddingLeft: 12,
  },
  numberpickerField: {
    flex: 1,
    width: 80,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  numberPickerField1: {
    flex: 3,
  },
  numberPickerField2: {
    flex: 1,
  },
  numberField: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  number: {
    textAlign: "center",
    fontSize: 20,
  },
  line: {
    backgroundColor: "gray",
    height: 4,
    width: "100%",
    marginBottom: 24,
  },
  amountField: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    height: 24,
    width: "80%",
    borderBottomWidth: 2,
    marginLeft: 16,
  },
  buttonField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 36,
  },
  buttonDonate: {
    backgroundColor: "#dfe2e8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    width: 60,
    height: 40,
  },
  buttonReport: {
    backgroundColor: "gray",
    width: 160,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});

export default Main;
