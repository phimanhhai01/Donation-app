import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  ToastAndroid,
} from "react-native";
//import SafeAreaView from 'react-native-safe-area-view';
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { deleteDonate, getListDonate } from "../api";
import { useEffect, useState } from "react";
const Report = () => {
  //const rows = useSelector(state => state);
  const [modalVisible, setModalVisible] = useState(false);
  const [rows, setRows] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const nav = useNavigation();
  const isFocused = useIsFocused();
  const goback = () => {
    nav.navigate("Donation 1.0");
  };
  const makeRows = async () => {
    const data = await getListDonate();
    setRows(data);
  };
  useEffect(() => {
    if (isFocused) {
      makeRows();
      setCurrentId("");
    }
  }, []);
  const onDelete = (id) => {
    let newRows = [...rows];
    newRows = newRows.filter((element) => {
      return element._id !== id;
    });
    setRows(newRows);
    deleteDonate(id);
  };

  const onClickXButton = (id) => {
    setModalVisible(true);
    setCurrentId(id);
  };

  const onClickDeleteButton = (id) => {
    onDelete(id);
    setModalVisible(false);
    setCurrentId("");
  };
  const showToastMessage = (element) => {
    ToastAndroid.show(
      `Amount: ${element.amount}; Type: ${element.paymenttype}; Upvotes: ${element.upvotes}`,
      ToastAndroid.LONG
    );
  };
  return (
    //<SafeAreaView>
    <View>
      <View style={styles.headers}>
        <Text style={styles.headerText}>Donation 5.0</Text>
        <TouchableOpacity onPress={goback}>
          <Icon name="left" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.reportField}>
        <Text style={styles.report}>Report</Text>
        <View style={styles.itemField}>
          <Text style={styles.amount}>Amount</Text>
          <Text style={styles.amount}>Type</Text>
          <Text style={styles.upvotes}>Upvotes</Text>
          <Text>Delete</Text>
        </View>
        {rows.map((element, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => showToastMessage(element)}
            >
              <View style={styles.itemField} key={index}>
                <Text style={styles.amount}>{`${element.amount}$`}</Text>
                <Text style={styles.amount}>{`${element.paymenttype}`}</Text>
                <Text style={styles.amount}>{element.upvotes}</Text>
                <TouchableOpacity onPress={() => onClickXButton(element._id)}>
                  <Icon name="closecircleo" size={24} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Are you sure to want to delete this donate?
              </Text>
              <View style={styles.buttonField}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => onClickDeleteButton(currentId)}
                >
                  <Text style={styles.textStyle}>Delete</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
    //</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headers: {
    marginTop: 30,
    paddingHorizontal: 12,
    // paddingVertical: 12,
    backgroundColor: "#496791",
    height: "20%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
  },
  headerText: {
    color: "white",
    fontSize: 24,
  },
  report: {
    fontSize: 24,
  },
  reportField: {
    padding: 12,
  },
  itemField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    padding: 12,
    borderBottomColor: "gray",
  },
  amount: {
    marginRight: 48,
  },
  upvotes: {
    marginRight: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  buttonField: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 200,
  },
});

export default Report;
